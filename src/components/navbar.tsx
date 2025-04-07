"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession, signOut } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { Github, Menu, Moon, Sun, User, LogOut, Settings, Home, AlertCircle } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { data, isPending } = useSession();
  const user = data?.user;
  const [mobileOpen, setMobileOpen] = useState(false);

  // Pour éviter les erreurs d'hydratation
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const navigation = [
    { name: "Accueil", href: "/" },
    { name: "Documentation", href: "/docs" },
    { name: "Tarification", href: "/pricing" },
  ];

  const userNavigation = [
    { name: "Tableau de bord", href: "/dashboard", icon: Home },
    { name: "Profil", href: "/profile", icon: User },
    { name: "Paramètres", href: "/settings", icon: Settings },
  ];

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <div>
              <span className="text-2xl font-bold text-primary">Polar</span>
              <span className="text-xl font-medium">Plate</span>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {/* Bouton toggle theme */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            className="mr-2"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* GitHub */}
          <Button
            variant="outline"
            size="icon"
            asChild
            className="rounded-full mr-2 hidden md:flex"
          >
            <Link
              href="https://github.com/GrandEmpereur/polarplate"
              target="_blank"
            >
              <Github className="h-4 w-4" />
            </Link>
          </Button>

          {/* État de connexion */}
          {isPending ? (
            <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
          ) : user ? (
            <>
              {/* Utilisateur connecté - Vue Desktop */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full hidden md:flex"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user.image || ""}
                        alt={user.name || ""}
                      />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {userNavigation.map((item) => (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link
                        href={item.href}
                        className="flex items-center cursor-pointer"
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer text-destructive focus:text-destructive"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Menu mobile */}
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[280px]">
                  <SheetHeader className="pb-6">
                    <SheetTitle className="text-left mb-4">Menu</SheetTitle>
                    <div className="flex items-center gap-3 px-1 py-2 mb-2">
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={user.image || ""}
                          alt={user.name || ""}
                        />
                        <AvatarFallback>
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </SheetHeader>
                  <div className="flex flex-col gap-1">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "px-1 py-2 text-sm font-medium rounded-md transition-colors",
                          pathname === item.href
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-muted"
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                    <div className="h-px bg-border my-2" />
                    {userNavigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center px-1 py-2 text-sm font-medium rounded-md hover:bg-muted transition-colors"
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.name}
                      </Link>
                    ))}
                    <div className="h-px bg-border my-2" />
                    <button
                      onClick={() => {
                        handleSignOut();
                        setMobileOpen(false);
                      }}
                      className="flex items-center px-1 py-2 text-sm font-medium rounded-md hover:bg-destructive/10 text-destructive transition-colors text-left"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Déconnexion
                    </button>
                  </div>
                </SheetContent>
              </Sheet>
            </>
          ) : (
            <>
              {/* Utilisateur non connecté */}
              <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link href="/auth/signin">Connexion</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/signup">Inscription</Link>
                </Button>
              </div>

              {/* Menu mobile (non connecté) */}
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[280px]">
                  <SheetHeader className="pb-6">
                    <SheetTitle className="text-left mb-4">Menu</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-1">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "px-1 py-2 text-sm font-medium rounded-md transition-colors",
                          pathname === item.href
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-muted"
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                    <div className="h-px bg-border my-2" />
                    <Link
                      href="/auth/signin"
                      onClick={() => setMobileOpen(false)}
                      className="px-1 py-2 text-sm font-medium rounded-md hover:bg-muted transition-colors"
                    >
                      Connexion
                    </Link>
                    <Link
                      href="/auth/signup"
                      onClick={() => setMobileOpen(false)}
                      className="px-1 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-center mt-1"
                    >
                      Inscription
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
