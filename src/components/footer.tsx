"use client";

import Link from "next/link";
import { Github } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  const currentYear = new Date().getFullYear();

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
      title: "Légal",
      links: [
        { label: "Conditions d'utilisation", href: "/terms" },
        { label: "Politique de confidentialité", href: "/privacy" },
        { label: "Cookies", href: "/cookies" },
      ],
    },
  ];

  return (
    <footer className="border-t border-border/40 bg-card/30 backdrop-blur-sm py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="flex flex-col">
            <Link href="/" className="inline-flex items-center space-x-1">
              <span className="text-xl font-bold text-primary">Polar</span>
              <span className="text-lg font-medium">Plate</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">
              Le boilerplate moderne et robuste pour le développement d'applications web full-stack.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/GrandEmpereur/polarplate"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
              >
                <Github className="h-5 w-5" />
              </motion.a>
              {/* Autres liens sociaux peuvent être ajoutés ici */}
            </div>
          </div>

          {/* Sections de liens */}
          {footerSections.map((section) => (
            <div key={section.title} className="flex flex-col">
              <h3 className="font-semibold text-sm mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href} 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-border/40 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p className="mb-4 md:mb-0">
            © {currentYear} PolarPlate. Tous droits réservés.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href="/sitemap" className="hover:text-primary transition-colors">
              Plan du site
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
            <span className="hidden md:block">·</span>
            <span className="flex items-center gap-1">
              <span>Fait avec</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, repeatDelay: 5, duration: 0.4 }}
                className="inline-block text-red-500"
              >
                ❤️
              </motion.span>
              <span>en France</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
} 