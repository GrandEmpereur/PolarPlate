import { createAuthClient } from "better-auth/react"
import { stripeClient } from "@better-auth/stripe/client"

export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL as string,
    plugins: [
        stripeClient({
            subscription: true
        })
    ]
})

export const { signIn, signOut, signUp, useSession } = createAuthClient()