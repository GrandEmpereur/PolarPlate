/**
 * Configuration des plans d'abonnement
 * Ce fichier contient la définition des plans disponibles dans l'application
 */

export type PlanName = 'FREE' | 'PRO' | 'ENTERPRISE';

export interface PlanLimit {
    projects: number;
    storage: number; // en MB
    apiCalls: number; // par jour
    users: number;
    support: 'email' | 'priority' | '24/7';
}

export interface Plan {
    id: string;
    name: PlanName;
    description: string;
    price: {
        monthly: number;
        annual: number;
    };
    limits: PlanLimit;
    features: string[];
    popular?: boolean;
    trial?: {
        days: number;
        withCard: boolean;
    };
    productId?: string; // ID du produit dans Stripe ou Polar
}

// Plans d'abonnement disponibles
export const subscriptionPlans: Plan[] = [
    {
        id: 'free',
        name: 'FREE',
        description: 'Pour les créateurs indépendants et les projets personnels',
        price: {
            monthly: 0,
            annual: 0,
        },
        limits: {
            projects: 3,
            storage: 500,
            apiCalls: 100,
            users: 1,
            support: 'email'
        },
        features: [
            'Accès à toutes les fonctionnalités de base',
            '3 projets maximum',
            '500 MB de stockage',
            '100 appels API par jour',
            'Support par email'
        ],
    },
    {
        id: 'pro',
        name: 'PRO',
        description: 'Pour les professionnels et les petites équipes',
        price: {
            monthly: 29,
            annual: 290, // ~25% de réduction
        },
        limits: {
            projects: 15,
            storage: 5000,
            apiCalls: 1000,
            users: 5,
            support: 'priority'
        },
        features: [
            'Toutes les fonctionnalités du plan FREE',
            '15 projets maximum',
            '5 GB de stockage',
            '1000 appels API par jour',
            'Support prioritaire',
            'Accès aux API avancées',
            'Personnalisation du branding'
        ],
        popular: true,
        trial: {
            days: 14,
            withCard: true
        },
        productId: process.env.POLAR_PRODUCT_ID_PRO || process.env.STRIPE_PRODUCT_ID_PRO,
    },
    {
        id: 'enterprise',
        name: 'ENTERPRISE',
        description: 'Pour les grandes entreprises avec des besoins spécifiques',
        price: {
            monthly: 99,
            annual: 990, // ~25% de réduction
        },
        limits: {
            projects: 999,
            storage: 100000,
            apiCalls: 10000,
            users: 20,
            support: '24/7'
        },
        features: [
            'Toutes les fonctionnalités du plan PRO',
            'Nombre illimité de projets',
            '100 GB de stockage',
            '10000 appels API par jour',
            'Support 24/7',
            'API personnalisée',
            'SSO et authentification avancée',
            'Contrat SLA garanti',
            'Onboarding dédié'
        ],
        trial: {
            days: 30,
            withCard: true
        },
        productId: process.env.POLAR_PRODUCT_ID_ENTERPRISE || process.env.STRIPE_PRODUCT_ID_ENTERPRISE,
    }
];

/**
 * Récupère un plan par son nom
 * @param name Nom du plan à récupérer
 * @returns Plan correspondant ou le plan FREE par défaut
 */
export function getPlanByName(name: PlanName): Plan {
    return subscriptionPlans.find(plan => plan.name === name) || subscriptionPlans[0];
}

/**
 * Récupère un plan par son ID
 * @param id ID du plan à récupérer
 * @returns Plan correspondant ou le plan FREE par défaut
 */
export function getPlanById(id: string): Plan {
    return subscriptionPlans.find(plan => plan.id === id) || subscriptionPlans[0];
}

/**
 * Récupère un plan par son ID de produit
 * @param productId ID du produit dans Stripe ou Polar
 * @returns Plan correspondant ou null si aucun ne correspond
 */
export function getPlanByProductId(productId: string): Plan | null {
    return subscriptionPlans.find(plan => plan.productId === productId) || null;
}

/**
 * Calcule le prix avec la réduction annuelle
 * @param plan Plan pour lequel calculer le prix
 * @param isAnnual Si true, renvoie le prix annuel, sinon mensuel
 * @returns Prix formaté avec la devise
 */
export function getPlanPrice(plan: Plan, isAnnual: boolean = false): string {
    const price = isAnnual ? plan.price.annual / 12 : plan.price.monthly;
    return price === 0 ? 'Gratuit' : `${price}€/mois`;
}

/**
 * Calcule l'économie réalisée avec un abonnement annuel
 * @param plan Plan pour lequel calculer l'économie
 * @returns Pourcentage d'économie ou 0 si le plan est gratuit
 */
export function getAnnualSavings(plan: Plan): number {
    if (plan.price.monthly === 0) return 0;
    const monthlyCost = plan.price.monthly * 12;
    const annualCost = plan.price.annual;
    return Math.round(((monthlyCost - annualCost) / monthlyCost) * 100);
}

/**
 * Vérifie si un utilisateur peut accéder à une fonctionnalité
 * @param userPlan Plan de l'utilisateur
 * @param feature Fonctionnalité à vérifier
 * @param usage Utilisation actuelle
 * @returns true si l'utilisateur a accès, false sinon
 */
export function checkAccess(userPlan: PlanName, feature: keyof PlanLimit, usage: number): boolean {
    const plan = getPlanByName(userPlan);
    if (!plan) return false;

    const limit = plan.limits[feature];
    if (typeof limit === 'number') {
        return usage < limit;
    }

    return true;
}

/**
 * Récupère les limites d'un plan
 * @param planName Nom du plan
 * @returns Limites du plan ou du plan FREE par défaut
 */
export function getPlanLimits(planName: PlanName): PlanLimit {
    const plan = getPlanByName(planName);
    return plan.limits;
} 