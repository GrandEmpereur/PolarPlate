"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Github, Menu, X, Store, Book, CreditCard, HelpCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

export function Navbar() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      name: "Accueil",
      href: "/",
      icon: Store,
    },
    {
      name: "Documentation",
      href: "/docs",
      icon: Book,
    },
    {
      name: "Tarifs",
      href: "/pricing",
      icon: CreditCard,
    },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-200",
        scrolled 
          ? "bg-background/80 backdrop-blur-lg border-border/40" 
          : "bg-background border-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-1 mr-6">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-xl font-bold text-primary"
            >
              Polar
            </motion.span>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-lg font-medium"
            >
              Plate
            </motion.span>
            <Badge variant="outline" className="ml-2 bg-primary/5 border-primary/20 px-1.5">
              <span className="text-xs">v1.0</span>
            </Badge>
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                    "hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-item"
                      className="absolute inset-0 rounded-md bg-primary/10 dark:bg-primary/15"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  <span className="relative flex items-center z-10">
                    <item.icon className={cn("mr-1.5 h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <motion.a
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/GrandEmpereur/polarplate"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center justify-center h-8 w-8 rounded-md hover:bg-accent/50 transition-colors"
          >
            <Github className="h-5 w-5" />
          </motion.a>

          <ThemeToggle />

          {/* Boutons de connexion/inscription */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/auth/sign-in">Connexion</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/auth/sign-up">S'inscrire</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-xs p-0">
              <SheetHeader className="px-6 py-4 border-b">
                <SheetTitle className="flex items-center justify-between">
                  <Link href="/" onClick={() => setMobileNavOpen(false)} className="flex items-center gap-1">
                    <span className="text-xl font-bold text-primary">Polar</span>
                    <span className="text-lg font-medium">Plate</span>
                  </Link>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                      <X className="h-5 w-5" />
                      <span className="sr-only">Fermer</span>
                    </Button>
                  </SheetClose>
                </SheetTitle>
              </SheetHeader>
              
              <div className="px-6 py-4">
                <nav className="grid gap-2">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                    return (
                      <SheetClose key={item.href} asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                            isActive 
                              ? "bg-primary/10 text-primary font-medium" 
                              : "text-muted-foreground hover:bg-accent/50"
                          )}
                        >
                          <item.icon className="h-4 w-4" />
                          {item.name}
                        </Link>
                      </SheetClose>
                    );
                  })}
                </nav>
                
                <Separator className="my-4" />
                
                <div className="grid gap-2">
                  <SheetClose asChild>
                    <Button variant="outline" className="w-full justify-center" asChild>
                      <Link href="/auth/sign-in">Connexion</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button className="w-full justify-center" asChild>
                      <Link href="/auth/sign-up">S'inscrire</Link>
                    </Button>
                  </SheetClose>
                </div>
              </div>
              
              <SheetFooter className="mt-auto px-6 py-4 border-t flex flex-col items-start gap-4">
                <div className="flex items-center gap-4">
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://github.com/GrandEmpereur/polarplate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <Github className="h-5 w-5" />
                  </motion.a>
                  
                  <ThemeToggle />
                </div>
                
                <p className="text-xs text-muted-foreground">
                  © {new Date().getFullYear()} PolarPlate. Tous droits réservés.
                </p>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
