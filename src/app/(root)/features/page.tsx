"use client";

import { motion } from "framer-motion";
import { Check, Zap, Shield, Database, Code, Users, Sparkles, Award, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function FeaturesPage() {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-12 space-y-16">
      {/* En-tête */}
      <div className="text-center max-w-3xl mx-auto">
        <Badge variant="outline" className="mb-4 px-3 py-1 text-sm rounded-full border-primary/30">
          FONCTIONNALITÉS
        </Badge>
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80"
        >
          Une solution SaaS complète
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xl text-muted-foreground"
        >
          PolarPlate intègre tout ce dont vous avez besoin pour construire, lancer et faire évoluer 
          votre application SaaS en un temps record.
        </motion.p>
      </div>

      {/* Fonctionnalités principales - Grille */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {mainFeatures.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-md transition-all border-border/40 overflow-hidden group">
              <CardHeader className="p-6 pb-4">
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <ul className="space-y-2">
                  {feature.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Section Performance */}
      <div className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-3xl z-0" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <Badge variant="outline" className="mb-2">PERFORMANCE OPTIMALE</Badge>
              <h2 className="text-3xl font-bold mb-4">Rapide par conception</h2>
              <p className="text-muted-foreground">
                PolarPlate est construit sur des technologies de pointe pour offrir des performances 
                exceptionnelles dès le départ, sans compromis.
              </p>
            </div>

            <div className="space-y-4">
              {performanceFeatures.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="rounded-full p-1.5 bg-primary/10 text-primary mt-0.5">
                    <feature.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative h-[400px] rounded-2xl overflow-hidden border border-border/40"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <Image 
                src="/images/dashboard-preview.png" 
                alt="Performance Dashboard" 
                fill
                className="object-cover"
                onError={(e) => {
                  // Image de remplacement si celle spécifiée n'existe pas
                  const target = e.target as HTMLImageElement;
                  target.src = "https://placehold.co/800x600/1a1a1a/f9f9f9?text=Dashboard+Preview";
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Section Framework & Technologies */}
      <div className="space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="outline" className="mb-4">STACK TECHNOLOGIQUE</Badge>
          <h2 className="text-3xl font-bold mb-4">Propulsé par les meilleurs outils</h2>
          <p className="text-muted-foreground">
            Un ensemble de technologies de pointe soigneusement sélectionnées pour offrir une expérience de développement optimale.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="flex flex-col items-center p-4 rounded-lg hover:bg-card/80 transition-colors"
            >
              <div className="bg-card/50 rounded-full p-4 mb-3 border border-border/30">
                <div className="w-12 h-12 relative">
                  <Image 
                    src={tech.logo} 
                    alt={tech.name} 
                    fill
                    className="object-contain" 
                  />
                </div>
              </div>
              <span className="font-medium text-sm text-center">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Final */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center py-10 max-w-3xl mx-auto bg-card/30 rounded-2xl p-8 border border-border/40 mt-16"
      >
        <h2 className="text-3xl font-bold mb-4">Prêt à accélérer votre projet ?</h2>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
          Rejoignez des centaines de développeurs qui ont déjà transformé leurs idées en applications SaaS performantes.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/pricing">Voir les tarifs</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/docs">Consulter la documentation</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

// Données

const mainFeatures = [
  {
    title: "Architecture Moderne",
    description: "Une base de code organisée et scalable basée sur les dernières technologies",
    icon: Code,
    bullets: [
      "Next.js 15 avec App Router",
      "React Server Components",
      "TypeScript avec typage strict",
      "Code structuré en composants réutilisables"
    ]
  },
  {
    title: "Authentification Complète",
    description: "Système d'authentification sécurisé et prêt à l'emploi",
    icon: Shield,
    bullets: [
      "Connexion par email/mot de passe",
      "OAuth (Google, Github)",
      "Vérification d'email",
      "Gestion des rôles et permissions"
    ]
  },
  {
    title: "Base de Données Optimisée",
    description: "Gestion des données performante avec les meilleurs outils",
    icon: Database,
    bullets: [
      "Supabase PostgreSQL",
      "ORM Prisma typé",
      "Migrations automatisées",
      "Schémas validés avec Zod"
    ]
  },
  {
    title: "Interface Utilisateur élégante",
    description: "Des composants UI modernes et accessibles pour une expérience utilisateur exceptionnelle",
    icon: Sparkles,
    bullets: [
      "Composants Shadcn UI personnalisables",
      "Tailwind CSS v4",
      "Animations fluides avec Framer Motion",
      "Design responsive et accessible"
    ]
  },
  {
    title: "Paiements Intégrés",
    description: "Système complet de gestion des abonnements et paiements",
    icon: Award,
    bullets: [
      "Intégration Stripe clé en main",
      "Gestion des plans d'abonnement",
      "Webhooks sécurisés",
      "Portail client de facturation"
    ]
  },
  {
    title: "Multi-utilisateurs",
    description: "Fonctionnalités collaboratives pour les équipes et organisations",
    icon: Users,
    bullets: [
      "Gestion des équipes",
      "Permissions par rôle",
      "Invitations par email",
      "Tableau de bord d'activité"
    ]
  }
];

const performanceFeatures = [
  {
    title: "Optimisation des images et assets",
    description: "Chargement optimisé des ressources avec compression automatique et CDN",
    icon: Zap
  },
  {
    title: "Mise en cache intelligente",
    description: "Stratégie de cache avancée pour des temps de chargement minimaux",
    icon: Clock
  },
  {
    title: "Code-splitting automatique",
    description: "Chargement sélectif des composants pour des performances optimales",
    icon: Sparkles
  }
];

const technologies = [
  { name: "Next.js", logo: "/svg/nextjs.svg" },
  { name: "React", logo: "/svg/react.svg" },
  { name: "TypeScript", logo: "/svg/typescript.svg" },
  { name: "Tailwind CSS", logo: "/svg/tailwind.svg" },
  { name: "Shadcn UI", logo: "/svg/shadcnui.svg" },
  { name: "Framer Motion", logo: "/svg/framermotion.svg" },
  { name: "Prisma", logo: "/svg/prisma.svg" },
  { name: "Supabase", logo: "/svg/supabase.svg" },
]; 