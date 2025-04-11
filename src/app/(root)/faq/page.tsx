"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, SearchIcon, Mail, MessagesSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredFAQs, setFilteredFAQs] = React.useState<FAQ[]>(faqs);
  const [activeCategory, setActiveCategory] = React.useState<string>("all");

  // Filtrer les FAQs en fonction de la recherche et de la catégorie active
  React.useEffect(() => {
    let filtered = [...faqs];
    
    // Filtre par catégorie
    if (activeCategory !== "all") {
      filtered = filtered.filter(faq => faq.category === activeCategory);
    }
    
    // Filtre par recherche
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(faq => 
        faq.question.toLowerCase().includes(query) || 
        faq.answer.toLowerCase().includes(query)
      );
    }
    
    setFilteredFAQs(filtered);
  }, [searchQuery, activeCategory]);

  const faqsByCategory = React.useMemo(() => {
    const categorized: Record<string, FAQ[]> = {};
    
    filteredFAQs.forEach(faq => {
      if (!categorized[faq.category]) {
        categorized[faq.category] = [];
      }
      categorized[faq.category].push(faq);
    });
    
    return categorized;
  }, [filteredFAQs]);

  // Total des questions par catégorie pour les badges de compteur
  const questionCountByCategory = React.useMemo(() => {
    const counts: Record<string, number> = { all: faqs.length };
    
    faqs.forEach(faq => {
      if (!counts[faq.category]) {
        counts[faq.category] = 0;
      }
      counts[faq.category]++;
    });
    
    return counts;
  }, []);

  return (
    <div className="container max-w-7xl mx-auto px-4 py-12 space-y-16">
      {/* En-tête */}
      <div className="text-center max-w-3xl mx-auto">
        <Badge variant="outline" className="mb-4 px-3 py-1 text-sm rounded-full border-primary/30">
          FAQ
        </Badge>
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80"
        >
          Vos questions, nos réponses
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xl text-muted-foreground"
        >
          Trouvez rapidement des réponses à vos questions sur PolarPlate.
        </motion.p>
      </div>

      {/* Barre de recherche */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Rechercher une question..."
            className="pl-10 pr-4 py-6 text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Onglets de catégorie */}
      <div className="max-w-4xl mx-auto">
        <Tabs 
          defaultValue="all" 
          value={activeCategory}
          onValueChange={setActiveCategory}
          className="w-full"
        >
          <TabsList className="w-full overflow-x-auto justify-start flex-nowrap h-auto py-2 bg-transparent space-x-2">
            <TabsTrigger 
              value="all" 
              className="rounded-full px-4 py-2 font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center"
            >
              Toutes les questions
              <span className="ml-2 text-xs rounded-full bg-muted px-2 py-0.5">
                {questionCountByCategory.all}
              </span>
            </TabsTrigger>
            
            {Object.keys(faqCategories).map(category => (
              <TabsTrigger 
                key={category} 
                value={category}
                className="rounded-full px-4 py-2 font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground whitespace-nowrap flex items-center"
              >
                {faqCategories[category]}
                <span className="ml-2 text-xs rounded-full bg-muted px-2 py-0.5">
                  {questionCountByCategory[category] || 0}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeCategory} className="mt-6">
            {filteredFAQs.length === 0 ? (
              <div className="text-center p-12 bg-card/30 rounded-xl border border-border/40">
                <p className="text-muted-foreground">Aucune question trouvée pour votre recherche</p>
                <Button 
                  variant="link" 
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            ) : (
              <div className="space-y-8">
                {Object.keys(faqsByCategory).length === 0 ? (
                  <div className="text-center p-12 bg-card/30 rounded-xl border border-border/40">
                    <p className="text-muted-foreground">Aucune question trouvée pour cette catégorie</p>
                  </div>
                ) : (
                  Object.entries(faqsByCategory).map(([category, categoryFaqs], categoryIndex) => (
                    <div key={category} className="space-y-4">
                      <h2 className="text-xl font-semibold">{faqCategories[category]}</h2>
                      <Accordion type="single" collapsible className="w-full space-y-4">
                        {categoryFaqs.map((faq, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                          >
                            <AccordionItem 
                              value={`${category}-${index}`} 
                              className={cn(
                                "border border-border/40 rounded-xl overflow-hidden",
                                "data-[state=open]:bg-card/50 data-[state=open]:border-primary/40"
                              )}
                            >
                              <AccordionTrigger className="px-6 py-4 hover:bg-muted/30 hover:no-underline font-medium text-left">
                                {faq.question}
                              </AccordionTrigger>
                              <AccordionContent className="px-6 pb-6 pt-2 text-muted-foreground">
                                <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                                
                                {faq.links && faq.links.length > 0 && (
                                  <div className="mt-4 pt-4 border-t border-border/20">
                                    <p className="font-medium text-sm mb-2">Ressources associées :</p>
                                    <ul className="space-y-1">
                                      {faq.links.map((link, i) => (
                                        <li key={i}>
                                          <Button variant="link" asChild className="h-auto p-0 text-sm">
                                            <Link href={link.url} className="flex items-center gap-1">
                                              {link.label} <ArrowRight className="h-3 w-3" />
                                            </Link>
                                          </Button>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </AccordionContent>
                            </AccordionItem>
                          </motion.div>
                        ))}
                      </Accordion>
                    </div>
                  ))
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Bannière d'aide supplémentaire */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
            <div className="bg-primary/10 rounded-full p-3 w-12 h-12 flex items-center justify-center">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Contactez-nous</h3>
            <p className="text-muted-foreground">
              Vous ne trouvez pas la réponse que vous cherchez ? Notre équipe support est là pour vous aider.
            </p>
            <Button asChild size="sm">
              <Link href="/support">
                Contacter le support
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-muted/50 to-muted/70 border-muted/80">
          <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
            <div className="bg-background/80 rounded-full p-3 w-12 h-12 flex items-center justify-center">
              <MessagesSquare className="h-6 w-6 text-foreground" />
            </div>
            <h3 className="text-xl font-semibold">Communauté</h3>
            <p className="text-muted-foreground">
              Rejoignez notre communauté pour échanger avec d'autres utilisateurs et obtenir de l'aide.
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link href="https://discord.gg/polarplate" target="_blank" rel="noopener noreferrer">
                Rejoindre Discord
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Types et données
interface FAQLink {
  label: string;
  url: string;
}

interface FAQ {
  question: string;
  answer: string;
  category: string;
  links?: FAQLink[];
}

const faqCategories: Record<string, string> = {
  general: "Général",
  account: "Compte et abonnement",
  features: "Fonctionnalités",
  technical: "Questions techniques",
  pricing: "Tarification",
  security: "Sécurité et confidentialité",
};

const faqs: FAQ[] = [
  // Général
  {
    question: "Qu'est-ce que PolarPlate ?",
    answer: "PolarPlate est une plateforme de développement complète qui permet de créer, déployer et gérer des applications web modernes. Elle offre des outils intégrés pour simplifier le processus de développement, améliorer la collaboration entre équipes et accélérer le cycle de déploiement.",
    category: "general",
    links: [
      { label: "En savoir plus sur nos fonctionnalités", url: "/features" },
      { label: "Voir nos plans tarifaires", url: "/pricing" }
    ]
  },
  {
    question: "Pour qui PolarPlate est-il conçu ?",
    answer: "PolarPlate s'adresse aux développeurs individuels, aux équipes de développement et aux entreprises de toutes tailles. Que vous soyez un développeur frontend, backend, fullstack ou un responsable technique, notre plateforme offre des outils adaptés à vos besoins. Les équipes de toutes tailles peuvent bénéficier de notre infrastructure évolutive et de nos outils de collaboration.",
    category: "general"
  },
  {
    question: "Comment débuter avec PolarPlate ?",
    answer: "Pour commencer avec PolarPlate, il vous suffit de créer un compte sur notre site web. Une fois inscrit, vous pouvez suivre notre guide de démarrage rapide qui vous guidera à travers les étapes d'installation, de configuration de votre premier projet et de déploiement. Nous proposons également une documentation complète et des tutoriels pour vous aider à tirer le meilleur parti de notre plateforme.",
    category: "general",
    links: [
      { label: "Guide de démarrage", url: "/guide" },
      { label: "Tutoriels pour débutants", url: "/tutoriels?difficulty=beginner" }
    ]
  },
  {
    question: "Quelle est la différence entre PolarPlate et d'autres plateformes de développement ?",
    answer: "PolarPlate se distingue par son approche tout-en-un qui intègre seamlessly tous les aspects du cycle de développement moderne. Contrairement à d'autres solutions qui nécessitent l'intégration de multiples outils tiers, PolarPlate offre nativement :<ul><li>Un environnement de développement optimisé</li><li>Des outils de collaboration intégrés</li><li>Une infrastructure de déploiement continue</li><li>Un système de monitoring et d'analyse de performance</li><li>Des intégrations avec les services les plus populaires</li></ul>Cette intégration complète permet de réduire la complexité, d'améliorer la productivité et d'accélérer le cycle de développement.",
    category: "general"
  },
  
  // Compte et abonnement
  {
    question: "Comment créer un compte PolarPlate ?",
    answer: "Créer un compte PolarPlate est simple et rapide. Rendez-vous sur notre page d'inscription, entrez votre adresse e-mail, choisissez un mot de passe sécurisé, et suivez les instructions pour confirmer votre compte. Vous pouvez également vous inscrire avec vos comptes Google, GitHub ou Microsoft pour simplifier le processus.",
    category: "account",
    links: [
      { label: "S'inscrire maintenant", url: "/register" }
    ]
  },
  {
    question: "Puis-je modifier mon abonnement à tout moment ?",
    answer: "Oui, vous pouvez modifier votre abonnement à tout moment depuis votre tableau de bord utilisateur. Si vous passez à un plan supérieur, le changement prendra effet immédiatement et vous serez facturé au prorata pour la période restante. Si vous passez à un plan inférieur, le changement prendra effet à la fin de votre période de facturation actuelle.",
    category: "account"
  },
  {
    question: "Comment puis-je annuler mon abonnement ?",
    answer: "Pour annuler votre abonnement, connectez-vous à votre compte, accédez à la section 'Abonnement' dans vos paramètres, puis cliquez sur 'Annuler l'abonnement'. Vous aurez accès à toutes les fonctionnalités de votre plan jusqu'à la fin de la période de facturation en cours. Notez que vos projets et données resteront accessibles pendant 30 jours après l'annulation, après quoi ils seront archivés.",
    category: "account",
    links: [
      { label: "Gérer votre abonnement", url: "/dashboard/settings/subscription" }
    ]
  },
  {
    question: "Que se passe-t-il si j'atteins les limites de mon plan ?",
    answer: "Si vous atteignez les limites de votre plan (comme le nombre de projets, d'utilisateurs ou les quotas d'utilisation), vous recevrez une notification. Vous pourrez continuer à utiliser vos projets existants, mais certaines fonctionnalités pourraient être limitées jusqu'à ce que vous libériez des ressources ou passiez à un plan supérieur. Nous proposons des options de mise à niveau flexibles pour s'adapter à l'évolution de vos besoins.",
    category: "account"
  },
  
  // Fonctionnalités
  {
    question: "Quels types de projets puis-je créer avec PolarPlate ?",
    answer: "PolarPlate est polyvalent et vous permet de créer une large gamme de projets web, notamment :<ul><li>Applications web fullstack avec React, Next.js, Vue.js, etc.</li><li>API RESTful ou GraphQL</li><li>Sites statiques et blogs</li><li>Progressive Web Apps (PWA)</li><li>Dashboards et applications d'administration</li><li>E-commerce et places de marché</li></ul>Notre plateforme s'adapte à vos besoins spécifiques en offrant des modèles et des intégrations pour accélérer votre développement.",
    category: "features",
    links: [
      { label: "Explorer nos modèles de projets", url: "/templates" }
    ]
  },
  {
    question: "PolarPlate prend-il en charge le développement collaboratif ?",
    answer: "Absolument. PolarPlate est conçu pour faciliter le travail d'équipe avec des fonctionnalités de collaboration intégrées :<ul><li>Gestion des accès et des rôles</li><li>Environnements de développement partagés</li><li>Outils de revue de code</li><li>Historique des modifications et versionning</li><li>Commentaires en contexte sur le code</li><li>Notifications et tableaux de bord d'équipe</li></ul>Ces fonctionnalités permettent à votre équipe de travailler efficacement, que ce soit en présentiel ou à distance.",
    category: "features"
  },
  {
    question: "Comment PolarPlate gère-t-il les déploiements ?",
    answer: "PolarPlate offre une solution de déploiement continue entièrement intégrée. Chaque fois que vous poussez du code vers votre dépôt, notre système peut automatiquement construire, tester et déployer votre application sur l'environnement de votre choix. Vous bénéficiez de :<ul><li>Déploiements automatisés sur chaque commit</li><li>Environnements de prévisualisation pour les pull requests</li><li>Déploiements progressifs et rollbacks</li><li>Surveillance des performances post-déploiement</li><li>Intégration avec les principales plateformes cloud</li></ul>Cette approche réduit les erreurs humaines et accélère le cycle de livraison.",
    category: "features",
    links: [
      { label: "En savoir plus sur nos options de déploiement", url: "/features#deployment" }
    ]
  },
  {
    question: "Quelles technologies sont prises en charge par PolarPlate ?",
    answer: "PolarPlate prend en charge un large éventail de technologies et de frameworks modernes, notamment :<ul><li>Langages : JavaScript, TypeScript, Python, Ruby, PHP, Go</li><li>Frameworks frontend : React, Vue.js, Angular, Svelte, Next.js</li><li>Frameworks backend : Node.js, Express, NestJS, Django, Rails, Laravel</li><li>Bases de données : PostgreSQL, MySQL, MongoDB, Redis</li><li>CSS : Tailwind CSS, Sass, CSS Modules, Styled Components</li><li>Outils : Webpack, Vite, ESLint, Prettier, Jest, Cypress</li></ul>Notre plateforme est conçue pour être flexible et s'adapter à l'évolution des technologies web.",
    category: "features"
  },
  
  // Questions techniques
  {
    question: "Comment fonctionne l'intégration avec Git ?",
    answer: "PolarPlate s'intègre de manière transparente avec Git. Vous pouvez connecter vos dépôts GitHub, GitLab ou Bitbucket existants, ou utiliser notre système Git intégré. Notre plateforme surveille automatiquement les changements dans vos branches et peut déclencher des actions spécifiques (builds, tests, déploiements) en fonction de vos configurations. Nous prenons également en charge les webhooks pour une intégration plus personnalisée avec votre workflow Git.",
    category: "technical",
    links: [
      { label: "Tutoriel sur l'intégration Git", url: "/tutoriels/integration-git" }
    ]
  },
  {
    question: "Puis-je utiliser mes propres domaines avec PolarPlate ?",
    answer: "Oui, vous pouvez facilement connecter vos propres domaines à vos projets PolarPlate. Notre plateforme gère automatiquement la configuration HTTPS avec des certificats SSL/TLS gratuits via Let's Encrypt. Vous pouvez configurer des domaines personnalisés, des sous-domaines et des redirections directement depuis votre tableau de bord. Nous proposons également des fonctionnalités avancées comme la gestion des en-têtes HTTP et les règles de redirection.",
    category: "technical"
  },
  {
    question: "Comment configurer des variables d'environnement ?",
    answer: "PolarPlate offre une gestion sécurisée des variables d'environnement pour chaque projet et environnement (développement, préproduction, production). Vous pouvez définir, modifier et supprimer des variables d'environnement depuis votre tableau de bord projet. Notre système prend en charge le chiffrement des données sensibles et permet de définir des secrets qui ne sont jamais exposés. Vous pouvez également importer des variables depuis des fichiers .env ou d'autres services de gestion de secrets.",
    category: "technical",
    links: [
      { label: "Guide de gestion des secrets", url: "/docs/env-variables" }
    ]
  },
  {
    question: "Comment fonctionne le scaling avec PolarPlate ?",
    answer: "PolarPlate est conçu pour s'adapter automatiquement à vos besoins de mise à l'échelle. Notre infrastructure serverless répartit automatiquement la charge et s'ajuste en fonction du trafic de votre application. Pour les besoins plus spécifiques, nous proposons des options de configuration avancées pour optimiser les performances et les coûts. Nos plans d'entreprise offrent également un scaling dédié avec des ressources garanties et des options de configuration personnalisées.",
    category: "technical"
  },
  
  // Tarification
  {
    question: "Proposez-vous une offre gratuite ?",
    answer: "Oui, nous proposons un plan gratuit qui vous permet d'explorer PolarPlate et de créer des projets personnels ou de démonstration. Ce plan inclut :<ul><li>Jusqu'à 3 projets</li><li>1 Go de stockage</li><li>Environnement de développement limité</li><li>Déploiements avec sous-domaine PolarPlate</li><li>Support communautaire</li></ul>C'est parfait pour les développeurs individuels, les étudiants ou les petits projets. Aucune carte de crédit n'est requise pour le plan gratuit.",
    category: "pricing",
    links: [
      { label: "Comparer tous nos plans", url: "/pricing" }
    ]
  },
  {
    question: "Comment fonctionne la facturation sur PolarPlate ?",
    answer: "PolarPlate propose deux modèles de facturation :<ul><li>Abonnement mensuel ou annuel avec remise (économisez 20% avec l'engagement annuel)</li><li>Pay-as-you-go pour certaines ressources au-delà des limites de votre plan</li></ul>La facturation est automatique et vous recevez une facture détaillée à chaque cycle. Nous acceptons les cartes de crédit, PayPal et, pour les entreprises, le paiement par virement bancaire. Vous pouvez consulter votre historique de facturation et télécharger vos factures depuis votre tableau de bord.",
    category: "pricing"
  },
  {
    question: "Quels moyens de paiement acceptez-vous ?",
    answer: "PolarPlate accepte plusieurs moyens de paiement pour s'adapter à vos préférences :<ul><li>Cartes de crédit/débit (Visa, Mastercard, American Express)</li><li>PayPal</li><li>Virements bancaires (pour les plans Entreprise)</li><li>Apple Pay et Google Pay</li></ul>Toutes les transactions sont sécurisées et traitées par des fournisseurs de paiement certifiés. Vos informations de paiement sont cryptées et ne sont jamais stockées sur nos serveurs.",
    category: "pricing"
  },
  {
    question: "Proposez-vous des tarifs spéciaux pour les startups ou les projets open source ?",
    answer: "Oui, PolarPlate soutient activement l'écosystème des startups et de l'open source :<ul><li>Programme Startup : réductions importantes pour les startups éligibles en phase de démarrage</li><li>Programme Open Source : ressources gratuites ou à prix réduit pour les projets open source qualifiés</li><li>Programme Éducation : plans gratuits ou réduits pour les étudiants, les enseignants et les institutions éducatives</li></ul>Contactez notre équipe commerciale pour en savoir plus sur ces programmes et vérifier votre éligibilité.",
    category: "pricing",
    links: [
      { label: "En savoir plus sur nos programmes spéciaux", url: "/pricing#special-programs" }
    ]
  },
  
  // Sécurité et confidentialité
  {
    question: "Comment PolarPlate protège-t-il mes données ?",
    answer: "La sécurité de vos données est notre priorité absolue. PolarPlate met en œuvre plusieurs couches de protection :<ul><li>Chiffrement des données au repos et en transit (TLS/SSL)</li><li>Authentification à deux facteurs (2FA)</li><li>Contrôles d'accès granulaires basés sur les rôles</li><li>Audits de sécurité réguliers et tests de pénétration</li><li>Sauvegarde automatique des données</li><li>Isolation des environnements</li></ul>Notre infrastructure est hébergée dans des centres de données certifiés avec les plus hauts standards de l'industrie.",
    category: "security"
  },
  {
    question: "PolarPlate est-il conforme au RGPD ?",
    answer: "Oui, PolarPlate est entièrement conforme au Règlement Général sur la Protection des Données (RGPD) de l'Union Européenne. Nous agissons en tant que sous-traitant de données pour nos clients et proposons un Accord de Traitement des Données (DPA) si nécessaire. Nous maintenons des politiques transparentes sur la collecte, le traitement et la protection des données. Nos pratiques sont régulièrement évaluées pour garantir leur conformité avec les lois en vigueur.",
    category: "security",
    links: [
      { label: "Consulter notre politique de confidentialité", url: "/privacy" },
      { label: "Demander un DPA", url: "/contact?subject=DPA" }
    ]
  },
  {
    question: "Comment signaler un problème de sécurité ?",
    answer: "Si vous découvrez une vulnérabilité ou un problème de sécurité, veuillez nous le signaler immédiatement via notre programme de divulgation responsable. Envoyez un email détaillé à <strong>security@polarplate.com</strong> avec une description du problème, les étapes pour le reproduire et toute autre information pertinente. Notre équipe de sécurité examinera votre rapport et vous répondra dans les 48 heures. Nous prenons ces signalements très au sérieux et récompensons les chercheurs qui nous aident à améliorer la sécurité de notre plateforme.",
    category: "security",
    links: [
      { label: "Détails de notre programme de bug bounty", url: "/security#bug-bounty" }
    ]
  },
  {
    question: "Quelles mesures prenez-vous pour assurer la disponibilité de vos services ?",
    answer: "PolarPlate s'engage à offrir une haute disponibilité pour tous nos services :<ul><li>Architecture multi-régions et multi-zones pour une redondance maximale</li><li>Surveillance proactive 24/7 de tous les systèmes</li><li>Équilibrage de charge automatique et auto-scaling</li><li>Procédures de reprise après sinistre testées régulièrement</li><li>Mises à jour sans interruption de service (zero-downtime updates)</li></ul>Nous maintenons un SLA de 99,95% de disponibilité pour nos plans professionnels et entreprise, avec des crédits automatiques en cas de non-respect de nos engagements.",
    category: "security"
  }
]; 