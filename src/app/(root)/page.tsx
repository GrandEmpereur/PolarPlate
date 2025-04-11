"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  CheckCircle2, 
  Github, 
  GitMerge, 
  Rocket, 
  Zap, 
  Code, 
  Database, 
  ShieldCheck, 
  Puzzle, 
  Send, 
  BarChart3, 
  Globe, 
  ScrollText,
  Star,
  Clock,
  CreditCard,
  DollarSign,
  Users,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <header className="pt-16 pb-20 md:pt-24 md:pb-24 flex flex-col items-center">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <span className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full inline-block mb-4">
              ✨ Version 1.0 disponible maintenant
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80"
          >
            PolarPlate
          </motion.h1>
          
          <motion.p 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-center text-muted-foreground max-w-2xl mb-6"
          >
            Boilerplate SaaS moderne pour développer rapidement des applications web typées et sécurisées
          </motion.p>
          
          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-center text-muted-foreground max-w-lg mb-10"
          >
            Démarrez en moins de 2 minutes avec une stack technique complète incluant Next.js 15, TypeScript, Shadcn/UI, Prisma, et la gestion des abonnements Stripe.
          </motion.p>
          
          <motion.div 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button asChild size="lg" className="group relative overflow-hidden">
              <Link href="/auth/sign-up">
                Essayer gratuitement
                <Sparkles className="ml-2 h-4 w-4 animate-pulse" />
                <span className="absolute bottom-0 left-0 h-1 bg-primary-foreground/20 w-0 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="group">
              <Link href="/pricing">
                <DollarSign className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                Voir les tarifs
              </Link>
            </Button>
          </motion.div>
        </header>

        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="py-12 flex justify-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <StatItem value="99.9%" label="Uptime" icon={<Clock className="h-5 w-5 text-primary" />} />
            <StatItem value="2 min" label="Setup" icon={<Rocket className="h-5 w-5 text-primary" />} />
            <StatItem value="500+" label="Utilisateurs" icon={<Users className="h-5 w-5 text-primary" />} />
            <StatItem value="24/7" label="Support" icon={<Send className="h-5 w-5 text-primary" />} />
          </div>
        </motion.section>

        {/* Features Grid */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="py-16"
        >
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-sm rounded-full border-primary/30">
              FONCTIONNALITÉS
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Technologies de pointe</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Une stack technique soigneusement sélectionnée pour offrir une expérience de développement optimale
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="p-6 border border-border/40 rounded-xl bg-card/50 backdrop-blur-sm hover:shadow-md transition-all duration-300 hover:border-primary/20 group"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="p-2 rounded-md bg-primary/10 text-primary">
                    <feature.icon className="h-5 w-5 group-hover:rotate-3 transition-transform" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Technologies */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="py-16 border-t border-border/40"
        >
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-sm rounded-full border-primary/30">
              STACK TECHNIQUE
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Propulsé par les meilleurs outils</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Technologies modernes pour un développement efficace et évolutif
            </p>
          </div>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center p-4 rounded-lg hover:bg-card/80 transition-colors"
              >
                <div className="bg-card/50 rounded-full p-3 mb-3">
                  <Image 
                    src={tech.logo} 
                    alt={tech.name} 
                    width={40} 
                    height={40} 
                    className="object-contain" 
                  />
                </div>
                <span className="font-medium text-sm text-center">{tech.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Testimonials */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="py-16 border-t border-border/40"
        >
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-sm rounded-full border-primary/30">
              TÉMOIGNAGES
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Ce que disent nos clients</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez comment PolarPlate a aidé des développeurs à accélérer leurs projets
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index + 0.3 }}
                className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/40 relative"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Image 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    width={48} 
                    height={48} 
                    className="rounded-full object-cover" 
                  />
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground italic">{testimonial.comment}</p>
                <p className="mt-3 text-sm font-medium text-primary">{testimonial.company}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Plan Comparison */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="py-16 border-t border-border/40"
        >
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-sm rounded-full border-primary/30">
              TARIFICATION
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Plans simples et transparents</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choisissez le plan qui correspond le mieux à vos besoins
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index + 0.3 }}
                className={`bg-card/50 backdrop-blur-sm rounded-xl p-6 border ${plan.popular ? 'border-primary' : 'border-border/40'} flex flex-col relative`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-0 right-0 flex justify-center">
                    <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                      Plus populaire
                    </span>
                  </div>
                )}
                
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                
                <div className="mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground ml-1">/{plan.period}</span>}
                </div>
                
                <Separator className="my-4" />
                
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  asChild 
                  className={`mt-auto ${plan.popular ? '' : 'bg-card hover:bg-card/80 text-foreground'}`} 
                  variant={plan.popular ? "default" : "outline"}
                >
                  <Link href={plan.link}>
                    {plan.buttonText}
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="py-16 mb-16 border-t border-border/40"
        >
          <div className="bg-card/80 backdrop-blur-sm rounded-xl p-8 sm:p-10 text-center max-w-3xl mx-auto border border-border/40">
            <Badge className="mb-6" variant="outline">PRÊT À DÉMARRER ?</Badge>
            <h2 className="text-3xl font-bold mb-4">Propulsez votre projet dès aujourd'hui</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Rejoignez des centaines de développeurs qui ont déjà accéléré leur workflow avec PolarPlate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/auth/sign-up">
                  <Rocket className="mr-2 h-4 w-4" />
                  Créer un compte
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/docs">
                  <ScrollText className="mr-2 h-4 w-4" />
                  Consulter la documentation
                </Link>
              </Button>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

function StatItem({ value, label, icon }: { value: string, label: string, icon: React.ReactNode }) {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-2">
        {icon}
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

const features = [
  {
    title: "Architecture moderne",
    description: "App Router de Next.js avec React Server Components pour une performance optimale et un développement simplifié.",
    icon: Code,
  },
  {
    title: "Authentication robuste",
    description: "Better Auth intégré avec multiples stratégies d'authentification et connexion via réseaux sociaux.",
    icon: ShieldCheck,
  },
  {
    title: "Base de données flexible",
    description: "Supabase et Prisma pour une gestion simplifiée de la base de données avec modèles typés.",
    icon: Database,
  },
  {
    title: "UI/UX optimisée",
    description: "Composants shadcn/ui personnalisables et réutilisables avec Tailwind CSS v4.",
    icon: Puzzle,
  },
  {
    title: "Performance optimale",
    description: "Déploiements rapides et temps de chargement minimaux avec Next.js 15 et Bun.sh.",
    icon: Zap,
  },
  {
    title: "Développement rapide",
    description: "Configuration prête à l'emploi avec TypeScript pour un développement fluide et maintenable.",
    icon: GitMerge,
  },
  {
    title: "Analyses avancées",
    description: "Tableau de bord d'analyse intégré pour suivre la performance et l'utilisation de votre application.",
    icon: BarChart3,
  },
  {
    title: "Localisation simplifiée",
    description: "Support multilingue intégré pour étendre facilement votre application à l'international.",
    icon: Globe,
  },
  {
    title: "Documentation complète",
    description: "Guide détaillé et exemples pour vous aider à démarrer rapidement et efficacement.",
    icon: ScrollText,
  },
];

const technologies = [
  { name: "Next.js 15", logo: "/svg/nextjs.svg" },
  { name: "Supabase", logo: "/svg/supabase.svg" },
  { name: "Better Auth", logo: "/better-auth.png" },
  { name: "Prisma", logo: "/svg/prisma.svg" },
  { name: "Tailwind CSS", logo: "/svg/tailwind.svg" },
  { name: "shadcn/ui", logo: "/svg/shadcnui.svg" },
  { name: "Bun.sh", logo: "/svg/bun.svg" },
  { name: "Stripe", logo: "/svg/stripe.svg" },
  { name: "TypeScript", logo: "/svg/typescript.svg" },
  { name: "Framer Motion", logo: "/svg/framermotion.svg" },
  { name: "Resend", logo: "/svg/resend.svg" },
];

const testimonials = [
  {
    name: "Sophie Durand",
    role: "Lead Developer",
    company: "TechInnovate",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    comment: "PolarPlate nous a fait gagner des semaines de configuration. Nous avons pu nous concentrer sur les fonctionnalités qui apportent de la valeur à nos clients dès le premier jour."
  },
  {
    name: "Thomas Martin",
    role: "CTO",
    company: "StartupFlow",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    comment: "La combinaison de Next.js, Prisma et Stripe déjà configurée nous a permis de lancer notre produit SaaS en un temps record. Les composants shadcn/ui sont magnifiques et faciles à personnaliser."
  },
  {
    name: "Léa Bernard",
    role: "Frontend Developer",
    company: "DesignLab",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    comment: "PolarPlate offre une expérience de développement remarquable. J'ai adoré l'intégration de Tailwind avec les composants shadcn/ui et les animations Framer Motion prêtes à l'emploi."
  }
];

const plans = [
  {
    name: "Gratuit",
    description: "Pour débuter votre projet",
    price: "0€",
    period: "mois",
    features: [
      "3 projets maximum",
      "100MB de stockage",
      "1000 requêtes API/mois",
      "Support communautaire",
      "Authentification de base"
    ],
    buttonText: "Commencer gratuitement",
    link: "/auth/sign-up",
    popular: false
  },
  {
    name: "Pro",
    description: "Pour les équipes en croissance",
    price: "29€",
    period: "mois",
    features: [
      "10 projets maximum",
      "5GB de stockage",
      "10,000 requêtes API/mois",
      "Support prioritaire",
      "Authentification avancée",
      "Tableau de bord d'analyse",
      "Essai gratuit de 14 jours"
    ],
    buttonText: "Essayer gratuitement",
    link: "/auth/sign-up?plan=pro",
    popular: true
  },
  {
    name: "Enterprise",
    description: "Pour les entreprises",
    price: "Sur mesure",
    period: null,
    features: [
      "Projets illimités",
      "50GB de stockage",
      "100,000 requêtes API/mois",
      "Support dédié 24/7",
      "Authentification personnalisée",
      "Analyses avancées",
      "SLA garanti",
      "Instance dédiée"
    ],
    buttonText: "Contacter l'équipe commerciale",
    link: "/contact",
    popular: false
  }
];
