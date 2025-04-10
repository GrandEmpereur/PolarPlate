import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { resend } from "./resend";
import { nextCookies } from "better-auth/next-js";
import { stripe } from "@better-auth/stripe"
import Stripe from "stripe"

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!)

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        async sendResetPassword({ user, url, token }) {
            await resend.emails.send({
                from: "PolarPlate <no-reply@bartosik.fr>",
                to: user.email,
                subject: "Réinitialisation de votre mot de passe",
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                        <h2 style="color: #333; text-align: center; margin-bottom: 30px;">Réinitialisation de votre mot de passe</h2>
                        <p>Bonjour ${user.name || 'utilisateur'},</p>
                        <p>Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte PolarPlate.</p>
                        <p>Cliquez sur le bouton ci-dessous pour définir un nouveau mot de passe :</p>
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${url}" style="background-color: #3b82f6; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Réinitialiser mon mot de passe</a>
                        </div>
                        <p>Si vous n'avez pas demandé de réinitialisation de mot de passe, vous pouvez ignorer cet email.</p>
                        <p>Ce lien expirera dans 24 heures pour des raisons de sécurité.</p>
                        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; color: #666; font-size: 12px;">
                            <p>&copy; ${new Date().getFullYear()} PolarPlate. Tous droits réservés.</p>
                        </div>
                    </div>
                    `,
                text: `Bonjour ${user.name || 'utilisateur'},
                    Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte PolarPlate.
                    Cliquez sur le lien ci-dessous pour définir un nouveau mot de passe :
                    ${url}
                    Si vous n'avez pas demandé de réinitialisation de mot de passe, vous pouvez ignorer cet email.
                    Ce lien expirera dans 24 heures pour des raisons de sécurité.
                    © ${new Date().getFullYear()} PolarPlate. Tous droits réservés
                    `
            });
        },
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, url, token }) => {
            await resend.emails.send({
                from: "PolarPlate <no-reply@bartosik.fr>",
                to: user.email,
                subject: "Vérifiez votre adresse email",
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                        <h2 style="color: #333; text-align: center; margin-bottom: 30px;">Vérification de votre email</h2>
                        <p>Bonjour ${user.name || 'utilisateur'},</p>
                        <p>Merci de vous être inscrit sur PolarPlate ! Pour finaliser votre inscription, nous devons vérifier votre adresse email.</p>
                        <p>Cliquez sur le bouton ci-dessous pour confirmer votre adresse email :</p>
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${url}" style="background-color: #3b82f6; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Vérifier mon email</a>
                        </div>
                        <p>Si vous n'êtes pas à l'origine de cette inscription, vous pouvez ignorer cet email.</p>
                        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; color: #666; font-size: 12px;">
                            <p>&copy; ${new Date().getFullYear()} PolarPlate. Tous droits réservés.</p>
                        </div>
                    </div>
                    `,
                text: `Bonjour ${user.name || 'utilisateur'},
                    Merci de vous être inscrit sur PolarPlate ! Pour finaliser votre inscription, nous devons vérifier votre adresse email.
                    Cliquez sur le lien ci-dessous pour confirmer votre adresse email :
                    ${url}
                    Si vous n'êtes pas à l'origine de cette inscription, vous pouvez ignorer cet email.
                    © ${new Date().getFullYear()} PolarPlate. Tous droits réservés.`
            });
        }
    },
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }
    },
    plugins: [
        nextCookies(),
        stripe({
            stripeClient,
            stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
            createCustomerOnSignUp: true,
            customerIdField: "stripeCustomerId",
            onCustomerCreate: async ({ customer, stripeCustomer, user }) => {
                console.log(`Client Stripe ${customer.id} créé pour l'utilisateur ${user.id}`);
            },
            getCustomerCreateParams: async ({ user, session }) => {
                return {
                    metadata: {
                        userId: user.id,
                        signupDate: new Date().toISOString()
                    },
                    description: `Utilisateur: ${user.name || user.email}`
                };
            },
            onEvent: async (event) => {
                switch (event.type) {
                    case "invoice.paid":
                        console.log(`Facture payée: ${event.id}`);
                        break;
                    case "payment_intent.succeeded":
                        console.log(`Paiement réussi: ${event.id}`);
                        break;
                }
            },
            subscription: {
                enabled: true,
                plans: [
                    {
                        name: "FREE",
                        limits: {
                            projects: 3,
                            storage: 100,
                            api_requests: 1000
                        }
                    },
                    {
                        name: "PRO",
                        priceId: process.env.STRIPE_PRICE_ID_PRO as string,
                        limits: {
                            projects: 10,
                            storage: 5000,
                            api_requests: 10000
                        },
                        freeTrial: {
                            days: 14,
                            onTrialStart: async (subscription) => {
                                console.log(`Essai du plan PRO démarré pour l'abonnement ${subscription.id}`);
                                // Envoyer un email de bienvenue pour l'essai
                            },
                            onTrialEnd: async ({ subscription }) => {
                                console.log(`Essai du plan PRO terminé pour l'abonnement ${subscription.id}`);
                                // Envoyer une notification de fin d'essai
                            }
                        }
                    },
                    {
                        name: "ENTERPRISE",
                        priceId: process.env.STRIPE_PRICE_ID_ENTERPRISE as string,
                        limits: {
                            projects: 50,
                            storage: 50000,
                            api_requests: 100000
                        }
                    }
                ],
                onSubscriptionComplete: async ({ subscription, plan }) => {
                    console.log(`Abonnement ${subscription.id} créé pour le plan ${plan.name}`);
                },
                onSubscriptionUpdate: async ({ subscription }) => {
                    console.log(`Abonnement ${subscription.id} mis à jour`);
                },
                onSubscriptionCancel: async ({ subscription, cancellationDetails }) => {
                    console.log(`Abonnement ${subscription.id} annulé, raison: ${cancellationDetails?.reason || 'Non spécifiée'}`);
                },
                onSubscriptionDeleted: async ({ subscription }) => {
                    console.log(`Abonnement ${subscription.id} supprimé`);
                },
                getCheckoutSessionParams: async ({ user, plan }) => {
                    return {
                        params: {
                            allow_promotion_codes: true,
                            tax_id_collection: {
                                enabled: true
                            },
                            billing_address_collection: "required",
                            custom_text: {
                                submit: {
                                    message: "Nous allons démarrer votre abonnement immédiatement"
                                }
                            },
                            metadata: {
                                userId: user.id
                            }
                        },
                        options: {
                            idempotencyKey: `sub_${user.id}_${plan.name}_${Date.now()}`
                        }
                    };
                }
            }
        })
    ]
});