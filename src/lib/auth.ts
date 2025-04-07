import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { resend } from "./resend";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        async sendResetPassword({ user, url, token }) {
            try {
                console.log("📧 Envoi d'email de réinitialisation à:", user.email);
                console.log("🔗 URL de réinitialisation:", url);

                const result = await resend.emails.send({
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

© ${new Date().getFullYear()} PolarPlate. Tous droits réservés.`
                });

                if (result.error) {
                    console.error("❌ Erreur d'envoi d'email de réinitialisation:", result.error);
                    throw new Error(`Échec de l'envoi d'email: ${result.error}`);
                }

                console.log("✅ Email de réinitialisation envoyé avec succès, ID:", result.data?.id);
            } catch (error) {
                console.error("❌ Exception lors de l'envoi d'email de réinitialisation:", error);
                throw error; // On relance l'erreur car la réinitialisation ne doit pas continuer si l'email échoue
            }
        },
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, url, token }) => {
            try {
                console.log("📧 Envoi d'email de vérification à:", user.email);
                console.log("🔗 URL de vérification:", url);

                const result = await resend.emails.send({
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

                if (result.error) {
                    console.error("❌ Erreur d'envoi d'email de vérification:", result.error);
                    throw new Error(`Échec de l'envoi d'email: ${result.error}`);
                }

                console.log("✅ Email de vérification envoyé avec succès, ID:", result.data?.id);
            } catch (error) {
                console.error("❌ Exception lors de l'envoi d'email de vérification:", error);
                // On ne relance pas l'erreur pour éviter de bloquer l'inscription,
                // mais on la log pour le débogage
            }
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
        nextCookies()
    ]
});