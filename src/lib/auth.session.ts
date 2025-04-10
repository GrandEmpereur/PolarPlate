import { headers } from "next/headers";
import { auth } from "./auth";
import prisma from "./prisma";

export const getUser = async () => {
    try {
        // Récupération de la session avec les headers de la requête
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user) {
            return null;
        }

        // Récupérer les informations complètes de l'utilisateur depuis la DB
        const userWithPlan = await prisma.user.findUnique({
            where: { id: session.user.id },
            include: {
                subscriptions: {
                    orderBy: { createdAt: 'desc' },
                    take: 1
                }
            }
        });

        return userWithPlan || session.user;
    } catch (error) {
        return null;
    }
}

// Vérifie si l'utilisateur est authentifié (utile pour les composants côté client)
export const isAuthenticated = async () => {
    const user = await getUser();
    return !!user;
}