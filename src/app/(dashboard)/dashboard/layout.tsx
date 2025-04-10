import React from 'react';
import { Navbar } from '@/components/navbar';
import { getUser } from '@/lib/auth.session';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Vérification d'authentification au niveau du layout
  const user = await getUser();
  
  if (!user) {
    redirect('/auth/sign-in');
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
} 