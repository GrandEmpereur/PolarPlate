"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, Database, Key, Layout, Package, Server, Zap } from "lucide-react";

export default function DocumentationPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container max-w-7xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold tracking-tight"
          >
            Documentation PolarPlate
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-4 text-xl text-muted-foreground"
          >
            Guide complet de la stack technique et de l'architecture
          </motion.p>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-6 w-full">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="tech-stack">Stack Technique</TabsTrigger>
            <TabsTrigger value="auth">Authentification</TabsTrigger>
            <TabsTrigger value="payments">Paiements</TabsTrigger>
            <TabsTrigger value="structure">Structure</TabsTrigger>
            <TabsTrigger value="ui">Interface UI</TabsTrigger>
          </TabsList>

          {/* Vue d'ensemble */}
          <TabsContent value="overview" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>PolarPlate - Boilerplate Next.js 15</CardTitle>
                <CardDescription>
                  Une solution complète pour démarrer rapidement des projets avec la stack moderne
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-3">
                  <Feature 
                    icon={<Server className="h-6 w-6 text-primary" />}
                    title="Backend Moderne"
                    description="API routes Next.js avec Prisma et Supabase pour une gestion efficace des données"
                  />
                  <Feature 
                    icon={<Key className="h-6 w-6 text-primary" />}
                    title="Authentification Complète"
                    description="Better Auth intégré avec authentification sociale et vérification d'email"
                  />
                  <Feature 
                    icon={<Zap className="h-6 w-6 text-primary" />}
                    title="Paiements Intégrés"
                    description="Système d'abonnement complet avec Stripe et webhooks sécurisés"
                  />
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Caractéristiques principales</h3>
                  <ul className="space-y-2">
                    <ListItem>Next.js 15 avec App Router</ListItem>
                    <ListItem>Interface UI avec Shadcn UI et Tailwind CSS</ListItem>
                    <ListItem>Animations fluides avec Framer Motion</ListItem>
                    <ListItem>Base de données PostgreSQL via Supabase</ListItem>
                    <ListItem>ORM Prisma pour la gestion de base de données</ListItem>
                    <ListItem>Authentification complète avec Better Auth</ListItem>
                    <ListItem>Intégration Stripe pour les paiements et abonnements</ListItem>
                    <ListItem>Service email avec Resend</ListItem>
                    <ListItem>TypeScript pour une sécurité de type</ListItem>
                    <ListItem>Bundle avec bun.sh pour des performances optimales</ListItem>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Stack Technique */}
          <TabsContent value="tech-stack" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Stack Technique</CardTitle>
                <CardDescription>
                  Détails des technologies utilisées dans PolarPlate
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <TechItem 
                    title="Next.js 15" 
                    version="15.2.4"
                    description="Framework React avec App Router, Server Components et optimisations avancées"
                    usage="Structure de l'application, rendu hybride (SSR/SSG), API routes"
                  />
                  <TechItem 
                    title="React 19" 
                    version="19.0.0"
                    description="Bibliothèque UI avec les dernières fonctionnalités de React"
                    usage="Construction de l'interface utilisateur et composants interactifs"
                  />
                  <TechItem 
                    title="TypeScript" 
                    version="5+"
                    description="Superset typé de JavaScript pour une meilleure maintenabilité"
                    usage="Typage statique pour tous les fichiers source du projet"
                  />
                  <TechItem 
                    title="Tailwind CSS" 
                    version="4"
                    description="Framework CSS utilitaire hautement personnalisable"
                    usage="Styling de tous les composants avec l'approche utility-first"
                  />
                  <TechItem 
                    title="Shadcn UI" 
                    version="Latest"
                    description="Collection de composants UI réutilisables basés sur Radix UI"
                    usage="Composants d'interface accessibles et hautement personnalisables"
                  />
                  <TechItem 
                    title="Framer Motion" 
                    version="12.6.3"
                    description="Bibliothèque d'animations pour React"
                    usage="Animations et transitions fluides dans l'interface utilisateur"
                  />
                  <TechItem 
                    title="Prisma" 
                    version="6.5.0"
                    description="ORM moderne pour TypeScript et Node.js"
                    usage="Modélisation de la base de données, migrations et requêtes typées"
                  />
                  <TechItem 
                    title="Supabase" 
                    version="Latest"
                    description="Alternative open source à Firebase avec PostgreSQL"
                    usage="Hébergement de base de données PostgreSQL"
                  />
                  <TechItem 
                    title="Better Auth" 
                    version="1.2.5"
                    description="Solution d'authentification complète pour Next.js"
                    usage="Système d'authentification, sessions, vérification d'email, OAuth"
                  />
                  <TechItem 
                    title="Stripe" 
                    version="18.0.0"
                    description="Plateforme de paiement en ligne"
                    usage="Gestion des paiements, abonnements et webhooks"
                  />
                  <TechItem 
                    title="Resend" 
                    version="4.2.0"
                    description="API email moderne pour les développeurs"
                    usage="Envoi d'emails transactionnels et de notifications"
                  />
                  <TechItem 
                    title="Zod" 
                    version="3.24.2"
                    description="Bibliothèque de validation de schéma TypeScript-first"
                    usage="Validation des données d'entrée et garantie d'intégrité"
                  />
                  <TechItem 
                    title="bun.sh" 
                    version="Latest"
                    description="Runtime JavaScript tout-en-un et gestionnaire de paquets"
                    usage="Gestionnaire de paquets et exécution des scripts"
                  />
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Authentification */}
          <TabsContent value="auth" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Système d'Authentification</CardTitle>
                <CardDescription>
                  Implémentation de l'authentification avec Better Auth
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Méthodes d'authentification</h3>
                  <ul className="space-y-2">
                    <ListItem>Email et mot de passe avec vérification d'email</ListItem>
                    <ListItem>OAuth via Google</ListItem>
                    <ListItem>OAuth via GitHub</ListItem>
                    <ListItem>Réinitialisation de mot de passe sécurisée</ListItem>
                  </ul>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Gestion des sessions</h3>
                  <p className="text-muted-foreground">
                    Les sessions utilisateur sont gérées via des cookies sécurisés et stockées dans la base de données Postgres.
                    Chaque session comprend:
                  </p>
                  <ul className="space-y-2">
                    <ListItem>Token unique et sécurisé</ListItem>
                    <ListItem>Date d'expiration configurable</ListItem>
                    <ListItem>Informations de l'agent utilisateur et IP (optionnel)</ListItem>
                    <ListItem>Invalidation automatique après expiration</ListItem>
                  </ul>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Modèle de données</h3>
                  <p className="text-muted-foreground">
                    Le système utilise les modèles Prisma suivants:
                  </p>
                  <ul className="space-y-2">
                    <ListItem>User - Informations de l'utilisateur</ListItem>
                    <ListItem>Session - Sessions actives</ListItem>
                    <ListItem>Account - Comptes liés (OAuth)</ListItem>
                    <ListItem>Verification - Vérifications d'email et réinitialisation de mot de passe</ListItem>
                  </ul>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Routes d'API</h3>
                  <p className="text-muted-foreground">
                    Les routes d'authentification sont exposées via:
                  </p>
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                    /api/auth/[...all]
                  </code>
                  <p className="text-muted-foreground mt-2">
                    Cette route gère toutes les opérations d'authentification via les méthodes POST et GET.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Paiements */}
          <TabsContent value="payments" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Système de Paiements</CardTitle>
                <CardDescription>
                  Intégration complète avec Stripe pour les abonnements et paiements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Plans d'abonnement</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <PlanCard
                      name="FREE"
                      description="Plan de base gratuit"
                      features={["3 projets maximum", "100MB de stockage", "1000 requêtes API/mois"]}
                    />
                    <PlanCard
                      name="PRO"
                      description="Plan professionnel"
                      features={["10 projets maximum", "5GB de stockage", "10,000 requêtes API/mois", "Essai gratuit de 14 jours"]}
                    />
                    <PlanCard
                      name="ENTERPRISE"
                      description="Plan entreprise"
                      features={["50 projets maximum", "50GB de stockage", "100,000 requêtes API/mois"]}
                    />
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Webhook Stripe</h3>
                  <p className="text-muted-foreground">
                    Les webhooks Stripe sont utilisés pour synchroniser les événements de paiement avec l'application.
                    Le endpoint webhook est:
                  </p>
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                    /api/stripe/webhook
                  </code>
                  <p className="text-muted-foreground mt-2">
                    Ce endpoint gère les événements suivants:
                  </p>
                  <ul className="space-y-2">
                    <ListItem>checkout.session.completed</ListItem>
                    <ListItem>customer.subscription.created</ListItem>
                    <ListItem>customer.subscription.updated</ListItem>
                    <ListItem>customer.subscription.deleted</ListItem>
                    <ListItem>invoice.paid</ListItem>
                    <ListItem>invoice.payment_failed</ListItem>
                  </ul>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Routes de paiement</h3>
                  <ul className="space-y-2">
                    <ListItem>
                      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                        /api/stripe/create-checkout
                      </code>
                      <span className="ml-2">Création d'une session de checkout</span>
                    </ListItem>
                    <ListItem>
                      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                        /api/stripe/portal
                      </code>
                      <span className="ml-2">Accès au portail client Stripe</span>
                    </ListItem>
                  </ul>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Modèles de données</h3>
                  <p className="text-muted-foreground">
                    Le système utilise les modèles Prisma suivants pour les paiements:
                  </p>
                  <ul className="space-y-2">
                    <ListItem>Subscription - Abonnements utilisateur</ListItem>
                    <ListItem>Payment - Historique des paiements</ListItem>
                    <ListItem>WebhookEvent - Événements Stripe reçus</ListItem>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Structure du Projet */}
          <TabsContent value="structure" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Structure du Projet</CardTitle>
                <CardDescription>
                  Organisation des fichiers et dossiers du projet
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <DirectoryItem 
                    name="src/" 
                    description="Code source de l'application"
                    items={[
                      {
                        name: "app/",
                        description: "Pages et routes de l'application (App Router)",
                        items: [
                          { name: "api/", description: "Routes API Next.js" },
                          { name: "(auth)/", description: "Pages d'authentification (groupe de routes)" },
                          { name: "(dashboard)/", description: "Pages du tableau de bord (groupe de routes)" },
                          { name: "(root)/", description: "Pages publiques (groupe de routes)" },
                          { name: "success/", description: "Page de succès après paiement" },
                          { name: "layout.tsx", description: "Layout racine de l'application" },
                          { name: "globals.css", description: "Styles CSS globaux" }
                        ]
                      },
                      {
                        name: "components/",
                        description: "Composants réutilisables",
                        items: [
                          { name: "ui/", description: "Composants UI basés sur shadcn/ui" },
                          { name: "navbar.tsx", description: "Barre de navigation" },
                          { name: "footer.tsx", description: "Pied de page" },
                          { name: "theme-provider.tsx", description: "Provider de thème clair/sombre" }
                        ]
                      },
                      {
                        name: "lib/",
                        description: "Utilitaires et services",
                        items: [
                          { name: "auth.ts", description: "Configuration de Better Auth" },
                          { name: "auth-client.ts", description: "Hooks client pour l'authentification" },
                          { name: "auth.session.ts", description: "Utilitaires de session" },
                          { name: "prisma.ts", description: "Instance client Prisma" },
                          { name: "resend.ts", description: "Configuration du service email" },
                          { name: "subscription-plans.ts", description: "Configuration des plans d'abonnement" },
                          { name: "subscription-client.ts", description: "Hooks client pour les abonnements" },
                          { name: "utils.ts", description: "Fonctions utilitaires diverses" }
                        ]
                      },
                      {
                        name: "hooks/",
                        description: "Hooks React personnalisés"
                      }
                    ]}
                  />
                  <DirectoryItem 
                    name="prisma/" 
                    description="Configuration et schéma Prisma"
                    items={[
                      { name: "schema.prisma", description: "Modèle de données Prisma" },
                      { name: "migrations/", description: "Migrations de base de données" }
                    ]}
                  />
                  <DirectoryItem 
                    name="public/" 
                    description="Fichiers statiques accessibles publiquement"
                    items={[
                      { name: "images/", description: "Images statiques" },
                      { name: "fonts/", description: "Polices personnalisées" }
                    ]}
                  />
                  <DirectoryItem 
                    name="./" 
                    description="Fichiers racine du projet"
                    items={[
                      { name: "package.json", description: "Dépendances et scripts npm" },
                      { name: "tsconfig.json", description: "Configuration TypeScript" },
                      { name: "next.config.ts", description: "Configuration Next.js" },
                      { name: ".env", description: "Variables d'environnement" },
                      { name: "components.json", description: "Configuration shadcn/ui" }
                    ]}
                  />
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Interface UI */}
          <TabsContent value="ui" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Interface Utilisateur</CardTitle>
                <CardDescription>
                  Composants d'interface et design system
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Design System</h3>
                  <p className="text-muted-foreground">
                    L'interface de PolarPlate est construite avec Shadcn UI sur Tailwind CSS,
                    offrant un design system cohérent et personnalisable.
                  </p>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Card className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Thème Clair/Sombre</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Support complet des thèmes clair et sombre avec next-themes et des styles 
                          CSS personnalisés utilisant Oklch pour les couleurs.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Animations</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Framer Motion pour des animations fluides et tw-animate-css 
                          pour des transitions CSS.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Composants UI</h3>
                  <p className="text-muted-foreground">
                    Le projet inclut tous les composants Shadcn UI, optimisés pour l'accessibilité et la personnalisation:
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <ComponentBadge name="accordion" />
                    <ComponentBadge name="alert" />
                    <ComponentBadge name="alert-dialog" />
                    <ComponentBadge name="aspect-ratio" />
                    <ComponentBadge name="avatar" />
                    <ComponentBadge name="badge" />
                    <ComponentBadge name="breadcrumb" />
                    <ComponentBadge name="button" />
                    <ComponentBadge name="calendar" />
                    <ComponentBadge name="card" />
                    <ComponentBadge name="chart" />
                    <ComponentBadge name="checkbox" />
                    <ComponentBadge name="collapsible" />
                    <ComponentBadge name="command" />
                    <ComponentBadge name="context-menu" />
                    <ComponentBadge name="dialog" />
                    <ComponentBadge name="drawer" />
                    <ComponentBadge name="dropdown-menu" />
                    <ComponentBadge name="form" />
                    <ComponentBadge name="hover-card" />
                    <ComponentBadge name="input" />
                    <ComponentBadge name="input-otp" />
                    <ComponentBadge name="label" />
                    <ComponentBadge name="menubar" />
                    <ComponentBadge name="navigation-menu" />
                    <ComponentBadge name="pagination" />
                    <ComponentBadge name="popover" />
                    <ComponentBadge name="progress" />
                    <ComponentBadge name="radio-group" />
                    <ComponentBadge name="resizable" />
                    <ComponentBadge name="scroll-area" />
                    <ComponentBadge name="select" />
                    <ComponentBadge name="separator" />
                    <ComponentBadge name="sheet" />
                    <ComponentBadge name="sidebar" />
                    <ComponentBadge name="skeleton" />
                    <ComponentBadge name="slider" />
                    <ComponentBadge name="switch" />
                    <ComponentBadge name="table" />
                    <ComponentBadge name="tabs" />
                    <ComponentBadge name="textarea" />
                    <ComponentBadge name="toast" />
                    <ComponentBadge name="toggle" />
                    <ComponentBadge name="toggle-group" />
                    <ComponentBadge name="tooltip" />
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Composants personnalisés</h3>
                  <p className="text-muted-foreground">
                    En plus des composants Shadcn UI, PolarPlate inclut des composants personnalisés:
                  </p>
                  <ul className="space-y-2">
                    <ListItem>Navbar responsive avec navigation mobile</ListItem>
                    <ListItem>Footer avec liens et informations sur le site</ListItem>
                    <ListItem>Sidebar spécialisée pour le tableau de bord</ListItem>
                    <ListItem>Charts pour la visualisation de données</ListItem>
                    <ListItem>Composants spécifiques aux plans d'abonnement</ListItem>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}

// Composants utilitaires
function Feature({ icon, title, description }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="rounded-lg p-3 w-fit bg-primary/10">
        {icon}
      </div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function ListItem({ children }) {
  return (
    <li className="flex items-start gap-2">
      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
      <span>{children}</span>
    </li>
  );
}

function TechItem({ title, version, description, usage }) {
  return (
    <AccordionItem value={title.toLowerCase().replace(/\s+/g, "-")}>
      <AccordionTrigger className="hover:no-underline">
        <div className="flex items-center gap-2">
          <span>{title}</span>
          <Badge variant="outline" className="ml-2 font-mono">v{version}</Badge>
        </div>
      </AccordionTrigger>
      <AccordionContent className="space-y-2 pt-2">
        <div>
          <p className="font-medium text-sm">Description:</p>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
        <div>
          <p className="font-medium text-sm">Utilisation:</p>
          <p className="text-muted-foreground text-sm">{usage}</p>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

function DirectoryItem({ name, description, items = [] }) {
  return (
    <AccordionItem value={name.replace(/\//g, "-")}>
      <AccordionTrigger className="hover:no-underline">
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-muted-foreground" />
          <span className="font-mono text-sm">{name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="space-y-2">
        <p className="text-muted-foreground text-sm">{description}</p>
        {items.length > 0 && (
          <div className="pl-4 border-l space-y-3 mt-3">
            {items.map((item) => (
              <div key={item.name} className="space-y-1">
                <div className="flex items-center gap-2">
                  {item.items ? (
                    <Database className="h-3.5 w-3.5 text-primary" />
                  ) : (
                    <Layout className="h-3.5 w-3.5 text-accent-foreground" />
                  )}
                  <span className="font-mono text-sm">{item.name}</span>
                </div>
                <p className="text-xs text-muted-foreground pl-5">{item.description}</p>
                
                {item.items && item.items.length > 0 && (
                  <div className="pl-5 border-l space-y-2 mt-2">
                    {item.items.map((subItem) => (
                      <div key={subItem.name} className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Layout className="h-3 w-3 text-accent-foreground" />
                          <span className="font-mono text-xs">{subItem.name}</span>
                        </div>
                        <p className="text-xs text-muted-foreground pl-5">{subItem.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}

function ComponentBadge({ name }) {
  return (
    <div className="group rounded-md px-2 py-1 bg-accent/50 hover:bg-accent transition-colors text-xs font-medium text-center cursor-default">
      {name}
    </div>
  );
}

function PlanCard({ name, description, features }) {
  return (
    <Card className={`overflow-hidden ${name === "PRO" ? "border-primary/50" : ""}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-center">{name}</CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
} 