"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, X, Zap, Shield, Users, Building, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useSession } from "@/lib/auth-client";

// IDs de prix Stripe - à remplacer par tes vrais IDs
const PLAN_TYPES = {
  FREE: "free",
  PRO: "pro",
  ENTERPRISE: "enterprise"
};

const plans = [
  {
    name: "Gratuit",
    description: "Pour les particuliers et les petits projets",
    price: "0€",
    period: "pour toujours",
    features: [
      { text: "Accès aux fonctionnalités de base", included: true },
      { text: "Jusqu'à 2 projets", included: true },
      { text: "Stockage jusqu'à 500 Mo", included: true },
      { text: "Support par email", included: true },
      { text: "Intégrations de base", included: true },
      { text: "Analytics basiques", included: true },
      { text: "API limitée", included: false },
      { text: "Support prioritaire", included: false },
    ],
    cta: "Commencer gratuitement",
    popular: false,
    icon: Users,
    gradient: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
    href: "/auth/signup",
    planType: PLAN_TYPES.FREE
  },
  {
    name: "Pro",
    description: "Pour les professionnels et les équipes",
    price: "29€",
    period: "par mois",
    features: [
      { text: "Tout ce qui est inclus dans Gratuit", included: true },
      { text: "Jusqu'à 10 projets", included: true },
      { text: "Stockage jusqu'à 5 Go", included: true },
      { text: "Support prioritaire", included: true },
      { text: "Intégrations avancées", included: true },
      { text: "Analytics avancés", included: true },
      { text: "API complète", included: true },
      { text: "SLA garanti", included: false },
    ],
    cta: "Commencer l'essai gratuit",
    popular: true,
    icon: Zap,
    gradient: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30",
    href: "/checkout/pro",
    planType: PLAN_TYPES.PRO
  },
  {
    name: "Entreprise",
    description: "Pour les grandes organisations",
    price: "99€",
    period: "par mois",
    features: [
      { text: "Tout ce qui est inclus dans Pro", included: true },
      { text: "Projets illimités", included: true },
      { text: "Stockage illimité", included: true },
      { text: "Support dédié 24/7", included: true },
      { text: "Intégrations personnalisées", included: true },
      { text: "Analytics avancés", included: true },
      { text: "API personnalisée", included: true },
      { text: "SLA garanti", included: true },
    ],
    cta: "Contacter les ventes",
    popular: false,
    icon: Building,
    gradient: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-500/30",
    href: "/checkout/enterprise",
    planType: PLAN_TYPES.ENTERPRISE
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

export default function PricingPage() {
  const { theme } = useTheme();
  const [isAnnual, setIsAnnual] = React.useState(false);
  const { data } = useSession();

  // Fonction pour calculer le prix annuel avec réduction
  const calculateAnnualPrice = (monthlyPrice: string) => {
    if (monthlyPrice === "0€") return "0€";
    const price = parseInt(monthlyPrice);
    const annualPrice = Math.round(price * 12 * 0.8); // 20% de réduction sur le prix annuel, arrondi à l'entier
    return `${annualPrice}€`;
  };

  // Fonction pour gérer le clic sur un plan
  const handlePlanClick = async (plan: typeof plans[0]) => {
    if (plan.name === "Gratuit") {
      window.location.href = plan.href;
      return;
    }

    // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
    if (!data) {
      window.location.href = `/auth/signin?redirect=${encodeURIComponent(plan.href)}`;
      return;
    }

    // Si l'utilisateur est connecté, créer un checkout Stripe
    try {
      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planType: plan.planType,
          isAnnual: isAnnual,
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/pricing`,
        }),
      });

      const { url } = await response.json();
      
      if (url) {
        window.location.href = url;
      } else {
        throw new Error("Erreur lors de la création de la session de paiement");
      }
    } catch (error) {
      console.error("Erreur lors de la redirection vers le checkout:", error);
      alert("Une erreur est survenue lors de la création du paiement. Veuillez réessayer.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
      {/* Effet de particules en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary/10"
              style={{
                width: Math.random() * 10 + 5,
                height: Math.random() * 10 + 5,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                x: [0, Math.random() * 100 - 50],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 sm:py-24 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-primary/10 text-primary text-sm font-medium"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            <span>Tarification transparente</span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Choisissez votre plan
          </motion.h1>
          
          <motion.p 
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Des solutions adaptées à tous vos besoins, avec un essai gratuit de 14 jours sur tous nos plans.
          </motion.p>
          
          <motion.div 
            className="flex items-center justify-center mt-10 space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span className={cn("text-sm", !isAnnual && "text-primary font-medium")}>Mensuel</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isAnnual ? "bg-primary" : "bg-muted"
              )}
            >
              <span
                className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-background shadow-sm transition-transform",
                  isAnnual ? "translate-x-6" : "translate-x-1"
                )}
              />
            </button>
            <span className={cn("text-sm", isAnnual && "text-primary font-medium")}>
              Annuel <span className="text-xs text-primary">(Économisez 20%)</span>
            </span>
          </motion.div>
        </div>

        <motion.div 
          className="grid grid-cols-1 gap-8 md:grid-cols-3 mt-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={itemVariants}
              className={cn(
                "relative flex flex-col rounded-2xl border p-8 shadow-lg transition-all duration-300",
                plan.popular 
                  ? "border-primary/50 bg-gradient-to-br from-primary/5 to-primary/10" 
                  : `border-${plan.borderColor} bg-gradient-to-br ${plan.gradient}`,
                "hover:shadow-xl hover:scale-[1.02] hover:border-primary/50"
              )}
              whileHover={{ y: -10 }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow-lg">
                    <Zap className="mr-1 h-3 w-3" />
                    Populaire
                  </div>
                </div>
              )}
              
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className={cn(
                    "p-2 rounded-full",
                    plan.popular ? "bg-primary/20" : "bg-primary/10"
                  )}>
                    <plan.icon className={cn(
                      "h-5 w-5",
                      plan.popular ? "text-primary" : "text-primary/80"
                    )} />
                  </div>
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">
                    {isAnnual ? calculateAnnualPrice(plan.price) : plan.price}
                  </span>
                  <span className="text-muted-foreground ml-1">/{isAnnual ? "an" : "mois"}</span>
                </div>
                {isAnnual && plan.price !== "0€" && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {`${plan.price}/mois facturé annuellement`}
                  </p>
                )}
              </div>
              
              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    {feature.included ? (
                      <div className="p-1 rounded-full bg-primary/10 mr-2">
                        <Check className="h-4 w-4 text-primary shrink-0" />
                      </div>
                    ) : (
                      <div className="p-1 rounded-full bg-muted mr-2">
                        <X className="h-4 w-4 text-muted-foreground shrink-0" />
                      </div>
                    )}
                    <span className={cn(
                      "text-sm",
                      feature.included ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {feature.text}
                    </span>
                  </motion.li>
                ))}
              </ul>
              
              <Button 
                className={cn(
                  "w-full relative overflow-hidden group",
                  plan.popular ? "bg-primary hover:bg-primary/90" : ""
                )}
                onClick={() => handlePlanClick(plan)}
              >
                <span className="relative z-10 flex items-center justify-center">
                  {plan.cta}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Tableau de comparaison des fonctionnalités */}
        <motion.div 
          className="mt-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Comparaison des fonctionnalités
          </h2>
          
          <div className="overflow-x-auto rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm shadow-lg">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="py-4 px-6 text-left font-medium text-muted-foreground">Fonctionnalités</th>
                  <th className="py-4 px-6 text-center font-medium">
                    <div className="flex flex-col items-center">
                      <span>Gratuit</span>
                      <span className="text-xs text-muted-foreground">0€/mois</span>
                    </div>
                  </th>
                  <th className="py-4 px-6 text-center font-medium">
                    <div className="flex flex-col items-center">
                      <span>Pro</span>
                      <span className="text-xs text-muted-foreground">29€/mois</span>
                    </div>
                  </th>
                  <th className="py-4 px-6 text-center font-medium">
                    <div className="flex flex-col items-center">
                      <span>Entreprise</span>
                      <span className="text-xs text-muted-foreground">99€/mois</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/40 hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-6 font-medium">Projets</td>
                  <td className="py-4 px-6 text-center">2</td>
                  <td className="py-4 px-6 text-center">10</td>
                  <td className="py-4 px-6 text-center">Illimité</td>
                </tr>
                <tr className="border-b border-border/40 hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-6 font-medium">Stockage</td>
                  <td className="py-4 px-6 text-center">500 Mo</td>
                  <td className="py-4 px-6 text-center">5 Go</td>
                  <td className="py-4 px-6 text-center">Illimité</td>
                </tr>
                <tr className="border-b border-border/40 hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-6 font-medium">Utilisateurs</td>
                  <td className="py-4 px-6 text-center">1</td>
                  <td className="py-4 px-6 text-center">5</td>
                  <td className="py-4 px-6 text-center">Illimité</td>
                </tr>
                <tr className="border-b border-border/40 hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-6 font-medium">Support</td>
                  <td className="py-4 px-6 text-center">Email</td>
                  <td className="py-4 px-6 text-center">Prioritaire</td>
                  <td className="py-4 px-6 text-center">Dédié 24/7</td>
                </tr>
                <tr className="border-b border-border/40 hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-6 font-medium">Intégrations</td>
                  <td className="py-4 px-6 text-center">De base</td>
                  <td className="py-4 px-6 text-center">Avancées</td>
                  <td className="py-4 px-6 text-center">Personnalisées</td>
                </tr>
                <tr className="border-b border-border/40 hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-6 font-medium">Analytics</td>
                  <td className="py-4 px-6 text-center">Basiques</td>
                  <td className="py-4 px-6 text-center">Avancés</td>
                  <td className="py-4 px-6 text-center">Avancés</td>
                </tr>
                <tr className="border-b border-border/40 hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-6 font-medium">API</td>
                  <td className="py-4 px-6 text-center">
                    <X className="h-5 w-5 text-muted-foreground mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Check className="h-5 w-5 text-primary mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Check className="h-5 w-5 text-primary mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-border/40 hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-6 font-medium">SLA garanti</td>
                  <td className="py-4 px-6 text-center">
                    <X className="h-5 w-5 text-muted-foreground mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <X className="h-5 w-5 text-muted-foreground mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Check className="h-5 w-5 text-primary mx-auto" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
        
        <motion.div 
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Questions fréquentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto text-left">
            <motion.div 
              className="p-6 rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm shadow-md hover:shadow-lg transition-all"
              whileHover={{ y: -5 }}
            >
              <h3 className="font-medium text-lg mb-2">Puis-je changer de plan à tout moment ?</h3>
              <p className="text-muted-foreground text-sm">
                Oui, vous pouvez passer à un plan supérieur ou inférieur à tout moment. Les changements sont appliqués immédiatement.
              </p>
            </motion.div>
            <motion.div 
              className="p-6 rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm shadow-md hover:shadow-lg transition-all"
              whileHover={{ y: -5 }}
            >
              <h3 className="font-medium text-lg mb-2">Y a-t-il des frais cachés ?</h3>
              <p className="text-muted-foreground text-sm">
                Non, tous nos prix sont transparents. Vous ne serez facturé que pour le plan que vous choisissez.
              </p>
            </motion.div>
            <motion.div 
              className="p-6 rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm shadow-md hover:shadow-lg transition-all"
              whileHover={{ y: -5 }}
            >
              <h3 className="font-medium text-lg mb-2">Que se passe-t-il après l'essai gratuit ?</h3>
              <p className="text-muted-foreground text-sm">
                Après 14 jours, vous serez automatiquement facturé pour le plan que vous avez choisi. Vous pouvez annuler à tout moment.
              </p>
            </motion.div>
            <motion.div 
              className="p-6 rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm shadow-md hover:shadow-lg transition-all"
              whileHover={{ y: -5 }}
            >
              <h3 className="font-medium text-lg mb-2">Proposez-vous des remises pour les organisations à but non lucratif ?</h3>
              <p className="text-muted-foreground text-sm">
                Oui, nous offrons des remises spéciales pour les organisations à but non lucratif. Contactez-nous pour en savoir plus.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 