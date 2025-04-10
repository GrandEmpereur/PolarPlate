"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Search,
  BookOpen,
  Code,
  Component,
  FileCode,
  ArrowRight,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DocumentationPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredSections, setFilteredSections] = React.useState<DocsSection[]>(docsSections);

  // Filtrer les sections de documentation en fonction de la recherche
  React.useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredSections(docsSections);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = docsSections.map(section => {
      // Filtre les documents dans chaque section
      const filteredDocs = section.docs.filter(doc => 
        doc.title.toLowerCase().includes(query) || 
        doc.description.toLowerCase().includes(query)
      );
      
      // Ne retourne la section que si elle contient des documents filtrés
      return filteredDocs.length > 0 ? { ...section, docs: filteredDocs } : null;
    }).filter(Boolean) as DocsSection[];
    
    setFilteredSections(filtered);
  }, [searchQuery]);

  return (
    <div className="container max-w-7xl mx-auto px-4 py-12">
      {/* En-tête */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <Badge variant="outline" className="mb-4 px-3 py-1 text-sm rounded-full border-primary/30">
          DOCUMENTATION
        </Badge>
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80"
        >
          Documentation PolarPlate
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xl text-muted-foreground"
        >
          Tout ce dont vous avez besoin pour tirer le meilleur parti de PolarPlate
        </motion.p>
      </div>

      {/* Barre de recherche */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <Input
            type="search"
            placeholder="Rechercher dans la documentation..."
            className="pl-10 py-6 text-base bg-background/70 border-border/50 focus-visible:ring-primary/30"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Contenu principal */}
      <div className="grid grid-cols-1 gap-8">
        {filteredSections.length === 0 ? (
          <div className="text-center p-12 bg-card/30 rounded-xl border border-border/40">
            <p className="text-muted-foreground">Aucun résultat trouvé pour "{searchQuery}"</p>
          </div>
        ) : (
          filteredSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-md bg-primary/10">
                  {section.icon === "guide" && <BookOpen className="h-5 w-5 text-primary" />}
                  {section.icon === "api" && <Code className="h-5 w-5 text-primary" />}
                  {section.icon === "component" && <Component className="h-5 w-5 text-primary" />}
                  {section.icon === "example" && <FileCode className="h-5 w-5 text-primary" />}
                </div>
                <h2 className="text-2xl font-bold">{section.title}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.docs.map((doc) => (
                  <Link
                    key={doc.title}
                    href={doc.href}
                    className="group"
                  >
                    <Card className="h-full transition-all duration-300 hover:shadow-md hover:border-primary/30 hover:bg-primary/5">
                      <CardHeader>
                        <CardTitle className="group-hover:text-primary transition-colors">
                          {doc.title}
                        </CardTitle>
                        <CardDescription>{doc.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            {doc.tags.map((tag, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Bannière d'aide */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-16 text-center py-10 max-w-3xl mx-auto bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20"
      >
        <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mx-auto mb-4">
          <Zap className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-4">Besoin d'aide supplémentaire ?</h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          Vous ne trouvez pas ce que vous cherchez ? Contactez notre équipe de support ou rejoignez notre communauté active.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="default">
            <Link href="/contact">
              Contacter le support
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="https://github.com/polarplate/polarplate/discussions" target="_blank" rel="noopener noreferrer">
              Forum communautaire
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

// Types et données
interface DocItem {
  title: string;
  description: string;
  href: string;
  tags: string[];
}

interface DocsSection {
  title: string;
  icon: "guide" | "api" | "component" | "example";
  docs: DocItem[];
}

const docsSections: DocsSection[] = [
  {
    title: "Guides",
    icon: "guide",
    docs: [
      {
        title: "Installation",
        description: "Guide d'installation et configuration initiale de PolarPlate",
        href: "/docs/guides/installation",
        tags: ["Débutant", "Setup"]
      },
      {
        title: "Premiers pas",
        description: "Créez votre première application avec PolarPlate",
        href: "/docs/guides/getting-started",
        tags: ["Débutant", "Tutorial"]
      },
      {
        title: "Architecture",
        description: "Comprendre l'architecture et les principes de conception",
        href: "/docs/guides/architecture",
        tags: ["Avancé", "Concept"]
      },
      {
        title: "Authentification",
        description: "Implémentation de l'authentification et de l'autorisation",
        href: "/docs/guides/authentication",
        tags: ["Sécurité", "Auth"]
      },
      {
        title: "Déploiement",
        description: "Déployer votre application en production",
        href: "/docs/guides/deployment",
        tags: ["DevOps", "Production"]
      },
      {
        title: "Optimisation des performances",
        description: "Guide pour optimiser les performances de votre application",
        href: "/docs/guides/performance",
        tags: ["Avancé", "Optimisation"]
      }
    ]
  },
  {
    title: "API",
    icon: "api",
    docs: [
      {
        title: "API REST",
        description: "Documentation complète de l'API REST PolarPlate",
        href: "/docs/api/rest",
        tags: ["API", "REST"]
      },
      {
        title: "Endpoints utilisateurs",
        description: "Gestion des utilisateurs via l'API",
        href: "/docs/api/users",
        tags: ["API", "Utilisateurs"]
      },
      {
        title: "Authentification API",
        description: "Sécurisation et authentification des requêtes API",
        href: "/docs/api/auth",
        tags: ["API", "Sécurité"]
      },
      {
        title: "Webhooks",
        description: "Configuration et utilisation des webhooks",
        href: "/docs/api/webhooks",
        tags: ["API", "Intégration"]
      },
      {
        title: "Limites et pagination",
        description: "Comprendre les limites de requêtes et la pagination",
        href: "/docs/api/rate-limits",
        tags: ["API", "Performance"]
      },
      {
        title: "SDK TypeScript",
        description: "Utilisation du SDK TypeScript officiel",
        href: "/docs/api/typescript-sdk",
        tags: ["API", "SDK"]
      }
    ]
  },
  {
    title: "Composants",
    icon: "component",
    docs: [
      {
        title: "Design System",
        description: "Vue d'ensemble du système de design PolarPlate",
        href: "/docs/components/design-system",
        tags: ["UI", "Design"]
      },
      {
        title: "Thème et personnalisation",
        description: "Personnalisation du thème et des styles",
        href: "/docs/components/theming",
        tags: ["UI", "Customisation"]
      },
      {
        title: "Formulaires",
        description: "Création et validation de formulaires complexes",
        href: "/docs/components/forms",
        tags: ["UI", "UX"]
      },
      {
        title: "Navigation",
        description: "Composants de navigation et de menus",
        href: "/docs/components/navigation",
        tags: ["UI", "Layout"]
      },
      {
        title: "Tables de données",
        description: "Affichage et manipulation de données tabulaires",
        href: "/docs/components/data-tables",
        tags: ["UI", "Data"]
      },
      {
        title: "Visualisations",
        description: "Graphiques et visualisations de données",
        href: "/docs/components/charts",
        tags: ["UI", "Data Viz"]
      }
    ]
  },
  {
    title: "Exemples",
    icon: "example",
    docs: [
      {
        title: "Application CRUD complète",
        description: "Exemple d'application CRUD avec authentification",
        href: "/docs/examples/crud-app",
        tags: ["CRUD", "Fullstack"]
      },
      {
        title: "Dashboard d'administration",
        description: "Implémentation d'un dashboard d'administration",
        href: "/docs/examples/admin-dashboard",
        tags: ["Admin", "Dashboard"]
      },
      {
        title: "Site e-commerce",
        description: "Exemple d'implémentation e-commerce avec PolarPlate",
        href: "/docs/examples/ecommerce",
        tags: ["E-commerce", "Paiements"]
      },
      {
        title: "Application SaaS",
        description: "Structure d'application SaaS multi-tenant",
        href: "/docs/examples/saas",
        tags: ["SaaS", "Multi-tenant"]
      },
      {
        title: "Blog avec CMS",
        description: "Blog avec système de gestion de contenu intégré",
        href: "/docs/examples/blog-cms",
        tags: ["Blog", "CMS"]
      },
      {
        title: "Application mobile hybride",
        description: "Création d'applications mobiles avec approche hybride",
        href: "/docs/examples/mobile-app",
        tags: ["Mobile", "Responsive"]
      }
    ]
  }
]; 