import { NextRequest } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/prisma";
import { SubscriptionStatus, PaymentStatus, Plan } from "@prisma/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Type augmenté pour Stripe.Subscription pour compléter les propriétés manquantes
type StripeSubscriptionComplete = Stripe.Subscription & {
    current_period_start: number;
    current_period_end: number;
    cancel_at_period_end: boolean;
    canceled_at: number | null;
    trial_start: number | null;
    trial_end: number | null;
};

// Type augmenté pour Stripe.Invoice pour compléter les propriétés manquantes
type StripeInvoiceComplete = Stripe.Invoice & {
    subscription: string | Stripe.Subscription | null;
    payment_intent_id?: string;
    payment_intent?: string | { id: string };
};

/**
 * Route de webhook Stripe pour traiter les événements
 */
export async function POST(req: NextRequest) {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature") || "";

    if (!signature) {
        return new Response("Signature manquante", { status: 400 });
    }

    try {
        // Vérifier et construire l'événement Stripe
        const event = stripe.webhooks.constructEvent(
            body,
            signature,
            endpointSecret
        );

        // Traiter l'événement selon son type
        await handleStripeEvent(event);

        return new Response(JSON.stringify({ received: true }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Erreur lors du traitement du webhook Stripe:", error);

        if (error instanceof Stripe.errors.StripeSignatureVerificationError) {
            return new Response("Signature invalide", { status: 400 });
        }

        return new Response("Erreur interne", { status: 500 });
    }
}

/**
 * Gère les différents types d'événements Stripe
 */
async function handleStripeEvent(event: Stripe.Event) {
    console.log(`Événement Stripe reçu: ${event.type}`);

    // Enregistrer l'événement webhook dans la base de données
    try {
        await prisma.webhookEvent.create({
            data: {
                eventType: `stripe:${event.type}`,
                stripeEventId: event.id,
                payload: event.data.object as any || {}, // Assurez-vous que payload n'est jamais null
                processed: false
            }
        });
    } catch (error) {
        console.error("Erreur lors de l'enregistrement de l'événement webhook:", error);
        // On continue même si l'enregistrement échoue
    }

    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object as Stripe.Checkout.Session;
            await handleCheckoutCompleted(session);
            break;
        }
        case "customer.subscription.created":
        case "customer.subscription.updated": {
            const subscription = event.data.object as StripeSubscriptionComplete;
            await handleSubscriptionUpdated(subscription);
            break;
        }
        case "customer.subscription.deleted": {
            const subscription = event.data.object as StripeSubscriptionComplete;
            await handleSubscriptionDeleted(subscription);
            break;
        }
        case "invoice.paid": {
            const invoice = event.data.object as StripeInvoiceComplete;
            await handleInvoicePaid(invoice);
            break;
        }
        case "invoice.payment_failed": {
            const invoice = event.data.object as StripeInvoiceComplete;
            await handleInvoicePaymentFailed(invoice);
            break;
        }
        default:
            console.log(`Événement non traité: ${event.type}`);
    }
}

/**
 * Gère un événement de checkout complété
 */
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
    console.log("Checkout complété:", session.id);

    // Récupérer les métadonnées importantes
    const customerId = session.customer as string;
    const subscriptionId = session.subscription as string;
    const userId = session.metadata?.userId;

    if (!userId) {
        console.error("UserId manquant dans les métadonnées de la session");
        return;
    }

    try {
        // 1. Mettre à jour l'utilisateur avec l'ID client Stripe
        await prisma.user.update({
            where: { id: userId },
            data: {
                stripeCustomerId: customerId
            }
        });

        console.log(`Utilisateur ${userId} mis à jour avec le customer ID ${customerId}`);

        // Si un abonnement a été créé, Stripe enverra un événement customer.subscription.created 
        // qui sera traité séparément
    } catch (error) {
        console.error(`Erreur lors de la mise à jour de l'utilisateur ${userId}:`, error);
    }
}

/**
 * Convertit un timestamp Unix en Date ou null si le timestamp est null/undefined/invalide
 */
function toDate(timestamp: number | null | undefined): Date | null {
    if (timestamp === null || timestamp === undefined) return null;

    // Si c'est un nombre valide, convertir en date
    console.log(`Conversion de timestamp: ${timestamp}, type: ${typeof timestamp}`);

    // Certaines API Stripe peuvent envoyer des timestamps sous forme de chaînes
    const timestampNumber = typeof timestamp === 'string' ? parseInt(timestamp, 10) : timestamp;

    // Vérifier si c'est un nombre valide
    if (isNaN(timestampNumber)) {
        console.error(`Timestamp invalide: ${timestamp}`);
        return null;
    }

    // Convertir en date (les timestamps Stripe sont en secondes, pas en millisecondes)
    const date = new Date(timestampNumber * 1000);

    // Vérifier si la date est valide
    if (isNaN(date.getTime())) {
        console.error(`Date invalide après conversion: ${date}`);
        return null;
    }

    console.log(`Date convertie: ${date.toISOString()}`);
    return date;
}

/**
 * Gère un événement d'abonnement créé ou mis à jour
 */
async function handleSubscriptionUpdated(subscription: StripeSubscriptionComplete) {
    console.log("Abonnement mis à jour:", subscription.id);
    console.log("Détails abonnement:", JSON.stringify({
        current_period_start: subscription.current_period_start,
        current_period_end: subscription.current_period_end,
        cancel_at_period_end: subscription.cancel_at_period_end,
        canceled_at: subscription.canceled_at,
        trial_start: subscription.trial_start,
        trial_end: subscription.trial_end
    }));

    const customerId = typeof subscription.customer === 'string'
        ? subscription.customer
        : subscription.customer.id;
    const status = subscription.status;
    const priceId = subscription.items.data[0]?.price.id;
    const productId = subscription.items.data[0]?.price.product as string;

    try {
        // Récupérer l'utilisateur associé au client Stripe
        const user = await prisma.user.findFirst({
            where: {
                stripeCustomerId: customerId
            }
        });

        if (!user) {
            console.error(`Aucun utilisateur trouvé avec le customer ID ${customerId}`);
            return;
        }

        // Récupérer les détails du produit pour déterminer le plan
        const product = await stripe.products.retrieve(productId);

        // Déterminer le plan en fonction du nom du produit ou des métadonnées
        let plan: Plan = "FREE";
        if (product.name.toLowerCase().includes("pro")) {
            plan = "PRO";
        } else if (product.name.toLowerCase().includes("enterprise")) {
            plan = "ENTERPRISE";
        }

        console.log(`Plan déterminé pour l'utilisateur ${user.id}: ${plan}`);

        // Mapper le statut Stripe au statut dans notre base de données
        let subscriptionStatus: SubscriptionStatus;
        switch (status) {
            case "active":
                subscriptionStatus = "ACTIVE";
                break;
            case "canceled":
                subscriptionStatus = "CANCELED";
                break;
            case "past_due":
                subscriptionStatus = "PAST_DUE";
                break;
            case "unpaid":
                subscriptionStatus = "UNPAID";
                break;
            case "trialing":
                subscriptionStatus = "TRIAL";
                break;
            case "incomplete":
                subscriptionStatus = "INCOMPLETE";
                break;
            case "incomplete_expired":
                subscriptionStatus = "INCOMPLETE_EXPIRED";
                break;
            default:
                subscriptionStatus = "ACTIVE";
        }

        // Convertir les timestamps Unix en dates JavaScript
        const currentPeriodStart = toDate(subscription.current_period_start);
        const currentPeriodEnd = toDate(subscription.current_period_end);
        const canceledAt = toDate(subscription.canceled_at);
        const trialStart = toDate(subscription.trial_start);
        const trialEnd = toDate(subscription.trial_end);

        // Créer des dates par défaut si les dates principales sont invalides
        const now = new Date();
        const oneMonthLater = new Date(now);
        oneMonthLater.setMonth(now.getMonth() + 1);

        const safeCurrentPeriodStart = currentPeriodStart || now;
        const safeCurrentPeriodEnd = currentPeriodEnd || oneMonthLater;

        console.log(`Dates utilisées - début: ${safeCurrentPeriodStart.toISOString()}, fin: ${safeCurrentPeriodEnd.toISOString()}`);

        // Vérifier si un abonnement existe déjà pour ce subscription ID
        const existingSubscription = await prisma.subscription.findFirst({
            where: {
                stripeSubscriptionId: subscription.id
            }
        });

        // Construire l'objet pour créer ou mettre à jour l'abonnement
        const subscriptionData = {
            userId: user.id,
            stripeSubscriptionId: subscription.id,
            stripeProductId: productId,
            stripePriceId: priceId,
            status: subscriptionStatus,
            currentPeriodStart: safeCurrentPeriodStart,
            currentPeriodEnd: safeCurrentPeriodEnd,
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
            canceledAt,
            trialStart,
            trialEnd
        };

        // Créer ou mettre à jour l'abonnement
        if (existingSubscription) {
            await prisma.subscription.update({
                where: { id: existingSubscription.id },
                data: subscriptionData
            });
            console.log(`Abonnement ${subscription.id} mis à jour pour l'utilisateur ${user.id}`);
        } else {
            await prisma.subscription.create({
                data: subscriptionData
            });
            console.log(`Abonnement ${subscription.id} créé pour l'utilisateur ${user.id}`);
        }

        // Mettre à jour le plan de l'utilisateur si l'abonnement est actif
        if (status === "active" || status === "trialing") {
            await prisma.user.update({
                where: { id: user.id },
                data: { currentPlan: plan }
            });
            console.log(`Plan de l'utilisateur ${user.id} mis à jour vers ${plan}`);
        }

        console.log(`Traitement de l'abonnement ${subscription.id} terminé avec succès`);
    } catch (error) {
        console.error(`Erreur lors de la mise à jour de l'abonnement ${subscription.id}:`, error);
    }
}

/**
 * Gère un événement d'abonnement supprimé
 */
async function handleSubscriptionDeleted(subscription: StripeSubscriptionComplete) {
    console.log("Abonnement supprimé:", subscription.id);

    try {
        // Trouver l'abonnement dans la base de données
        const existingSubscription = await prisma.subscription.findFirst({
            where: {
                stripeSubscriptionId: subscription.id
            },
            include: {
                user: true
            }
        });

        if (!existingSubscription) {
            console.error(`Aucun abonnement trouvé avec l'ID ${subscription.id}`);
            return;
        }

        // Mettre à jour le statut de l'abonnement
        await prisma.subscription.update({
            where: { id: existingSubscription.id },
            data: {
                status: "CANCELED",
                canceledAt: new Date(),
                endedAt: new Date()
            }
        });

        // Mettre à jour le plan de l'utilisateur à FREE
        await prisma.user.update({
            where: { id: existingSubscription.userId },
            data: { currentPlan: "FREE" }
        });

        console.log(`Abonnement ${subscription.id} marqué comme supprimé pour l'utilisateur ${existingSubscription.userId}`);
    } catch (error) {
        console.error(`Erreur lors de la suppression de l'abonnement ${subscription.id}:`, error);
    }
}

/**
 * Gère un événement de paiement de facture réussi
 */
async function handleInvoicePaid(invoice: StripeInvoiceComplete) {
    console.log("Facture payée:", invoice.id);

    // Vérifier si la facture a un client
    if (!invoice.customer) {
        console.error("Facture sans client");
        return;
    }

    const customerId = typeof invoice.customer === 'string'
        ? invoice.customer
        : invoice.customer.id;

    try {
        // Trouver l'utilisateur associé au client
        const user = await prisma.user.findFirst({
            where: { stripeCustomerId: customerId }
        });

        if (!user) {
            console.error(`Aucun utilisateur trouvé avec le customer ID ${customerId}`);
            return;
        }

        // Si la facture est liée à un abonnement, trouver cet abonnement
        let subscriptionId: string | null = null;
        if (invoice.subscription) {
            const subscriptionString = typeof invoice.subscription === 'string'
                ? invoice.subscription
                : invoice.subscription.id;

            const subscription = await prisma.subscription.findFirst({
                where: { stripeSubscriptionId: subscriptionString }
            });

            if (subscription) {
                subscriptionId = subscription.id;
            }
        }

        // Générer un ID unique pour stripePaymentId
        const paymentId = `${invoice.id}`;

        // Récupérer le payment_intent si disponible
        let paymentMethod = "";
        if (invoice.payment_intent_id) {
            paymentMethod = invoice.payment_intent_id;
        } else if (invoice.payment_intent) {
            paymentMethod = typeof invoice.payment_intent === 'string'
                ? invoice.payment_intent
                : invoice.payment_intent.id;
        }

        // Créer un enregistrement de paiement
        await prisma.payment.create({
            data: {
                userId: user.id,
                subscriptionId: subscriptionId,
                stripePaymentId: paymentId,
                amount: invoice.amount_paid / 100, // Convertir les centimes en euros
                currency: invoice.currency,
                status: "SUCCEEDED" as PaymentStatus,
                paymentMethod: paymentMethod || null,
                receiptUrl: invoice.hosted_invoice_url || null
            }
        });

        console.log(`Paiement enregistré pour l'utilisateur ${user.id}`);
    } catch (error) {
        console.error(`Erreur lors de l'enregistrement du paiement pour la facture ${invoice.id}:`, error);
    }
}

/**
 * Gère un événement d'échec de paiement de facture
 */
async function handleInvoicePaymentFailed(invoice: StripeInvoiceComplete) {
    console.log("Paiement de facture échoué:", invoice.id);

    if (!invoice.customer) {
        console.error("Facture sans client");
        return;
    }

    const customerId = typeof invoice.customer === 'string'
        ? invoice.customer
        : invoice.customer.id;

    try {
        // Trouver l'utilisateur associé au client
        const user = await prisma.user.findFirst({
            where: { stripeCustomerId: customerId }
        });

        if (!user) {
            console.error(`Aucun utilisateur trouvé avec le customer ID ${customerId}`);
            return;
        }

        // Générer un ID unique pour stripePaymentId
        const paymentId = `failed_${invoice.id}`;

        // Récupérer le payment_intent si disponible
        let paymentMethod = "";
        if (invoice.payment_intent_id) {
            paymentMethod = invoice.payment_intent_id;
        } else if (invoice.payment_intent) {
            paymentMethod = typeof invoice.payment_intent === 'string'
                ? invoice.payment_intent
                : invoice.payment_intent.id;
        }

        // Créer un enregistrement de paiement échoué
        await prisma.payment.create({
            data: {
                userId: user.id,
                stripePaymentId: paymentId,
                amount: invoice.amount_due / 100, // Convertir les centimes en euros
                currency: invoice.currency,
                status: "FAILED" as PaymentStatus,
                paymentMethod: paymentMethod || null
            }
        });

        console.log(`Paiement échoué enregistré pour l'utilisateur ${user.id}`);
    } catch (error) {
        console.error(`Erreur lors de l'enregistrement du paiement échoué pour la facture ${invoice.id}:`, error);
    }
}
