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
        async sendResetPassword(data) {
            await resend.emails.send({
                from: "no-reply@bartosik.fr",
                to: data.user.email,
                subject: "Reset Password",
                text: `Hello ${data.user.name},
                You can reset your password by clicking on the link below: ${data.url}
                `
            })
        },
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, url, token }, request) => {
            await resend.emails.send({
                from: "no-reply@bartosik.fr",
                to: user.email,
                subject: "Verify your email address",
                text: `Click the link to verify your email: ${url}`
            })
        }
    },
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
    },
    plugins: [
        nextCookies()
    ]
});