"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Github, GitMerge, Rocket, Zap, Code, Database, ShieldCheck, Puzzle, Send } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <header className="pt-16 pb-20 md:pt-24 md:pb-32 flex flex-col items-center">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <span className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full inline-block mb-4">
              Version 1.0 disponible
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
            className="text-xl md:text-2xl text-center text-muted-foreground max-w-2xl mb-10"
          >
            Le boilerplate moderne pour développer rapidement des applications web full-stack
          </motion.p>
          
          <motion.div 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button asChild size="lg" className="group relative overflow-hidden">
              <Link href="/auth/signup">
                Commencer
                <motion.span
                  initial={{ x: -4 }}
                  animate={{ x: 0 }}
                  transition={{ repeat: Infinity, repeatType: "mirror", duration: 0.8 }}
                  className="ml-2"
                >
                  →
                </motion.span>
                <span className="absolute bottom-0 left-0 h-1 bg-primary-foreground/20 w-0 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="group">
              <Link href="https://github.com/GrandEmpereur/polarplate" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                Code source
              </Link>
            </Button>
          </motion.div>
        </header>

        {/* Features Grid */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="py-16"
        >
          <div className="text-center mb-16">
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
            <h2 className="text-3xl font-bold mb-4">Stack technique</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Propulsé par les technologies les plus modernes
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

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="py-16 mb-16 border-t border-border/40"
        >
          <div className="bg-card/80 backdrop-blur-sm rounded-xl p-8 sm:p-10 text-center max-w-3xl mx-auto border border-border/40">
            <h2 className="text-3xl font-bold mb-4">Prêt à démarrer?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Commencez à développer votre application avec PolarPlate dès maintenant et profitez d'une expérience de développement exceptionnelle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/auth/signup">
                  <Rocket className="mr-2 h-4 w-4" />
                  Créer un compte
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/auth/signin">
                  <Send className="mr-2 h-4 w-4" />
                  Se connecter
                </Link>
              </Button>
            </div>
          </div>
        </motion.section>
      </div>
      
      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/30 backdrop-blur-sm py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} PolarPlate. Tous droits réservés.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Mentions légales
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Confidentialité
            </Link>
            <Link href="https://github.com/GrandEmpereur/polarplate" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
              <Github className="h-4 w-4" />
              GitHub
            </Link>
          </div>
        </div>
      </footer>
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
    title: "DX exceptionnelle",
    description: "Configuration prête à l'emploi avec TypeScript pour un développement fluide et maintenable.",
    icon: GitMerge,
  },
];

const technologies = [
  { name: "Next.js 15", logo: "/next.svg" },
  { name: "Supabase", logo: "/supabase.svg" },
  { name: "Better Auth", logo: "/auth.svg" },
  { name: "Polar.sh", logo: "/polar.svg" },
  { name: "Prisma", logo: "/prisma.svg" },
  { name: "Tailwind CSS", logo: "/tailwind.svg" },
  { name: "shadcn/ui", logo: "/shadcn.svg" },
  { name: "Bun.sh", logo: "/bun.svg" },
];
