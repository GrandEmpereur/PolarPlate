import { headers } from "next/headers";
import { auth } from "./auth";

export const getUser = async () => {
    try {
        // Récupération de la session avec les headers de la requête
        const session = await auth.api.getSession({
            headers: await headers()
        });

        return session?.user;
    } catch (error) {
        return null;
    }
}

// Vérifie si l'utilisateur est authentifié (utile pour les composants côté client)
export const isAuthenticated = async () => {
    const user = await getUser();
    return !!user;
}