"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, Circle, Clock, ArrowRight, Star, CalendarDays, Zap, Eye, GitPullRequest, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export default function RoadmapPage() {
  const [activeTab, setActiveTab] = React.useState("all");
  
  // Filtrer les fonctionnalités en fonction de l'onglet actif
  const filteredFeatures = React.useMemo(() => {
    if (activeTab === "all") return features;
    return features.filter(feature => feature.status === activeTab);
  }, [activeTab]);

  return (
    <div className="container max-w-7xl mx-auto px-4 py-12 space-y-16">
      {/* En-tête */}
      <div className="text-center max-w-3xl mx-auto">
        <Badge variant="outline" className="mb-4 px-3 py-1 text-sm rounded-full border-primary/30">
          ROADMAP
        </Badge>
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80"
        >
          Notre vision pour l'avenir
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xl text-muted-foreground"
        >
          Découvrez les fonctionnalités et améliorations que nous préparons pour PolarPlate, avec un calendrier prévisionnel et l'état d'avancement.
        </motion.p>
      </div>

      {/* Filtre par statut */}
      <div className="flex justify-center">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full max-w-3xl">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="completed" className="text-green-500">Complété</TabsTrigger>
            <TabsTrigger value="in-progress" className="text-amber-500">En cours</TabsTrigger>
            <TabsTrigger value="planned" className="text-blue-500">Planifié</TabsTrigger>
            <TabsTrigger value="considering" className="text-purple-500">À l'étude</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Vue principale de la feuille de route */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Barre latérale - Trimestres */}
        <div className="lg:col-span-1">
          <div className="bg-card/30 rounded-xl border border-border/40 p-6 sticky top-20">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-primary" />
              Calendrier
            </h3>
            <div className="space-y-4">
              {quarters.map((quarter, index) => (
                <div key={index} className="space-y-1">
                  <h4 className="font-medium">{quarter.name}</h4>
                  <p className="text-sm text-muted-foreground">{quarter.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mt-2">
                    {quarter.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-4 border-t border-border/40">
              <h4 className="font-medium mb-2">Légende</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Complété</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Clock className="h-4 w-4 text-amber-500" />
                  <span>En cours</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Circle className="h-4 w-4 text-blue-500" />
                  <span>Planifié</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Lightbulb className="h-4 w-4 text-purple-500" />
                  <span>À l'étude</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contenu principal - Liste des fonctionnalités */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 gap-6">
            {filteredFeatures.length === 0 ? (
              <div className="text-center p-12 bg-card/30 rounded-xl border border-border/40">
                <p className="text-muted-foreground">Aucune fonctionnalité trouvée pour ce filtre.</p>
              </div>
            ) : (
              filteredFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <RoadmapCard feature={feature} />
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Section de suggestion */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center py-10 max-w-3xl mx-auto bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20"
      >
        <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mx-auto mb-4">
          <Lightbulb className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-4">Une idée à nous proposer ?</h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          Nous sommes toujours à l'écoute de vos suggestions pour améliorer PolarPlate. Partagez vos idées avec notre équipe !
        </p>
        <Button asChild size="lg">
          <Link href="/feedback">
            Suggérer une fonctionnalité
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}

// Composant de carte pour chaque fonctionnalité
function RoadmapCard({ feature }: { feature: Feature }) {
  const statusIcons = {
    "completed": <CheckCircle2 className="h-5 w-5 text-green-500" />,
    "in-progress": <Clock className="h-5 w-5 text-amber-500" />,
    "planned": <Circle className="h-5 w-5 text-blue-500" />,
    "considering": <Lightbulb className="h-5 w-5 text-purple-500" />
  };
  
  const statusLabels = {
    "completed": "Complété",
    "in-progress": "En cours",
    "planned": "Planifié",
    "considering": "À l'étude"
  };

  const statusColors = {
    "completed": "bg-green-500/10 text-green-500 border-green-500/30",
    "in-progress": "bg-amber-500/10 text-amber-500 border-amber-500/30",
    "planned": "bg-blue-500/10 text-blue-500 border-blue-500/30",
    "considering": "bg-purple-500/10 text-purple-500 border-purple-500/30"
  };

  return (
    <Card className={cn(
      "transition-all duration-300 hover:shadow-md",
      feature.isPriority && "border-primary/30 bg-primary/5"
    )}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {feature.isPriority && (
                <Star className="h-4 w-4 text-primary fill-primary" />
              )}
              <CardTitle>{feature.title}</CardTitle>
            </div>
            <CardDescription>{feature.description}</CardDescription>
          </div>
          <Badge className={cn("ml-2", statusColors[feature.status])}>
            <div className="flex items-center gap-1.5">
              {statusIcons[feature.status]}
              <span>{statusLabels[feature.status]}</span>
            </div>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {feature.tags.map((tag, i) => (
              <Badge key={i} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4 mr-1" />
              <span>{feature.timeline}</span>
            </div>
            
            {feature.links && feature.links.length > 0 && (
              <div className="flex gap-3">
                {feature.links.map((link, i) => (
                  <Button key={i} variant="ghost" size="sm" asChild className="h-8 px-2">
                    <Link href={link.url} className="flex items-center gap-1 text-xs">
                      {link.type === "docs" && <Eye className="h-3.5 w-3.5" />}
                      {link.type === "github" && <GitPullRequest className="h-3.5 w-3.5" />}
                      {link.type === "preview" && <Zap className="h-3.5 w-3.5" />}
                      <span>{link.label}</span>
                    </Link>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Types et données
interface Link {
  label: string;
  url: string;
  type: "docs" | "github" | "preview";
}

interface Feature {
  title: string;
  description: string;
  status: "completed" | "in-progress" | "planned" | "considering";
  timeline: string;
  tags: string[];
  isPriority: boolean;
  links?: Link[];
}

const quarters = [
  {
    name: "Q2 2024",
    description: "Avril - Juin 2024",
    tags: ["Core UI", "Performance", "Dark Mode"]
  },
  {
    name: "Q3 2024",
    description: "Juillet - Septembre 2024",
    tags: ["Authentification", "Base de données", "API"]
  },
  {
    name: "Q4 2024",
    description: "Octobre - Décembre 2024",
    tags: ["Paiements", "Analytics", "Multi-langue"]
  },
  {
    name: "Q1 2025",
    description: "Janvier - Mars 2025",
    tags: ["IA", "Extensions", "Multi-tenant"]
  }
];

const features: Feature[] = [
  {
    title: "Amélioration du système de thème",
    description: "Ajout de plus d'options de personnalisation pour le thème et meilleure prise en charge du dark mode.",
    status: "completed",
    timeline: "Q2 2024",
    tags: ["UI", "Accessibilité", "Thème"],
    isPriority: false,
    links: [
      { label: "Documentation", url: "/docs/components/theming", type: "docs" },
      { label: "PR #42", url: "https://github.com/polarplate/polarplate/pull/42", type: "github" }
    ]
  },
  {
    title: "Intégration de l'authentification avec Google",
    description: "Ajout de l'authentification via Google OAuth à BetterAuth pour une connexion simplifiée.",
    status: "completed",
    timeline: "Q2 2024",
    tags: ["Authentification", "OAuth", "Sécurité"],
    isPriority: false
  },
  {
    title: "Templates de page avancés",
    description: "Nouveaux templates de page pour les cas d'utilisation courants (pricing, features, landing pages, etc.)",
    status: "in-progress",
    timeline: "Q2 2024",
    tags: ["UI", "Templates", "Composants"],
    isPriority: true,
    links: [
      { label: "Preview", url: "/templates", type: "preview" }
    ]
  },
  {
    title: "Système de notifications en temps réel",
    description: "Implémentation d'un système de notifications en temps réel avec websockets.",
    status: "in-progress",
    timeline: "Q3 2024",
    tags: ["Temps réel", "Notifications", "WebSockets"],
    isPriority: true,
    links: [
      { label: "PR #53", url: "https://github.com/polarplate/polarplate/pull/53", type: "github" }
    ]
  },
  {
    title: "Dashboard analytics",
    description: "Dashboard d'analytics intégré pour suivre les utilisateurs, les performances et l'utilisation.",
    status: "planned",
    timeline: "Q3 2024",
    tags: ["Analytics", "Dashboard", "Rapports"],
    isPriority: false
  },
  {
    title: "Support multi-langue",
    description: "Internationalisation complète de l'interface avec support pour plusieurs langues.",
    status: "planned",
    timeline: "Q4 2024",
    tags: ["i18n", "Accessibilité", "UX"],
    isPriority: false
  },
  {
    title: "API GraphQL",
    description: "Ajout d'une API GraphQL à côté de l'API REST existante pour plus de flexibilité dans les requêtes.",
    status: "planned",
    timeline: "Q4 2024",
    tags: ["API", "GraphQL", "Dev Tools"],
    isPriority: true
  },
  {
    title: "Marketplace d'extensions",
    description: "Marketplace pour découvrir, installer et publier des extensions pour PolarPlate.",
    status: "considering",
    timeline: "Q1 2025",
    tags: ["Extensions", "Marketplace", "Ecosystem"],
    isPriority: false
  },
  {
    title: "Assistant IA intégré",
    description: "Assistant IA pour aider au développement, à la documentation et au débogage.",
    status: "considering",
    timeline: "Q1 2025",
    tags: ["IA", "Assistant", "Productivité"],
    isPriority: true
  },
  {
    title: "Mode hors-ligne & synchronisation",
    description: "Support du mode hors-ligne avec synchronisation des données au retour de la connexion.",
    status: "considering",
    timeline: "Q1 2025",
    tags: ["Offline", "PWA", "Synchronisation"],
    isPriority: false
  }
]; 