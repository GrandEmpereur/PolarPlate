"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Github, Loader2, Mail, KeyRound, ArrowRight } from "lucide-react";
import { signIn, authClient } from "@/lib/auth-client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEmailSignIn = async () => {
    await signIn.email(
      {
        email,
        password,
        callbackURL: "/dashboard"
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onResponse: () => {
          setLoading(false);
        },
        onSuccess: () => {
          router.push("/dashboard");
        },
        onError: (ctx) => {
          // Gestion spécifique pour l'erreur de vérification d'email
          if (ctx.error.status === 403 && ctx.error.message.includes("verify")) {
            toast.error("Veuillez vérifier votre email avant de vous connecter", {
              description: "Un email de vérification a été envoyé à votre adresse email.",
              action: {
                label: "Renvoyer",
                onClick: async () => {
                  try {
                    await authClient.sendVerificationEmail({
                      email,
                      callbackURL: "/dashboard"
                    });
                    toast.success("Email de vérification renvoyé");
                    router.push(`/auth/verify-notice?email=${encodeURIComponent(email)}`);
                  } catch (error) {
                    toast.error("Échec du renvoi de l'email");
                  }
                }
              }
            });
          } else {
            toast.error(ctx.error.message);
          }
        }
      },
    );
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    await signIn.social(
      {
        provider,
        callbackURL: "/dashboard"
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onResponse: () => {
          setLoading(false);
        },
        onSuccess: () => {
          router.push("/dashboard");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        }
      },
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-muted/20 p-4">
      <Card className="w-full max-w-md border-border/40 shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Connexion</CardTitle>
          <CardDescription>
            Entrez vos identifiants pour accéder à votre compte
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="m@exemple.com"
                  required
                  className="pl-10"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">Mot de passe</Label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Mot de passe oublié?
                </Link>
              </div>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !loading) {
                      handleEmailSignIn();
                    }
                  }}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full relative"
              disabled={loading}
              onClick={handleEmailSignIn}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              {loading ? "Connexion en cours..." : "Se connecter"}
              {!loading && <ArrowRight className="h-4 w-4 ml-2 absolute right-4" />}
            </Button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Ou continuer avec</span>
            </div>
          </div>

          <div className="grid gap-3">
            <Button
              variant="outline"
              className="w-full gap-2 hover:bg-muted/50 transition-colors"
              disabled={loading}
              onClick={() => handleSocialSignIn("google")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 256 262">
                <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
                <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
                <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"></path>
                <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
              </svg>
              Connexion avec Google
            </Button>
            
            <Button
              variant="outline"
              className="w-full gap-2 hover:bg-muted/50 transition-colors"
              disabled={loading}
              onClick={() => handleSocialSignIn("github")}
            >
              <Github className="h-4 w-4" />
              Connexion avec GitHub
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 border-t border-border/40 bg-muted/20 p-6">
          <div className="text-center text-sm">
            Vous n'avez pas de compte?{" "}
            <Link href="/auth/signup" className="font-semibold text-primary hover:underline">
              Créer un compte
            </Link>
          </div>
          <p className="text-center text-xs text-muted-foreground">
            En vous connectant, vous acceptez nos{" "}
            <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
              Conditions d'utilisation
            </Link>{" "}
            et notre{" "}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Politique de confidentialité
            </Link>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}