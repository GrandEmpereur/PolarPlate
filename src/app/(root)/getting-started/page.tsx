"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CircleCheck,
  FileCode,
  Database,
  Terminal,
  Copy,
  Check,
  ChevronRight,
  Zap,
  Settings,
  Server,
  LucideIcon
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function GuidePage() {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-12 space-y-16">
      {/* En-tête */}
      <div className="text-center max-w-3xl mx-auto">
        <Badge variant="outline" className="mb-4 px-3 py-1 text-sm rounded-full border-primary/30">
          GUIDE DE DÉMARRAGE
        </Badge>
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80"
        >
          Lancez votre projet en quelques minutes
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xl text-muted-foreground"
        >
          Apprenez à utiliser PolarPlate et commencez à développer votre application rapidement avec notre guide pas à pas.
        </motion.p>
      </div>

      {/* Vidéo de présentation */}
      <div className="relative aspect-video w-full max-w-4xl mx-auto rounded-xl overflow-hidden border border-border/40">
        <div className="absolute inset-0 flex items-center justify-center bg-black/5">
          <Image
            src="/images/video-placeholder.jpg"
            alt="Vidéo de présentation"
            fill
            className="object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://placehold.co/1280x720/1a1a1a/f9f9f9?text=Vidéo+de+présentation";
            }}
          />
          <Button 
            variant="default" 
            size="lg" 
            className="absolute z-10 rounded-full w-16 h-16 flex items-center justify-center p-0 bg-primary/90 hover:bg-primary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </Button>
        </div>
      </div>

      {/* Section d'installation rapide */}
      <InstallationSection />

      {/* Étapes principales */}
      <div className="space-y-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Pour commencer</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Suivez ces étapes pour configurer votre projet et commencer à développer 
            avec PolarPlate. Chaque étape vous guidera progressivement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stepsData.map((step, index) => (
            <StepCard 
              key={index}
              step={index + 1}
              title={step.title}
              description={step.description}
              icon={step.icon}
              href={step.href}
            />
          ))}
        </div>
      </div>

      {/* Guide détaillé */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Guide détaillé</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Explorez notre guide complet pour une compréhension approfondie de l'utilisation de PolarPlate
          </p>
        </div>

        <Tabs defaultValue="installation" className="w-full">
          <TabsList className="w-full max-w-2xl mx-auto grid grid-cols-3 mb-8">
            <TabsTrigger value="installation">Installation</TabsTrigger>
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
            <TabsTrigger value="utilisation">Utilisation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="installation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Installation de PolarPlate</CardTitle>
                <CardDescription>
                  Suivez ces étapes pour installer PolarPlate sur votre système
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Prérequis</h3>
                  <ul className="space-y-2">
                    <CheckItem>Node.js 18.0.0 ou version ultérieure</CheckItem>
                    <CheckItem>bun.sh pour une gestion optimale des packages</CheckItem>
                    <CheckItem>Git pour la gestion de version</CheckItem>
                  </ul>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Création d'un nouveau projet</h3>
                  <CodeBlock
                    code="npx create-polarplate-app my-project"
                    description="Cette commande crée un nouveau projet PolarPlate dans le dossier 'my-project'"
                  />
                  
                  <p className="text-sm text-muted-foreground">
                    Vous serez guidé à travers un processus interactif pour configurer votre projet selon vos besoins.
                  </p>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Installation manuelle</h3>
                  <p className="text-sm text-muted-foreground">
                    Si vous préférez une installation manuelle, vous pouvez cloner le dépôt et installer les dépendances :
                  </p>
                  <CodeBlock
                    code="git clone https://github.com/polarplate/polarplate.git my-project
cd my-project
bun install"
                    description="Clonez le dépôt et installez les dépendances avec bun"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="configuration" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuration de base</CardTitle>
                <CardDescription>
                  Configurez votre projet PolarPlate pour l'adapter à vos besoins
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Variables d'environnement</h3>
                  <p className="text-sm text-muted-foreground">
                    Copiez le fichier .env.example pour créer votre fichier .env :
                  </p>
                  <CodeBlock
                    code="cp .env.example .env"
                    description="Créez un fichier .env à partir de l'exemple"
                  />
                  
                  <p className="text-sm text-muted-foreground">
                    Modifiez les valeurs dans votre fichier .env pour configurer :
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground pl-6 list-disc">
                    <li>La connexion à la base de données</li>
                    <li>Les clés d'API pour l'authentification</li>
                    <li>Les clés Stripe pour les paiements</li>
                    <li>Les paramètres d'email avec Resend</li>
                  </ul>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Configuration de la base de données</h3>
                  <p className="text-sm text-muted-foreground">
                    Initialisez votre base de données avec Prisma :
                  </p>
                  <CodeBlock
                    code="npx prisma db push"
                    description="Synchronise le schéma de base de données avec votre base de données"
                  />
                  
                  <p className="text-sm text-muted-foreground">
                    Pour générer le client Prisma :
                  </p>
                  <CodeBlock
                    code="npx prisma generate"
                    description="Génère le client Prisma basé sur votre schéma"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="utilisation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Utilisation de PolarPlate</CardTitle>
                <CardDescription>
                  Apprenez à utiliser les fonctionnalités principales de PolarPlate
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Démarrer le serveur de développement</h3>
                  <CodeBlock
                    code="bun run dev"
                    description="Lance le serveur de développement sur http://localhost:3000"
                  />
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Structure des dossiers</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <FileCode className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">src/app</span>
                        <p className="text-muted-foreground">Contient les routes et les pages de l'application (App Router)</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <FileCode className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">src/components</span>
                        <p className="text-muted-foreground">Composants UI réutilisables</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <FileCode className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">src/lib</span>
                        <p className="text-muted-foreground">Utilitaires, helpers et configuration</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <FileCode className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">prisma</span>
                        <p className="text-muted-foreground">Schéma Prisma et migrations</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Déploiement</h3>
                  <p className="text-sm text-muted-foreground">
                    Pour construire l'application pour la production :
                  </p>
                  <CodeBlock
                    code="bun run build"
                    description="Construit l'application pour la production"
                  />
                  
                  <p className="text-sm text-muted-foreground">
                    Pour démarrer l'application en production :
                  </p>
                  <CodeBlock
                    code="bun run start"
                    description="Démarre l'application en mode production"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Ressources supplémentaires */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="hover:shadow-md transition-all duration-300 hover:border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="h-5 w-5 text-primary" />
              Tutoriels complets
            </CardTitle>
            <CardDescription>
              Consultez nos tutoriels détaillés pour approfondir vos connaissances
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {tutorialResources.map((tutorial, index) => (
                <li key={index} className="group">
                  <Link href={tutorial.href} className="flex items-center justify-between py-2 hover:text-primary transition-colors">
                    <span>{tutorial.title}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/tutoriels">
                Voir tous les tutoriels
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-md transition-all duration-300 hover:border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              Ressources et documentation
            </CardTitle>
            <CardDescription>
              Explorez notre documentation complète et nos ressources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {docResources.map((resource, index) => (
                <li key={index} className="group">
                  <Link href={resource.href} className="flex items-center justify-between py-2 hover:text-primary transition-colors">
                    <span>{resource.title}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/docs">
                Explorer la documentation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* CTA d'aide */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center py-10 max-w-3xl mx-auto bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20"
      >
        <h2 className="text-2xl font-bold mb-4">Besoin d'aide supplémentaire ?</h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          Notre équipe est là pour vous aider à démarrer et à résoudre vos problèmes. N'hésitez pas à nous contacter.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/support">
              Contacter le support
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/faq">
              Consulter la FAQ
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

// Section d'installation
function InstallationSection() {
  const [copied, setCopied] = React.useState(false);
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-card/30 border border-border/40 rounded-xl p-8">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="md:w-2/3 space-y-4">
          <Badge variant="outline">INSTALLATION RAPIDE</Badge>
          <h2 className="text-2xl font-bold">Démarrer en quelques secondes</h2>
          <p className="text-muted-foreground">
            Utilisez notre CLI pour créer un nouveau projet PolarPlate pré-configuré. 
            Une seule commande et vous êtes prêt à développer !
          </p>
          <div className="mt-4">
            <div className="relative">
              <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto flex justify-between items-center">
                <code>npx create-polarplate-app my-project</code>
                <button 
                  className="ml-2 p-1.5 hover:bg-secondary rounded-md flex-shrink-0"
                  onClick={() => copyToClipboard("npx create-polarplate-app my-project")}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Assurez-vous d'avoir Node.js 18.0.0 ou une version ultérieure installée.
            </p>
          </div>
          <div className="pt-2">
            <Button asChild>
              <Link href="/docs/installation">
                Guide d'installation détaillé
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="md:w-1/3 flex justify-center">
          <div className="w-full max-w-[180px] aspect-square relative">
            <Image
              src="/images/terminal-icon.png"
              alt="Terminal"
              fill
              className="object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://placehold.co/400x400/1a1a1a/f9f9f9?text=CLI";
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Carte d'étape
interface StepCardProps {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

function StepCard({ step, title, description, icon: Icon, href }: StepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: step * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link href={href} className="block h-full">
        <Card className="h-full hover:border-primary/30 hover:shadow-md transition-all">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="bg-primary/10 p-2.5 rounded-full">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <Badge variant="outline" className="px-2.5 py-0.5 text-sm font-mono">
                Étape {step}
              </Badge>
            </div>
            <CardTitle className="mt-3 group-hover:text-primary transition-colors">
              {title}
            </CardTitle>
            <CardDescription>
              {description}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="ghost" className="p-0 h-auto group-hover:text-primary transition-colors">
              En savoir plus
              <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}

// Élément de liste avec checkmark
function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <CircleCheck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
      <span className="text-sm">{children}</span>
    </li>
  );
}

// Bloc de code
interface CodeBlockProps {
  code: string;
  description: string;
}

function CodeBlock({ code, description }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <pre className="bg-card rounded-lg p-4 font-mono text-sm overflow-x-auto">
          {code}
        </pre>
        <button
          onClick={copyToClipboard}
          className="absolute top-3 right-3 p-1.5 rounded-md bg-background/20 hover:bg-background/40 transition-colors"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

// Données
const stepsData = [
  {
    title: "Installation & Configuration",
    description: "Installez PolarPlate et configurez votre environnement de développement",
    icon: Terminal,
    href: "/docs/installation"
  },
  {
    title: "Configuration de la base de données",
    description: "Configurez votre base de données et définissez votre modèle de données",
    icon: Database,
    href: "/docs/database-setup"
  },
  {
    title: "Configuration de l'authentification",
    description: "Configurez l'authentification et les autorisations",
    icon: Server,
    href: "/docs/auth-setup"
  }
];

const tutorialResources = [
  { 
    title: "Création d'une application CRUD complète", 
    href: "/tutoriels/crud-app" 
  },
  { 
    title: "Implémentation de l'authentification", 
    href: "/tutoriels/auth-implementation" 
  },
  { 
    title: "Création d'un système de paiement", 
    href: "/tutoriels/payment-system" 
  },
  { 
    title: "Déploiement sur Vercel", 
    href: "/tutoriels/deployment-vercel" 
  }
];

const docResources = [
  { 
    title: "Architecture de PolarPlate", 
    href: "/docs/architecture" 
  },
  { 
    title: "API Reference", 
    href: "/docs/api-reference" 
  },
  { 
    title: "Configuration avancée", 
    href: "/docs/advanced-config" 
  },
  { 
    title: "Modèles de données", 
    href: "/docs/data-models" 
  }
]; 