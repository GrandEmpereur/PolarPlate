import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
    try {
        // Utiliser directement les cookies de la requête
        const session = await auth.api.getSession({
            headers: req.headers
        });

        if (!session || !session.user) {
            return NextResponse.json(
                { error: "Vous devez être connecté pour effectuer cette action" },
                { status: 401 }
            );
        }

        // Récupérer les données de la requête
        const requestData = await req.json();
        let { priceId } = requestData;
        const { planType, isAnnual, successUrl, cancelUrl } = requestData;

        // Si aucun priceId n'est fourni, vérifier si planType est fourni pour déterminer le produit
        if (!priceId && planType) {
            let productId;

            // Déterminer l'ID du produit en fonction du type de plan
            switch (planType.toLowerCase()) {
                case 'pro':
                    productId = process.env.PLAN_PRO_ID;
                    break;
                case 'enterprise':
                    productId = process.env.PLAN_ENTREPRISE_ID;
                    break;
                case 'free':
                    return NextResponse.json(
                        { error: "Le plan gratuit ne nécessite pas de paiement" },
                        { status: 400 }
                    );
                default:
                    return NextResponse.json(
                        { error: "Type de plan invalide" },
                        { status: 400 }
                    );
            }

            // Récupérer les prix associés au produit
            const prices = await stripe.prices.list({
                product: productId,
                active: true,
                limit: 10,
            });

            // Filtrer les prix pour trouver le prix mensuel ou annuel selon le choix
            let selectedPrice = null;
            for (const price of prices.data) {
                const isMonthly = price.recurring?.interval === 'month';
                const isPriceAnnual = price.recurring?.interval === 'year';

                if ((isAnnual && isPriceAnnual) || (!isAnnual && isMonthly)) {
                    selectedPrice = price;
                    break;
                }
            }

            if (!selectedPrice) {
                return NextResponse.json(
                    { error: "Aucun prix trouvé pour ce plan" },
                    { status: 400 }
                );
            }

            // Utiliser l'ID du prix sélectionné
            priceId = selectedPrice.id;
        }

        if (!priceId) {
            return NextResponse.json(
                { error: "L'ID du prix est requis" },
                { status: 400 }
            );
        }

        // Récupérer ou créer un client Stripe pour l'utilisateur
        let customerId: string;

        // Récupérer l'utilisateur depuis la base de données Prisma
        const user = await getUserById(session.user.id);

        if (user?.stripeCustomerId) {
            customerId = user.stripeCustomerId;
        } else {
            // Créer un nouveau client Stripe
            const customer = await stripe.customers.create({
                email: session.user.email,
                name: session.user.name,
                metadata: {
                    userId: session.user.id
                }
            });

            customerId = customer.id;

            // Mettre à jour l'utilisateur avec l'ID du client Stripe directement dans Prisma
            await updateUserStripeCustomerId(session.user.id, customerId);
        }

        // Créer une session de checkout Stripe
        const checkoutSession = await stripe.checkout.sessions.create({
            customer: customerId,
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: "subscription",
            success_url: successUrl || `${req.nextUrl.origin}/success`,
            cancel_url: cancelUrl || `${req.nextUrl.origin}/pricing`,
            metadata: {
                userId: session.user.id
            },
            subscription_data: {
                metadata: {
                    userId: session.user.id
                }
            },
            billing_address_collection: "auto",
            allow_promotion_codes: true,
            payment_method_types: ["card"],
        });

        return NextResponse.json({ url: checkoutSession.url });
    } catch (error: any) {
        console.error("Erreur lors de la création de la session de checkout:", error);
        return NextResponse.json(
            { error: error.message || "Une erreur est survenue" },
            { status: 500 }
        );
    }
}

// Récupérer l'utilisateur par son ID depuis Prisma
async function getUserById(userId: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });
        return user;
    } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur:", error);
        return null;
    }
}

// Mettre à jour l'ID client Stripe de l'utilisateur directement dans Prisma
async function updateUserStripeCustomerId(userId: string, stripeCustomerId: string) {
    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { stripeCustomerId }
        });
        return updatedUser;
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
        throw error;
    }
} 