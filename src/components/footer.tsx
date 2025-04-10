"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin, Mail, ArrowRight, CheckCircle2, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Simuler une souscription réussie
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  const footerSections = [
    {
      title: "Produit",
      links: [
        { label: "Fonctionnalités", href: "/features" },
        { label: "Tarification", href: "/pricing" },
        { label: "Documentation", href: "/docs" },
        { label: "Roadmap", href: "/roadmap" },
      ],
    },
    {
      title: "Ressources",
      links: [
        { label: "Guide de démarrage", href: "/getting-started" },
        { label: "Tutoriels", href: "/tutorials" },
        { label: "FAQ", href: "/faq" },
        { label: "Support", href: "/support" },
      ],
    },
    {
      title: "Entreprise",
      links: [
        { label: "À propos", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Équipe", href: "/team" },
        { label: "Carrières", href: "/careers" },
      ],
    },
    {
      title: "Légal",
      links: [
        { label: "Conditions d'utilisation", href: "/terms" },
        { label: "Politique de confidentialité", href: "/privacy" },
        { label: "Cookies", href: "/cookies" },
        { label: "Mentions légales", href: "/legal" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/GrandEmpereur/polarplate", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "mailto:contact@polarplate.com", label: "Email" },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <footer className="border-t border-border/40 bg-card/30 backdrop-blur-sm py-16 relative overflow-hidden">
      {/* Effet de particules subtil en fond */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-primary rounded-full"
            initial={{ 
              x: `${Math.random() * 100}%`, 
              y: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              opacity: Math.random() * 0.5 + 0.3
            }}
            animate={{ 
              y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: Math.random() * 20 + 20,
              ease: "linear",
              repeatType: "reverse"
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Logo et Newsletter - Prend 2 colonnes */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            <Link href="/" className="inline-flex items-center space-x-1 group">
              <motion.div className="overflow-hidden inline-flex">
                <motion.span 
                  className="text-2xl font-bold text-primary"
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  Polar
                </motion.span>
              </motion.div>
              <motion.div className="overflow-hidden inline-flex">
                <motion.span 
                  className="text-xl font-medium"
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30, delay: 0.1 }}
                >
                  Plate
                </motion.span>
              </motion.div>
            </Link>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-sm text-muted-foreground max-w-xs leading-relaxed"
            >
              PolarPlate est un boilerplate moderne et robuste pour développer rapidement des applications web SaaS avec Next.js, TypeScript et Stripe.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mt-6 space-y-2"
            >
              <h3 className="text-sm font-semibold flex items-center">
                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: "1.5rem" }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="h-px bg-primary mr-2 inline-block"
                />
                Restez informé
              </h3>
              
              <AnimatePresence mode="wait">
                {isSubscribed ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="flex items-center text-primary space-x-2 rounded-md bg-primary/10 py-2 px-3"
                  >
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="text-sm font-medium">Merci pour votre inscription !</span>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    onSubmit={handleSubscribe} 
                    className="flex gap-2"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <Input
                      type="email"
                      placeholder="Votre email"
                      className="max-w-[220px] bg-background/60 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Button 
                      type="submit" 
                      variant="outline" 
                      size="sm" 
                      className="group relative overflow-hidden bg-primary/5 hover:bg-primary/10 hover:text-primary border-primary/20"
                    >
                      <div className="relative z-10 flex items-center">
                        <span className="sr-only sm:not-sr-only sm:inline-block">S'abonner</span>
                        <motion.div
                          initial={{ x: 0 }}
                          whileHover={{ x: 3 }}
                          className="h-4 w-4 sm:ml-1"
                        >
                          <ArrowRight className="h-4 w-4" />
                        </motion.div>
                      </div>
                      <motion.div 
                        className="absolute inset-0 bg-primary/10 z-0" 
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
                      />
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="text-xs text-muted-foreground"
              >
                Recevez nos actualités et mises à jour. Pas de spam.
              </motion.p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex space-x-3 mt-6"
            >
              {socialLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.1, type: "spring" }}
                  whileHover={{ y: -3, backgroundColor: "rgba(var(--primary-rgb), 0.15)" }}
                  whileTap={{ scale: 0.95 }}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-background/80 hover:text-primary transition-colors duration-300"
                  aria-label={link.label}
                >
                  <link.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Sections de liens - Prennent 3 colonnes */}
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:col-span-3 gap-8"
          >
            {footerSections.map((section) => (
              <motion.div 
                key={section.title} 
                variants={item} 
                className="flex flex-col"
                onMouseEnter={() => setHoveredSection(section.title)}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <h3 className="font-semibold text-sm mb-4 flex items-center">
                  <motion.span 
                    initial={{ width: 0 }}
                    animate={{ width: hoveredSection === section.title ? "1rem" : "0" }}
                    transition={{ duration: 0.2 }}
                    className="h-px bg-primary mr-2 inline-block"
                  />
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, i) => (
                    <motion.li 
                      key={link.label}
                      variants={item}
                      custom={i}
                    >
                      <Link 
                        href={link.href} 
                        className="text-sm text-muted-foreground hover:text-primary group flex items-center transition-colors"
                      >
                        <motion.span
                          initial={{ width: 0, opacity: 0 }}
                          whileHover={{ width: "0.5rem", opacity: 1 }}
                          className="inline-block h-px bg-primary mr-0 group-hover:mr-2 transition-all"
                        />
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <Separator className="my-10 opacity-20" />

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground"
        >
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <Badge 
              variant="outline" 
              className="bg-primary/5 border-primary/20 px-2 group relative overflow-hidden"
            >
              <motion.span
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
                className="text-xs relative z-10"
              >
                v1.0
              </motion.span>
              <motion.div 
                className="absolute inset-0 bg-primary z-0" 
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.1 }}
                transition={{ duration: 0.2 }}
              />
            </Badge>
            <p className="text-muted-foreground/70">
              © {currentYear} PolarPlate. Tous droits réservés.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-6">
            <Link 
              href="/sitemap" 
              className="text-xs text-muted-foreground/70 hover:text-primary transition-colors group flex items-center"
            >
              <motion.span
                initial={{ width: 0 }}
                whileHover={{ width: "0.5rem" }}
                className="inline-block h-px bg-primary mr-0 group-hover:mr-1 transition-all"
              />
              Plan du site
            </Link>
            
            <Link 
              href="/contact" 
              className="text-xs text-muted-foreground/70 hover:text-primary transition-colors group flex items-center"
            >
              <motion.span
                initial={{ width: 0 }}
                whileHover={{ width: "0.5rem" }}
                className="inline-block h-px bg-primary mr-0 group-hover:mr-1 transition-all"
              />
              Contact
            </Link>
            
            <span className="hidden md:block text-muted-foreground/30">·</span>
            
            <motion.div
              className="flex items-center gap-1 text-xs text-muted-foreground/70"
              whileHover={{ 
                color: "hsl(var(--primary))",
                transition: { duration: 0.2 } 
              }}
            >
              <span>Fait avec</span>
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  repeatDelay: 3, 
                  duration: 0.8,
                  ease: "easeInOut"
                }}
                className="inline-flex text-red-500"
              >
                <Heart className="h-3 w-3 fill-current" />
              </motion.div>
              <span>en France</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
} 