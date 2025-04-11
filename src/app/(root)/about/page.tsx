"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Heart, Zap, Shield, Users, Clock, ChevronRight, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-16 space-y-24">
      {/* Section d'introduction */}
      <section className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <Badge variant="outline" className="px-3 py-1 text-sm rounded-full border-primary/30">
              À PROPOS DE NOUS
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              Notre mission est de simplifier le développement d'applications web modernes
            </h1>
            <p className="text-xl text-muted-foreground">
              Fondée en 2023, PolarPlate est née de la passion de développeurs qui cherchaient une solution complète pour construire rapidement des applications web sans sacrifier la qualité ou la flexibilité.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" asChild>
                <Link href="/team">
                  Découvrir notre équipe
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">
                  Nous contacter <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 border border-border/40">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/20 rounded-2xl overflow-hidden" />
              <Image
                src="/images/about-hero.jpg"
                alt="L'équipe PolarPlate"
                width={600}
                height={600}
                className="object-cover rounded-2xl mix-blend-overlay"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary/10 backdrop-blur-md border border-primary/20 rounded-lg p-4 shadow-lg">
              <div className="text-sm font-medium">Fondée en</div>
              <div className="text-2xl font-bold">2023</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section Histoire */}
      <section>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4" variant="outline">NOTRE HISTOIRE</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            De l'idée à la réalité
          </h2>
          <p className="text-lg text-muted-foreground">
            Découvrez comment PolarPlate est passé d'une simple idée à une plateforme complète utilisée par des développeurs du monde entier.
          </p>
        </div>

        {/* Timeline révisée avec positionnement amélioré */}
        <div className="relative">
          {/* Ligne centrale de la timeline - visible uniquement en desktop */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary/30"></div>
          
          {/* Ligne verticale mobile - visible uniquement sur mobile */}
          <div className="md:hidden absolute left-7 h-full w-0.5 bg-primary/30"></div>
          
          <div className="space-y-12 relative">
            {timelineItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
              >
                {/* Point sur la timeline */}
                <div className="absolute md:left-1/2 left-7 transform md:-translate-x-1/2 -translate-y-1/2 top-1/2 z-10">
                  <div className="h-14 w-14 rounded-full bg-primary/10 border-4 border-background flex items-center justify-center shadow-md">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                
                {/* Contenu gauche ou droite selon l'index */}
                <div className={`${index % 2 === 0 ? 'md:col-start-1' : 'md:col-start-2'} ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  {index % 2 === 0 || window.innerWidth < 768 ? (
                    <div className="md:pr-12 pl-16 md:pl-0">
                      <div className="bg-card/50 p-6 rounded-xl border border-border shadow-md backdrop-blur-sm hover:shadow-lg transition-shadow">
                        <div className="font-mono text-sm text-primary/70">{item.date}</div>
                        <h3 className="text-xl font-bold mt-2 mb-3">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ) : null}
                </div>
                
                <div className={`${index % 2 === 0 ? 'md:col-start-2' : 'md:col-start-1'} ${index % 2 === 1 ? 'md:text-right' : 'md:text-left'}`}>
                  {index % 2 === 1 || window.innerWidth < 768 ? (
                    <div className="md:pl-12 pl-16 md:pr-0">
                      <div className="bg-card/50 p-6 rounded-xl border border-border shadow-md backdrop-blur-sm hover:shadow-lg transition-shadow">
                        <div className="font-mono text-sm text-primary/70">{item.date}</div>
                        <h3 className="text-xl font-bold mt-2 mb-3">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ) : null}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Valeurs */}
      <section>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4" variant="outline">NOS VALEURS</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ce qui nous guide au quotidien
          </h2>
          <p className="text-lg text-muted-foreground">
            Nos valeurs définissent notre culture d'entreprise et influencent chaque décision que nous prenons.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {valuesItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="border-primary/10 h-full bg-gradient-to-br from-card/50 to-card">
                <CardContent className="pt-6">
                  <div className="bg-primary/10 h-12 w-12 rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section chiffres clés */}
      <section className="bg-card/30 rounded-2xl border border-border/40 p-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge className="mb-4" variant="outline">EN CHIFFRES</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            PolarPlate aujourd'hui
          </h2>
          <p className="text-lg text-muted-foreground">
            Quelques chiffres qui témoignent de notre croissance et de notre impact.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section CTA */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center py-16 max-w-4xl mx-auto bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20"
      >
        <Badge variant="outline" className="mb-4 border-primary/30">REJOIGNEZ-NOUS</Badge>
        <h2 className="text-3xl font-bold mb-4">Prêt à simplifier votre développement ?</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Découvrez comment PolarPlate peut vous aider à construire des applications web modernes rapidement et efficacement.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/auth/sign-up">
              Démarrer gratuitement
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/features">
              Découvrir les fonctionnalités
            </Link>
          </Button>
        </div>
      </motion.section>
    </div>
  );
}

// Données
const timelineItems = [
  {
    date: "Janvier 2023",
    title: "La naissance d'une idée",
    description: "Frustré par la complexité des solutions existantes, notre fondateur a imaginé une plateforme qui simplifierait le développement d'applications web modernes.",
    icon: Zap
  },
  {
    date: "Mars 2023",
    title: "Formation de l'équipe",
    description: "Une équipe de développeurs passionnés s'est réunie autour de cette vision commune, apportant leur expertise en développement web, UI/UX et infrastructure cloud.",
    icon: Users
  },
  {
    date: "Juin 2023",
    title: "Premier prototype",
    description: "Après des mois de développement intensif, la première version de PolarPlate a vu le jour, avec les fonctionnalités essentielles d'authentification et de base de données.",
    icon: Clock
  },
  {
    date: "Septembre 2023",
    title: "Lancement bêta",
    description: "PolarPlate a été lancé en version bêta, permettant à une communauté restreinte de testeurs de découvrir la plateforme et de fournir des retours précieux.",
    icon: Award
  },
  {
    date: "Janvier 2024",
    title: "Lancement officiel",
    description: "Après avoir intégré les retours des utilisateurs bêta, PolarPlate a été officiellement lancé, offrant une solution complète pour le développement d'applications web.",
    icon: BadgeCheck
  }
];

const valuesItems = [
  {
    title: "Innovation constante",
    description: "Nous nous efforçons d'innover constamment, en intégrant les dernières technologies et méthodologies pour offrir la meilleure expérience possible.",
    icon: Zap
  },
  {
    title: "Qualité sans compromis",
    description: "Nous ne faisons jamais de compromis sur la qualité. Chaque fonctionnalité est méticuleusement testée et optimisée pour garantir fiabilité et performance.",
    icon: Shield
  },
  {
    title: "Centré sur l'utilisateur",
    description: "Nos clients sont au cœur de chaque décision. Nous écoutons attentivement leurs besoins et adaptons continuellement notre plateforme en conséquence.",
    icon: Heart
  },
  {
    title: "Transparence",
    description: "Nous croyons en une communication ouverte et honnête, tant en interne qu'avec nos clients, partenaires et la communauté des développeurs.",
    icon: BadgeCheck
  },
  {
    title: "Accessibilité",
    description: "Nous nous engageons à rendre le développement web accessible à tous, quels que soient leur niveau de compétence ou leurs ressources.",
    icon: Users
  },
  {
    title: "Responsabilité",
    description: "Nous prenons nos engagements au sérieux et assumons la responsabilité de nos actions, en veillant à ce que notre plateforme respecte les normes éthiques et légales.",
    icon: Shield
  }
];

const stats = [
  {
    value: "10K+",
    label: "Développeurs actifs"
  },
  {
    value: "500+",
    label: "Applications en production"
  },
  {
    value: "15M+",
    label: "Requêtes API par jour"
  },
  {
    value: "99.9%",
    label: "Temps de disponibilité"
  }
]; 