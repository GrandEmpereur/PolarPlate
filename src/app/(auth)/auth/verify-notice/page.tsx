"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Mail, AlertCircle, ArrowLeft, RefreshCw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useSearchParams } from "next/navigation";

export default function VerifyNotice() {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const handleResendEmail = async () => {
    if (!email) {
      toast.error("Email non disponible. Veuillez retourner à la page d'inscription.");
      return;
    }

    setLoading(true);
    try {
      await authClient.sendVerificationEmail({
        email,
        callbackURL: "/dashboard",
      });
      toast.success("Email de vérification renvoyé avec succès");
    } catch (error) {
      toast.error("Échec du renvoi de l'email. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-muted/20 p-4">
      <Card className="w-full max-w-md border-border/40 shadow-lg">
        <CardHeader className="space-y-1">
          <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Vérifiez votre email</CardTitle>
          <CardDescription className="text-center">
            Nous avons envoyé un email de vérification à votre adresse email
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-md space-y-3">
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="font-medium">Vérifiez votre boîte de réception</p>
                <p className="text-sm text-muted-foreground">
                  Cliquez sur le lien dans l'email que nous venons d'envoyer pour vérifier votre compte
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium">Vérifiez vos spams</p>
                <p className="text-sm text-muted-foreground">
                  Si vous ne trouvez pas l'email dans votre boîte de réception, vérifiez votre dossier spam
                </p>
              </div>
            </div>
          </div>
          
          <Button 
            className="w-full gap-2" 
            onClick={handleResendEmail}
            disabled={loading}
          >
            {loading ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            Renvoyer l'email de vérification
          </Button>
        </CardContent>
        <CardFooter className="flex-col space-y-4 border-t border-border/40 bg-muted/20 p-6">
          <div className="text-center text-sm">
            <Link
              href="/auth/signin"
              className="inline-flex items-center text-primary hover:underline font-medium"
            >
              <ArrowLeft className="mr-1 h-3 w-3" /> Retour à la page de connexion
            </Link>
          </div>
          <p className="text-center text-xs text-muted-foreground">
            Si vous rencontrez des problèmes, veuillez contacter notre support
          </p>
        </CardFooter>
      </Card>
    </div>
  );
} 