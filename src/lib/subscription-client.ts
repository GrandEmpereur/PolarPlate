import { auth } from "./auth";

/**
 * Client pour interagir avec les fonctionnalités d'abonnement Stripe via BetterAuth
 * Note: Ce fichier est conçu pour être utilisé côté client uniquement
 */

/**
 * Interface pour les résultats d'opérations d'abonnement
 */
interface SubscriptionResult<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    activeSubscription?: SubscriptionData;
}

/**
 * Interface pour les données d'abonnement
 */
interface SubscriptionData {
    id: string;
    status: 'active' | 'canceled' | 'trialing' | 'past_due' | 'unpaid' | 'incomplete' | 'incomplete_expired';
    plan: string;
    periodStart?: Date;
    periodEnd?: Date;
    cancelAtPeriodEnd?: boolean;
    limits?: Record<string, number>;
}

/**
 * Interface pour les paramètres de mise à niveau d'abonnement
 */
interface UpgradeParams {
    plan: string;
    annual?: boolean;
    seats?: number;
    successUrl: string;
    cancelUrl: string;
}

/**
 * Met à niveau l'abonnement de l'utilisateur vers un plan spécifique
 * @param plan Le nom du plan (FREE, PRO, ENTERPRISE)
 * @param annual Passer à true pour un abonnement annuel
 * @param seats Nombre de sièges pour les plans d'équipe (optionnel)
 * @returns Une promesse avec le résultat de l'opération
 */
export async function upgradeSubscription(plan: string, annual = false, seats?: number): Promise<SubscriptionResult> {
    try {
        // Construire les paramètres de base
        const params: UpgradeParams = {
            plan,
            annual,
            successUrl: `${window.location.origin}/dashboard?success=true&plan=${plan}`,
            cancelUrl: `${window.location.origin}/pricing?canceled=true`,
        };

        // Ajouter les sièges si spécifiés
        if (seats && seats > 0) {
            params.seats = seats;
        }

        // Appeler directement l'API fetch pour éviter les problèmes de typage
        const response = await fetch('/api/auth/stripe/create-checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { success: false, error: errorData.error || 'Erreur inconnue' };
        }

        const data = await response.json();

        // Rediriger vers l'URL de checkout
        if (data.url) {
            window.location.href = data.url;
        }

        return { success: true, data };
    } catch (error) {
        console.error("Erreur lors de la mise à niveau de l'abonnement:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Une erreur inconnue s'est produite"
        };
    }
}

/**
 * Annule l'abonnement actuel de l'utilisateur
 * @returns Une promesse avec le résultat de l'opération
 */
export async function cancelSubscription(): Promise<SubscriptionResult> {
    try {
        // Rediriger vers le portail client Stripe
        window.location.href = `/api/stripe/portal?returnUrl=${encodeURIComponent(`${window.location.origin}/dashboard?canceled=true`)}`;

        return { success: true };
    } catch (error) {
        console.error("Erreur lors de l'annulation de l'abonnement:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Une erreur inconnue s'est produite"
        };
    }
}

/**
 * Récupère la liste des abonnements de l'utilisateur actuel
 * @returns Une promesse avec la liste des abonnements
 */
export async function getSubscriptions(): Promise<SubscriptionResult<SubscriptionData[]>> {
    try {
        const response = await fetch('/api/auth/stripe/subscriptions', {
            method: 'GET',
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { success: false, error: errorData.error || 'Erreur inconnue' };
        }

        const data = await response.json();
        const subscriptions = data.subscriptions || [];

        // Trouver l'abonnement actif
        const activeSubscription = subscriptions.find(
            (sub: SubscriptionData) => sub.status === "active" || sub.status === "trialing"
        );

        return {
            success: true,
            data: subscriptions,
            activeSubscription
        };
    } catch (error) {
        console.error("Erreur lors de la récupération des abonnements:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Une erreur inconnue s'est produite"
        };
    }
}

/**
 * Vérifie si l'utilisateur a accès à une fonctionnalité spécifique
 * basée sur les limites de son plan
 * @param feature Nom de la fonctionnalité à vérifier
 * @param currentUsage Utilisation actuelle de cette fonctionnalité
 * @returns Boolean indiquant si l'utilisateur a accès
 */
export async function hasAccess(feature: string, currentUsage: number = 0): Promise<boolean> {
    try {
        const result = await getSubscriptions();

        if (!result.success || !result.activeSubscription) {
            // Récupérer les limites du plan FREE via une API dédiée
            const response = await fetch('/api/plans/free-limits');

            if (!response.ok) {
                return false;
            }

            const freePlan = await response.json();

            if (!freePlan.limits || typeof freePlan.limits[feature] === 'undefined') {
                return false;
            }

            return currentUsage < freePlan.limits[feature];
        }

        // Vérifier les limites du plan actif
        const subscription = result.activeSubscription;

        if (!subscription.limits || typeof subscription.limits[feature] === 'undefined') {
            return false;
        }

        return currentUsage < subscription.limits[feature];
    } catch (error) {
        console.error("Erreur lors de la vérification des droits d'accès:", error);
        return false;
    }
} 