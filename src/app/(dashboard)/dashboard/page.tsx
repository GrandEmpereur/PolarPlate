import React from 'react'
import { Button } from '@/components/ui/button'
import { signOut } from '@/lib/auth-client'
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card'
import { getUser } from "@/lib/auth.session";
import { redirect } from 'next/navigation';
import { LogOut, User, CreditCard, Package } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Plan, Subscription } from '@prisma/client';

// Type étendu pour l'utilisateur avec les champs de la DB
interface UserWithSubscription {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null;
  stripeCustomerId?: string | null;
  currentPlan?: Plan;
  subscriptions?: Subscription[];
}

export default async function Dashboard() {
  const userResult = await getUser();
  
  // Protection de la route - rediriger si non authentifié
  if (!userResult) {
    redirect("/auth/sign-in");
  }

  // Cast de l'utilisateur avec le type étendu
  const user = userResult as UserWithSubscription;
  const currentPlan = user.currentPlan || "FREE";

  // Fonction pour obtenir le nom du plan formaté
  const getPlanName = (plan: string) => {
    switch (plan) {
      case "FREE":
        return "Gratuit";
      case "PRO":
        return "Pro";
      case "ENTERPRISE":
        return "Entreprise";
      default:
        return "Inconnu";
    }
  };

  // Fonction pour obtenir la couleur du badge selon le plan
  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "FREE":
        return "secondary";
      case "PRO":
        return "primary";
      case "ENTERPRISE":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Tableau de bord</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profil utilisateur
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid gap-1">
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div className="grid gap-1">
              <p className="text-sm font-medium text-muted-foreground">Nom</p>
              <p className="font-medium">{user.name || "Non défini"}</p>
            </div>
            <div className="grid gap-1">
              <p className="text-sm font-medium text-muted-foreground">ID</p>
              <p className="font-medium">{user.id}</p>
            </div>
          </CardContent>
          <CardFooter>
            <form action={async () => {
              "use server";
              await signOut();
              redirect("/auth/sign-in");
            }}>
              <Button variant="destructive" type="submit" className="gap-2">
                <LogOut className="h-4 w-4" />
                Déconnexion
              </Button>
            </form>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Abonnement
            </CardTitle>
            <CardDescription>Votre plan actuel et options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Plan actuel</p>
              <Badge variant={getPlanColor(currentPlan) as any}>
                {getPlanName(currentPlan)}
              </Badge>
            </div>
            
            {user.subscriptions && user.subscriptions.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Détails de l'abonnement</p>
                <div className="grid gap-1">
                  <p className="text-xs text-muted-foreground">Statut</p>
                  <p className="text-sm font-medium">{user.subscriptions[0].status}</p>
                </div>
                {user.subscriptions[0].currentPeriodEnd && (
                  <div className="grid gap-1">
                    <p className="text-xs text-muted-foreground">Prochaine facturation</p>
                    <p className="text-sm font-medium">
                      {new Date(user.subscriptions[0].currentPeriodEnd).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 items-stretch">
            <Link href="/pricing" className="w-full">
              <Button variant="outline" className="w-full gap-2">
                <CreditCard className="h-4 w-4" />
                Changer de plan
              </Button>
            </Link>
            
            {user.stripeCustomerId && (
              <Link href={`/api/stripe/portal?customerId=${user.stripeCustomerId}`} className="w-full">
                <Button variant="secondary" className="w-full">
                  Portail de facturation Stripe
                </Button>
              </Link>
            )}
          </CardFooter>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Activité récente</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Aucune activité récente à afficher</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Paramètres</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Configurez vos préférences ici</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
