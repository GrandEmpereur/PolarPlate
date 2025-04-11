"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Search,
  Clock,
  ArrowRight,
  BookOpen,
  Code,
  Database,
  Server,
  CreditCard,
  User,
  Monitor,
  FileCode,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function TutorielsPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [difficulty, setDifficulty] = React.useState<string>("all");
  const [filteredTutorials, setFilteredTutorials] = React.useState<Tutorial[]>(tutorials);
  
  // Filtrer les tutoriels en fonction de la recherche et de la difficulté
  React.useEffect(() => {
    let filtered = [...tutorials];
    
    // Filtre par difficulté
    if (difficulty !== "all") {
      filtered = filtered.filter(tutorial => tutorial.difficulty === difficulty);
    }
    
    // Filtre par recherche
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(tutorial => 
        tutorial.title.toLowerCase().includes(query) || 
        tutorial.description.toLowerCase().includes(query) ||
        tutorial.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    setFilteredTutorials(filtered);
  }, [searchQuery, difficulty]);

  const tutorialsByCategory = React.useMemo(() => {
    const categorized: Record<string, Tutorial[]> = {};
    
    filteredTutorials.forEach(tutorial => {
      if (!categorized[tutorial.category]) {
        categorized[tutorial.category] = [];
      }
      categorized[tutorial.category].push(tutorial);
    });
    
    return categorized;
  }, [filteredTutorials]);

  return (
    <div className="container max-w-7xl mx-auto px-4 py-12 space-y-16">
      {/* En-tête */}
      <div className="text-center max-w-3xl mx-auto">
        <Badge variant="outline" className="mb-4 px-3 py-1 text-sm rounded-full border-primary/30">
          TUTORIELS
        </Badge>
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80"
        >
          Apprenez à maîtriser PolarPlate
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xl text-muted-foreground"
        >
          Améliorez vos compétences avec nos tutoriels détaillés, des bases aux techniques avancées.
        </motion.p>
      </div>

      {/* Filtres et recherche */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Rechercher un tutoriel..."
              className="pl-10 pr-4 py-6 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium">Difficulté:</span>
            <select 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="all">Tous niveaux</option>
              <option value="beginner">Débutant</option>
              <option value="intermediate">Intermédiaire</option>
              <option value="advanced">Avancé</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tutoriels populaires */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Tutoriels populaires</h2>
          <Button variant="ghost" asChild>
            <Link href="/tutoriels/populaires" className="flex items-center gap-1">
              Voir tout <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredTutorials.map((tutorial, index) => (
            <FeaturedTutorialCard 
              key={index} 
              tutorial={tutorial} 
              index={index} 
            />
          ))}
        </div>
      </div>

      {/* Tous les tutoriels par catégorie */}
      <div className="space-y-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Explorer tous les tutoriels</h2>
          <p className="text-muted-foreground">
            Découvrez nos tutoriels par catégorie pour développer vos compétences
          </p>
        </div>

        {filteredTutorials.length === 0 ? (
          <div className="text-center p-12 bg-card/30 rounded-xl border border-border/40">
            <p className="text-muted-foreground">Aucun tutoriel trouvé pour votre recherche</p>
            <Button 
              variant="link" 
              onClick={() => {
                setSearchQuery("");
                setDifficulty("all");
              }}
            >
              Réinitialiser les filtres
            </Button>
          </div>
        ) : (
          Object.entries(tutorialsByCategory).map(([category, tutorials], categoryIndex) => (
            <div key={category} className="space-y-6">
              <div className="flex items-center gap-3">
                <CategoryIcon category={category} />
                <h2 className="text-2xl font-bold">{getCategoryName(category)}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tutorials.map((tutorial, index) => (
                  <TutorialCard 
                    key={index} 
                    tutorial={tutorial} 
                    index={index} 
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Section de demande de tutoriel */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center py-10 max-w-3xl mx-auto bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20"
      >
        <h2 className="text-2xl font-bold mb-4">Vous ne trouvez pas ce que vous cherchez ?</h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          Dites-nous quel tutoriel vous aimeriez voir et nous ferons de notre mieux pour le créer !
        </p>
        <Button asChild>
          <Link href="/feedback">
            Suggérer un tutoriel
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}

// Carte de tutoriel en vedette
interface FeaturedTutorialCardProps {
  tutorial: Tutorial;
  index: number;
}

function FeaturedTutorialCard({ tutorial, index }: FeaturedTutorialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link href={tutorial.href} className="block h-full">
        <Card className="h-full overflow-hidden hover:shadow-md transition-all hover:border-primary/30">
          <div className="relative w-full h-48">
            <Image
              src={tutorial.image || "/images/tutorial-placeholder.jpg"}
              alt={tutorial.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://placehold.co/800x400/1a1a1a/f9f9f9?text=Tutoriel+${index + 1}`;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <Badge className={cn(
              "absolute bottom-4 left-4",
              tutorial.difficulty === "beginner" && "bg-green-500/20 text-green-500 hover:bg-green-500/30",
              tutorial.difficulty === "intermediate" && "bg-blue-500/20 text-blue-500 hover:bg-blue-500/30",
              tutorial.difficulty === "advanced" && "bg-purple-500/20 text-purple-500 hover:bg-purple-500/30"
            )}>
              {getDifficultyName(tutorial.difficulty)}
            </Badge>
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
              {tutorial.title}
            </CardTitle>
            <CardDescription className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" /> {tutorial.duration}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {tutorial.description}
            </p>
            <div className="flex gap-2 mt-3 flex-wrap">
              {tutorial.tags.slice(0, 3).map((tag, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

// Carte de tutoriel normale
interface TutorialCardProps {
  tutorial: Tutorial;
  index: number;
}

function TutorialCard({ tutorial, index }: TutorialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link href={tutorial.href} className="block h-full">
        <Card className="h-full hover:shadow-md transition-all hover:border-primary/30">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start mb-2">
              <Badge className={cn(
                "px-2 py-0.5 text-xs",
                tutorial.difficulty === "beginner" && "bg-green-500/20 text-green-500 hover:bg-green-500/30",
                tutorial.difficulty === "intermediate" && "bg-blue-500/20 text-blue-500 hover:bg-blue-500/30",
                tutorial.difficulty === "advanced" && "bg-purple-500/20 text-purple-500 hover:bg-purple-500/30"
              )}>
                {getDifficultyName(tutorial.difficulty)}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" /> {tutorial.duration}
              </div>
            </div>
            <CardTitle className="group-hover:text-primary transition-colors text-xl">
              {tutorial.title}
            </CardTitle>
            <CardDescription>
              {tutorial.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex gap-2 flex-wrap">
              {tutorial.tags.slice(0, 3).map((tag, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="p-0 h-auto text-primary text-sm">
              Lire le tutoriel
              <ArrowRight className="ml-1 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}

// Icône de catégorie
function CategoryIcon({ category }: { category: string }) {
  const iconClassName = "h-6 w-6 text-primary";
  
  switch (category) {
    case "getting-started":
      return <BookOpen className={iconClassName} />;
    case "backend":
      return <Server className={iconClassName} />;
    case "frontend":
      return <Monitor className={iconClassName} />;
    case "database":
      return <Database className={iconClassName} />;
    case "auth":
      return <User className={iconClassName} />;
    case "payments":
      return <CreditCard className={iconClassName} />;
    case "deployment":
      return <FileCode className={iconClassName} />;
    default:
      return <Code className={iconClassName} />;
  }
}

// Types et utilitaires
interface Tutorial {
  title: string;
  description: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: string;
  tags: string[];
  href: string;
  image?: string;
  featured?: boolean;
}

function getCategoryName(category: string): string {
  switch (category) {
    case "getting-started":
      return "Premiers pas";
    case "backend":
      return "Backend";
    case "frontend":
      return "Frontend";
    case "database":
      return "Base de données";
    case "auth":
      return "Authentification";
    case "payments":
      return "Paiements";
    case "deployment":
      return "Déploiement";
    default:
      return category;
  }
}

function getDifficultyName(difficulty: string): string {
  switch (difficulty) {
    case "beginner":
      return "Débutant";
    case "intermediate":
      return "Intermédiaire";
    case "advanced":
      return "Avancé";
    default:
      return difficulty;
  }
}

// Données
const tutorials: Tutorial[] = [
  // Premiers pas
  {
    title: "Commencer avec PolarPlate",
    description: "Comment installer et configurer votre premier projet PolarPlate",
    category: "getting-started",
    difficulty: "beginner",
    duration: "10 min",
    tags: ["Installation", "Configuration", "CLI"],
    href: "/tutoriels/commencer-avec-polarplate",
    image: "/images/tutorials/getting-started.jpg",
    featured: true
  },
  {
    title: "Structure d'un projet PolarPlate",
    description: "Comprendre l'organisation des fichiers et dossiers dans un projet PolarPlate",
    category: "getting-started",
    difficulty: "beginner",
    duration: "15 min",
    tags: ["Structure", "Architecture", "Organisation"],
    href: "/tutoriels/structure-projet-polarplate"
  },
  {
    title: "Configuration de l'environnement de développement",
    description: "Configurer votre environnement pour une expérience optimale",
    category: "getting-started",
    difficulty: "beginner",
    duration: "20 min",
    tags: ["Environnement", "Development", "Setup"],
    href: "/tutoriels/environnement-developpement"
  },
  
  // Backend
  {
    title: "Créer une API REST avec PolarPlate",
    description: "Développement d'une API REST complète avec validation et gestion d'erreurs",
    category: "backend",
    difficulty: "intermediate",
    duration: "45 min",
    tags: ["API", "REST", "Validation"],
    href: "/tutoriels/creer-api-rest",
    image: "/images/tutorials/api-rest.jpg",
    featured: true
  },
  {
    title: "Middleware et gestion d'état",
    description: "Utilisation des middlewares pour la gestion d'état et la sécurité",
    category: "backend",
    difficulty: "intermediate",
    duration: "30 min",
    tags: ["Middleware", "État", "Sécurité"],
    href: "/tutoriels/middleware-gestion-etat"
  },
  {
    title: "Server-side rendering avancé",
    description: "Techniques avancées de SSR pour des performances optimales",
    category: "backend",
    difficulty: "advanced",
    duration: "60 min",
    tags: ["SSR", "Performance", "React"],
    href: "/tutoriels/ssr-avance"
  },
  
  // Frontend
  {
    title: "Composants UI réutilisables",
    description: "Création de composants UI modulaires et réutilisables",
    category: "frontend",
    difficulty: "intermediate",
    duration: "40 min",
    tags: ["UI", "Composants", "Réutilisabilité"],
    href: "/tutoriels/composants-ui-reutilisables"
  },
  {
    title: "Animations avancées avec Framer Motion",
    description: "Création d'animations fluides et interactives",
    category: "frontend",
    difficulty: "advanced",
    duration: "50 min",
    tags: ["Animation", "Framer Motion", "UI"],
    href: "/tutoriels/animations-framer-motion",
    image: "/images/tutorials/animations.jpg",
    featured: true
  },
  {
    title: "Formulaires et validation avec Zod",
    description: "Implémentation de formulaires avec validation TypeScript",
    category: "frontend",
    difficulty: "intermediate",
    duration: "35 min",
    tags: ["Formulaires", "Validation", "Zod"],
    href: "/tutoriels/formulaires-validation-zod"
  },
  
  // Base de données
  {
    title: "Modélisation des données avec Prisma",
    description: "Conception et implémentation de modèles de données robustes",
    category: "database",
    difficulty: "intermediate",
    duration: "55 min",
    tags: ["Prisma", "Modélisation", "TypeScript"],
    href: "/tutoriels/modelisation-prisma"
  },
  {
    title: "Migrations et évolution du schéma",
    description: "Gestion des migrations et évolution de votre base de données",
    category: "database",
    difficulty: "intermediate",
    duration: "40 min",
    tags: ["Migrations", "Schéma", "Prisma"],
    href: "/tutoriels/migrations-schema"
  },
  {
    title: "Optimisation des requêtes",
    description: "Techniques d'optimisation pour des requêtes performantes",
    category: "database",
    difficulty: "advanced",
    duration: "60 min",
    tags: ["Performance", "Requêtes", "Indexation"],
    href: "/tutoriels/optimisation-requetes"
  },
  
  // Authentification
  {
    title: "Authentification avec Better Auth",
    description: "Implémentation d'un système d'authentification complet",
    category: "auth",
    difficulty: "intermediate",
    duration: "50 min",
    tags: ["Authentification", "Sécurité", "Better Auth"],
    href: "/tutoriels/better-auth"
  },
  {
    title: "OAuth et authentification sociale",
    description: "Intégration de fournisseurs d'authentification sociale",
    category: "auth",
    difficulty: "intermediate",
    duration: "45 min",
    tags: ["OAuth", "Google", "GitHub"],
    href: "/tutoriels/oauth-auth-sociale"
  },
  {
    title: "Contrôle d'accès basé sur les rôles",
    description: "Implémentation d'un système RBAC complet",
    category: "auth",
    difficulty: "advanced",
    duration: "70 min",
    tags: ["RBAC", "Sécurité", "Autorisations"],
    href: "/tutoriels/rbac"
  },
  
  // Paiements
  {
    title: "Intégration de Stripe",
    description: "Mettre en place des paiements avec Stripe",
    category: "payments",
    difficulty: "intermediate",
    duration: "60 min",
    tags: ["Stripe", "Paiements", "Intégration"],
    href: "/tutoriels/integration-stripe"
  },
  {
    title: "Système d'abonnement",
    description: "Créer un système d'abonnement complet",
    category: "payments",
    difficulty: "advanced",
    duration: "80 min",
    tags: ["Abonnements", "Stripe", "Récurrence"],
    href: "/tutoriels/systeme-abonnement"
  },
  {
    title: "Webhooks et événements Stripe",
    description: "Gestion des webhooks pour une synchronisation fiable",
    category: "payments",
    difficulty: "advanced",
    duration: "65 min",
    tags: ["Webhooks", "Événements", "Stripe"],
    href: "/tutoriels/webhooks-stripe"
  },
  
  // Déploiement
  {
    title: "Déploiement sur Vercel",
    description: "Déployer votre application PolarPlate sur Vercel",
    category: "deployment",
    difficulty: "beginner",
    duration: "30 min",
    tags: ["Vercel", "Déploiement", "CI/CD"],
    href: "/tutoriels/deploiement-vercel"
  },
  {
    title: "Mise en place de CI/CD",
    description: "Automatiser vos tests et déploiements",
    category: "deployment",
    difficulty: "intermediate",
    duration: "55 min",
    tags: ["CI/CD", "GitHub Actions", "Automatisation"],
    href: "/tutoriels/ci-cd"
  },
  {
    title: "Monitoring et logs",
    description: "Mise en place d'un système de monitoring et de logs",
    category: "deployment",
    difficulty: "intermediate",
    duration: "50 min",
    tags: ["Monitoring", "Logs", "Performance"],
    href: "/tutoriels/monitoring-logs"
  }
];

// Tutoriels en vedette
const featuredTutorials = tutorials.filter(tutorial => tutorial.featured); 