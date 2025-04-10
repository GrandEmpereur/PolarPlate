import { NextRequest } from "next/server";
import Stripe from "stripe";
import { getUser } from "@/lib/auth.session";
import { redirect } from "next/navigation";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(request: NextRequest) {
    // Vérifier l'authentification de l'utilisateur
    const user = await getUser();

    if (!user) {
        return new Response("Non autorisé", { status: 401 });
    }

    try {
        // Récupérer le customerId depuis les paramètres d'URL ou depuis l'utilisateur
        const customerId = request.nextUrl.searchParams.get("customerId") || user.stripeCustomerId;

        if (!customerId) {
            return new Response("Aucun abonnement Stripe trouvé", { status: 404 });
        }

        try {
            // Créer une session pour le portail client
            const session = await stripe.billingPortal.sessions.create({
                customer: customerId as string,
                return_url: `${request.nextUrl.origin}/dashboard`,
            });

            // Rediriger vers l'URL du portail
            return Response.redirect(session.url);
        } catch (portalError: any) {
            console.error("Erreur lors de la création de la session du portail client Stripe:", portalError);

            // Si le portail n'est pas configuré, rediriger vers la page des paramètres d'abonnement
            if (portalError.type === 'StripeInvalidRequestError' &&
                portalError.message?.includes('No configuration provided')) {

                // Alternative : rediriger vers la page de tarification
                return Response.redirect(`${request.nextUrl.origin}/pricing?error=portal_not_configured`);
            }

            // Pour les autres erreurs, renvoyer une erreur 500
            return new Response(
                "Erreur lors de la création du portail client Stripe. Veuillez contacter le support.",
                { status: 500 }
            );
        }
    } catch (error) {
        console.error("Erreur générale lors de l'accès au portail:", error);
        return new Response("Une erreur est survenue", { status: 500 });
    }
} 