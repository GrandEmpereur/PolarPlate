import React from 'react'
import { Button } from '@/components/ui/button'
import { signOut } from '@/lib/auth-client'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { getUser } from "@/lib/auth.session";
import { redirect } from 'next/navigation';
import { LogOut, User } from 'lucide-react';

export default async function Dashboard() {
  const user = await getUser()
  
  // Protection de la route - rediriger si non authentifié
  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Tableau de bord</h1>
      
      <Card className="mb-6">
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
            redirect("/auth/signin");
          }}>
            <Button variant="destructive" type="submit" className="gap-2">
              <LogOut className="h-4 w-4" />
              Déconnexion
            </Button>
          </form>
        </CardFooter>
      </Card>
      
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
