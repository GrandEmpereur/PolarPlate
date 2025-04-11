"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  Mail,
  MessagesSquare,
  Phone,
  HelpCircle,
  FileQuestion,
  Bug,
  Rocket,
  Zap,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Schéma de validation du formulaire
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide",
  }),
  subject: z.string().min(5, {
    message: "Le sujet doit contenir au moins 5 caractères",
  }),
  category: z.string({
    required_error: "Veuillez sélectionner une catégorie",
  }),
  message: z.string().min(10, {
    message: "Le message doit contenir au moins 10 caractères",
  }),
  priority: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function SupportPage() {
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      category: "",
      message: "",
      priority: "normal",
    },
  });

  function onSubmit(data: FormValues) {
    setSubmitting(true);
    
    // Simulation d'envoi de formulaire
    setTimeout(() => {
      console.log("Formulaire soumis:", data);
      setSubmitting(false);
      setSubmitted(true);
      form.reset();
      
      // Réinitialisation après 5 secondes
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1500);
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-12 space-y-16">
      {/* En-tête */}
      <div className="text-center max-w-3xl mx-auto">
        <Badge variant="outline" className="mb-4 px-3 py-1 text-sm rounded-full border-primary/30">
          Support
        </Badge>
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80"
        >
          Comment pouvons-nous vous aider ?
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xl text-muted-foreground"
        >
          Notre équipe est à votre disposition pour répondre à toutes vos questions et résoudre vos problèmes.
        </motion.p>
      </div>

      {/* Sections d'assistance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {supportOptions.map((option, index) => (
          <motion.div
            key={option.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="h-full hover:border-primary/40 hover:shadow-md transition-all">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  {option.icon}
                </div>
                <CardTitle>{option.title}</CardTitle>
                <CardDescription>{option.description}</CardDescription>
              </CardHeader>
              <CardFooter className="pt-4">
                <Button variant="outline" size="sm" asChild>
                  <Link href={option.link} className="flex items-center">
                    {option.buttonText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Formulaire de contact et informations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="col-span-1 lg:col-span-2 space-y-8"
        >
          <div className="bg-card border rounded-xl p-6">
            <Tabs defaultValue="ticket" className="w-full">
              <TabsList className="w-full grid grid-cols-3 mb-6">
                <TabsTrigger value="ticket">Nouveau ticket</TabsTrigger>
                <TabsTrigger value="bug">Signaler un bug</TabsTrigger>
                <TabsTrigger value="feature">Suggérer une fonctionnalité</TabsTrigger>
              </TabsList>
              
              <TabsContent value="ticket" className="space-y-4">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Créer un ticket d'assistance</h3>
                  <p className="text-muted-foreground">
                    Décrivez votre problème en détail et nous vous répondrons dans les meilleurs délais.
                  </p>
                </div>
                
                {!submitted ? (
                  <ContactForm 
                    form={form} 
                    onSubmit={onSubmit}
                    submitting={submitting}
                    type="ticket"
                  />
                ) : (
                  <SuccessMessage type="ticket" />
                )}
              </TabsContent>
              
              <TabsContent value="bug" className="space-y-4">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Signaler un bug</h3>
                  <p className="text-muted-foreground">
                    Aidez-nous à améliorer PolarPlate en signalant les problèmes que vous rencontrez.
                  </p>
                </div>
                
                {!submitted ? (
                  <ContactForm 
                    form={form} 
                    onSubmit={onSubmit}
                    submitting={submitting}
                    type="bug"
                  />
                ) : (
                  <SuccessMessage type="bug" />
                )}
              </TabsContent>
              
              <TabsContent value="feature" className="space-y-4">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Suggérer une fonctionnalité</h3>
                  <p className="text-muted-foreground">
                    Partagez vos idées pour améliorer PolarPlate et nous aider à mieux répondre à vos besoins.
                  </p>
                </div>
                
                {!submitted ? (
                  <ContactForm 
                    form={form} 
                    onSubmit={onSubmit}
                    submitting={submitting}
                    type="feature"
                  />
                ) : (
                  <SuccessMessage type="feature" />
                )}
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Informations de contact</CardTitle>
              <CardDescription>Plusieurs façons de nous joindre</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-3 text-primary" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">support@polarplate.com</p>
                  <p className="text-xs text-muted-foreground mt-1">Réponse sous 24h ouvrées</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-3 text-primary" />
                <div>
                  <p className="font-medium">Téléphone</p>
                  <p className="text-sm text-muted-foreground">+33 (0)1 23 45 67 89</p>
                  <p className="text-xs text-muted-foreground mt-1">Du lundi au vendredi, 9h-18h CET</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MessagesSquare className="h-5 w-5 mr-3 text-primary" />
                <div>
                  <p className="font-medium">Chat en direct</p>
                  <p className="text-sm text-muted-foreground">Disponible pour les clients Pro et Entreprise</p>
                  <p className="text-xs text-muted-foreground mt-1">Assistance immédiate pendant les heures d'ouverture</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Temps de réponse</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Plan Gratuit</span>
                  <Badge variant="outline">48-72h</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Plan Pro</span>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">24h</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Plan Entreprise</span>
                  <Badge variant="outline" className="bg-primary/20 text-primary border-primary/40">4-8h</Badge>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border/30">
                <p className="text-xs text-muted-foreground">
                  Les délais indiqués sont des moyennes pendant les jours ouvrés. Pour une assistance urgente, 
                  les clients Entreprise peuvent utiliser notre ligne d'assistance prioritaire.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* FAQ et ressources */}
      <div className="pt-8 mt-10 border-t border-border/30">
        <h2 className="text-2xl font-bold text-center mb-8">Ressources d'assistance supplémentaires</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resourceLinks.map((resource, index) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 + 0.3 }}
            >
              <Link 
                href={resource.link} 
                className={cn(
                  "block h-full p-6 rounded-xl border transition-all",
                  "hover:border-primary/40 hover:shadow-sm",
                  "flex flex-col items-center text-center"
                )}
              >
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-4">
                  {resource.icon}
                </div>
                <h3 className="font-medium mb-2">{resource.title}</h3>
                <p className="text-sm text-muted-foreground">{resource.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactForm({ 
  form, 
  onSubmit, 
  submitting,
  type
}: { 
  form: any,
  onSubmit: (data: FormValues) => void,
  submitting: boolean,
  type: "ticket" | "bug" | "feature"
}) {
  // Ajuster les catégories en fonction du type de formulaire
  const categories = {
    ticket: [
      { value: "account", label: "Compte et facturation" },
      { value: "technical", label: "Problème technique" },
      { value: "access", label: "Problème d'accès" },
      { value: "performance", label: "Problème de performance" },
      { value: "other", label: "Autre question" },
    ],
    bug: [
      { value: "ui", label: "Interface utilisateur" },
      { value: "functionality", label: "Fonctionnalité" },
      { value: "performance", label: "Performance" },
      { value: "security", label: "Sécurité" },
      { value: "integration", label: "Intégration" },
    ],
    feature: [
      { value: "ui", label: "Interface utilisateur" },
      { value: "functionality", label: "Nouvelle fonctionnalité" },
      { value: "integration", label: "Nouvelle intégration" },
      { value: "improvement", label: "Amélioration existante" },
      { value: "other", label: "Autre suggestion" },
    ]
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input placeholder="Votre nom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="votre.email@exemple.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sujet</FormLabel>
              <FormControl>
                <Input placeholder="Sujet de votre demande" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Catégorie</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une catégorie" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories[type].map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {(type === "ticket" || type === "bug") && (
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priorité</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Niveau de priorité" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="low">Basse</SelectItem>
                      <SelectItem value="normal">Normale</SelectItem>
                      <SelectItem value="high">Haute</SelectItem>
                      <SelectItem value="critical">Critique</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription className="text-xs">
                    La priorité aide notre équipe à hiérarchiser les demandes.
                  </FormDescription>
                </FormItem>
              )}
            />
          )}
        </div>
        
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder={
                    type === "bug" 
                      ? "Décrivez le bug en détail (étapes pour reproduire, comportement attendu vs observé, etc.)" 
                      : type === "feature"
                      ? "Décrivez la fonctionnalité que vous souhaitez voir ajoutée et pourquoi elle serait utile"
                      : "Décrivez votre problème ou votre question en détail"
                  }
                  className="min-h-32"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end">
          <Button type="submit" disabled={submitting}>
            {submitting ? "Envoi en cours..." : "Envoyer la demande"}
            {!submitting && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </form>
    </Form>
  );
}

function SuccessMessage({ type }: { type: "ticket" | "bug" | "feature" }) {
  const messages = {
    ticket: {
      title: "Ticket créé avec succès !",
      message: "Votre demande a été enregistrée. Nous vous répondrons dans les plus brefs délais."
    },
    bug: {
      title: "Bug signalé avec succès !",
      message: "Merci d'avoir signalé ce problème. Notre équipe technique va l'examiner rapidement."
    },
    feature: {
      title: "Suggestion enregistrée !",
      message: "Merci pour votre suggestion. Nous étudions toutes les idées pour améliorer PolarPlate."
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-primary/10 border border-primary/30 rounded-lg p-6 text-center"
    >
      <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="32" 
          height="32" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="text-primary"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      </div>
      <h3 className="text-xl font-bold mb-2 text-primary">{messages[type].title}</h3>
      <p className="text-muted-foreground">{messages[type].message}</p>
      <p className="text-sm mt-4">
        Numéro de référence: #{Math.floor(Math.random() * 900000) + 100000}
      </p>
    </motion.div>
  );
}

// Données pour les options d'assistance
const supportOptions = [
  {
    title: "Centre d'aide",
    description: "Parcourez notre base de connaissances complète avec des guides et tutoriels",
    icon: <HelpCircle className="h-6 w-6 text-primary" />,
    link: "/faq",
    buttonText: "Consulter les ressources",
  },
  {
    title: "Documentation",
    description: "Documentation technique détaillée pour les développeurs",
    icon: <FileQuestion className="h-6 w-6 text-primary" />,
    link: "/docs",
    buttonText: "Voir la documentation",
  },
  {
    title: "Communauté",
    description: "Rejoignez notre communauté pour échanger et obtenir de l'aide",
    icon: <MessageCircle className="h-6 w-6 text-primary" />,
    link: "https://discord.gg/polarplate",
    buttonText: "Rejoindre la communauté",
  },
];

// Données pour les liens de ressources
const resourceLinks = [
  {
    title: "Tutoriels vidéo",
    description: "Apprenez visuellement avec nos guides vidéo étape par étape",
    icon: <Zap className="h-5 w-5 text-primary" />,
    link: "/tutoriels",
  },
  {
    title: "FAQ",
    description: "Réponses aux questions les plus fréquemment posées",
    icon: <HelpCircle className="h-5 w-5 text-primary" />,
    link: "/faq",
  },
  {
    title: "État du système",
    description: "Vérifiez le statut actuel de nos services",
    icon: <Bug className="h-5 w-5 text-primary" />,
    link: "/status",
  },
  {
    title: "Nouveautés",
    description: "Découvrez les dernières fonctionnalités et mises à jour",
    icon: <Rocket className="h-5 w-5 text-primary" />,
    link: "/changelog",
  },
]; 