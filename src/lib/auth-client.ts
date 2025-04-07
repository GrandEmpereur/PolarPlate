import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL as string
})

export const { signIn, signOut, signUp, useSession } = createAuthClient()