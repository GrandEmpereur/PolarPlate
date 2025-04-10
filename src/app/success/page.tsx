"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  // Vérifie si l'utilisateur est authentifié
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
  useEffect(() => {
    if (!isLoading && !data) {
      router.push("/auth/signin");
    }
  }, [isLoading, data, router]);

  // Récupérer l'ID de la session de checkout depuis les paramètres d'URL
  const checkoutId = searchParams.get("checkout_id");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="w-full max-w-md px-8 py-12 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center space-y-6 bg-card p-8 rounded-xl shadow-lg border border-border/40"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
            className="rounded-full bg-primary/10 p-4"
          >
            <CheckCircle2 className="h-16 w-16 text-primary" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-bold tracking-tight"
          >
            Paiement réussi !
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-muted-foreground"
          >
            Votre abonnement a été activé avec succès. Nous vous remercions pour votre confiance.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="w-full pt-4 flex flex-col space-y-3"
          >
            <Button
              onClick={() => router.push("/dashboard")}
              className="w-full group"
            >
              Accéder à mon tableau de bord
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="w-full"
            >
              Retourner à l'accueil
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 