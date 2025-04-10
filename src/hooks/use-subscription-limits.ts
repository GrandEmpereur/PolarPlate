"use client";

import { useCallback, useMemo } from "react";
import { useSession } from "@/lib/auth-client";
import { checkAccess, getPlanLimits, PlanLimit, PlanName } from "@/lib/subscription-plans";

export interface SubscriptionLimitsHook {
    limits: PlanLimit;
    canAccess: (feature: keyof PlanLimit, usage: number) => boolean;
    isFeatureAvailable: (feature: string) => boolean;
    isPro: boolean;
    isEnterprise: boolean;
}

/**
 * Hook pour gérer les limites d'abonnement
 * @returns Objet contenant les limites et les fonctions pour vérifier l'accès
 */
export function useSubscriptionLimits(): SubscriptionLimitsHook {
    const { data } = useSession();

    // Récupère le plan actuel de l'utilisateur ou FREE par défaut
    const currentPlan = useMemo<PlanName>(() => {
        // Si l'utilisateur est connecté, vérifier s'il a un currentPlan
        // Si le plan n'existe pas, utiliser 'FREE' par défaut
        const userPlan = data?.user ? (data.user as any).currentPlan : undefined;
        return (userPlan as PlanName) || 'FREE';
    }, [data?.user]);

    // Récupère les limites du plan actuel
    const limits = useMemo(() => {
        return getPlanLimits(currentPlan);
    }, [currentPlan]);

    // Vérifie si l'utilisateur peut accéder à une fonctionnalité spécifique
    const canAccess = useCallback((feature: keyof PlanLimit, usage: number) => {
        return checkAccess(currentPlan, feature, usage);
    }, [currentPlan]);

    // Vérifie si une fonctionnalité est disponible (pour les features non quantifiables)
    const isFeatureAvailable = useCallback((feature: string) => {
        // Liste des features par plan
        const featuresByPlan: Record<PlanName, string[]> = {
            'FREE': ['base', 'email-support'],
            'PRO': ['base', 'email-support', 'priority-support', 'api-access', 'custom-branding'],
            'ENTERPRISE': ['base', 'email-support', 'priority-support', 'api-access', 'custom-branding', 'sso', 'sla', 'dedicated-support']
        };

        return featuresByPlan[currentPlan]?.includes(feature) || false;
    }, [currentPlan]);

    // Vérifie si l'utilisateur a le plan PRO
    const isPro = useMemo(() => {
        return currentPlan === 'PRO' || currentPlan === 'ENTERPRISE';
    }, [currentPlan]);

    // Vérifie si l'utilisateur a le plan ENTERPRISE
    const isEnterprise = useMemo(() => {
        return currentPlan === 'ENTERPRISE';
    }, [currentPlan]);

    return {
        limits,
        canAccess,
        isFeatureAvailable,
        isPro,
        isEnterprise
    };
} 