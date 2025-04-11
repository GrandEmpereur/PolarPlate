"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  ChevronRight,
  Zap,
  Code,
  PaintBucket,
  Server,
  Database,
  Globe,
} from "lucide-react";

export default function TeamPage() {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-12 space-y-24">
      {/* En-tête */}
      <section className="text-center max-w-3xl mx-auto mb-12">
        <Badge variant="outline" className="mb-4 px-3 py-1 text-sm rounded-full border-primary/30">
          NOTRE ÉQUIPE
        </Badge>
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80"
        >
          Les visages derrière PolarPlate
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xl text-muted-foreground"
        >
          Une équipe passionnée de développeurs, designers et experts produit dédiés à révolutionner le développement web moderne.
        </motion.p>
      </section>

      {/* Équipe de direction */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Équipe de direction</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Notre équipe de direction apporte des décennies d'expérience combinées dans le développement de produits tech qui transforment les industries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {leadershipTeam.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <TeamMemberCard member={member} large />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Équipe de développement */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Équipe de développement</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Des développeurs talentueux qui transforment les idées en réalité et repoussent les limites de ce qui est possible avec les technologies web modernes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {devTeam.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <TeamMemberCard member={member} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Équipe design */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Équipe design</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Des designers créatifs qui donnent vie à notre vision avec une expérience utilisateur intuitive et une esthétique soignée.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {designTeam.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <TeamMemberCard member={member} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Rejoignez-nous */}
      <section>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 md:p-12 border border-primary/20 text-center max-w-4xl mx-auto"
        >
          <Badge variant="outline" className="mb-4 border-primary/30">CARRIÈRES</Badge>
          <h2 className="text-3xl font-bold mb-4">Rejoignez notre équipe</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Vous êtes passionné par la technologie et souhaitez avoir un impact significatif ? Nous sommes toujours à la recherche de talents exceptionnels pour renforcer notre équipe.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/careers">
                Voir nos offres d'emploi
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">
                Nous contacter <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Valeurs */}
      <section className="pb-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Nos valeurs</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Les principes qui guident notre équipe et façonnent notre culture d'entreprise au quotidien.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

// Composant de carte pour les membres de l'équipe
function TeamMemberCard({ member, large = false }: { member: TeamMember, large?: boolean }) {
  return (
    <Card className={`overflow-hidden h-full hover:border-primary/30 transition-all ${large ? 'border-primary/20' : ''}`}>
      <div className={`relative ${large ? 'aspect-[3/4]' : 'aspect-square'} overflow-hidden`}>
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover transition-transform hover:scale-105 duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 w-full p-4 flex justify-center space-x-2">
            {member.social.twitter && (
              <SocialLink href={member.social.twitter} icon={<Twitter className="h-4 w-4" />} label="Twitter" />
            )}
            {member.social.linkedin && (
              <SocialLink href={member.social.linkedin} icon={<Linkedin className="h-4 w-4" />} label="LinkedIn" />
            )}
            {member.social.github && (
              <SocialLink href={member.social.github} icon={<Github className="h-4 w-4" />} label="GitHub" />
            )}
            {member.social.mail && (
              <SocialLink href={`mailto:${member.social.mail}`} icon={<Mail className="h-4 w-4" />} label="Email" />
            )}
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-1.5">
          <h3 className="font-bold text-lg">{member.name}</h3>
          <p className="text-primary font-medium text-sm">{member.role}</p>
          <p className="text-muted-foreground text-sm mt-2">{member.bio}</p>
          
          {large && member.expertise.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {member.expertise.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Composant pour les liens sociaux
function SocialLink({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-full transition-colors"
      aria-label={label}
    >
      {icon}
    </Link>
  );
}

// Types et données
interface Social {
  twitter?: string;
  linkedin?: string;
  github?: string;
  mail?: string;
}

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  expertise: string[];
  social: Social;
}

// Données de l'équipe de direction
const leadershipTeam: TeamMember[] = [
  {
    name: "Thomas Dubois",
    role: "CEO & Co-fondateur",
    bio: "Ancien CTO chez TechGiant, Thomas a plus de 15 ans d'expérience dans le développement de produits tech et la direction d'équipes d'ingénierie.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
    expertise: ["Leadership", "Vision Produit", "Architecture Logicielle", "Stratégie d'Entreprise"],
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      mail: "thomas@polarplate.com",
    },
  },
  {
    name: "Sophie Moreau",
    role: "CTO & Co-fondatrice",
    bio: "Architecte cloud et experte en infrastructure, Sophie a dirigé des équipes d'ingénierie chez plusieurs startups avant de co-fonder PolarPlate.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
    expertise: ["Architecture Cloud", "DevOps", "Systèmes Distribués", "Sécurité"],
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      mail: "sophie@polarplate.com",
    },
  },
  {
    name: "David Chen",
    role: "CPO",
    bio: "Passionné par la création de produits qui résolvent des problèmes réels, David a plus de 10 ans d'expérience en gestion de produit dans l'industrie tech.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
    expertise: ["Stratégie Produit", "UX Design", "Gestion de Produit", "Growth Hacking"],
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      mail: "david@polarplate.com",
    },
  },
];

// Données de l'équipe de développement
const devTeam: TeamMember[] = [
  {
    name: "Alexandre Martin",
    role: "Lead Frontend",
    bio: "Expert React et Next.js, Alexandre s'assure que l'interface utilisateur est intuitive et performante.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop",
    expertise: ["React", "TypeScript", "Next.js", "Performance Web"],
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "Emma Lefebvre",
    role: "Lead Backend",
    bio: "Architecte backend spécialisée dans les API performantes et évolutives.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
    expertise: ["Node.js", "PostgreSQL", "GraphQL", "Microservices"],
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "Karim Bencherif",
    role: "DevOps Engineer",
    bio: "Expert en automatisation et en infrastructure as code, Karim optimise nos processus de déploiement.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    expertise: ["Kubernetes", "Docker", "AWS", "CI/CD"],
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "Léa Nguyen",
    role: "Fullstack Developer",
    bio: "Polyvalente et curieuse, Léa contribue à tous les aspects de notre plateforme.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
    expertise: ["React", "Node.js", "TypeScript", "MongoDB"],
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
];

// Données de l'équipe design
const designTeam: TeamMember[] = [
  {
    name: "Julie Dupont",
    role: "Lead Designer",
    bio: "Designer produit avec un œil pour l'esthétique et une passion pour l'expérience utilisateur.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    expertise: ["UI/UX", "Design System", "Figma", "Prototypage"],
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "Marc Rossi",
    role: "UI Designer",
    bio: "Spécialiste en interfaces utilisateur modernes et animations fluides.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop",
    expertise: ["UI Design", "CSS", "Animation", "Accessibilité"],
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "Nadia Petit",
    role: "UX Researcher",
    bio: "Dédiée à comprendre les besoins des utilisateurs pour créer des produits vraiment utiles.",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=1974&auto=format&fit=crop",
    expertise: ["User Research", "Usability Testing", "Journey Mapping", "Interviews"],
    social: {
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "Hugo Blanc",
    role: "Motion Designer",
    bio: "Créateur d'animations et d'interactions qui donnent vie à notre interface.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop",
    expertise: ["Motion Design", "After Effects", "Framer Motion", "SVG Animation"],
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
  },
];

// Données des valeurs de l'entreprise
const values = [
  {
    title: "Innovation constante",
    description: "Nous repoussons sans cesse les limites de ce qui est possible, en cherchant continuellement de nouvelles façons d'améliorer notre plateforme et d'apporter plus de valeur à nos utilisateurs.",
    icon: Zap,
  },
  {
    title: "Excellence technique",
    description: "Nous nous engageons à maintenir les plus hauts standards de qualité dans tout ce que nous développons, en utilisant les meilleures pratiques et en restant à la pointe de la technologie.",
    icon: Code,
  },
  {
    title: "Centré sur l'utilisateur",
    description: "Nos utilisateurs sont au cœur de chaque décision que nous prenons. Nous écoutons activement leurs retours et nous nous efforçons de créer des solutions qui répondent réellement à leurs besoins.",
    icon: Globe,
  },
]; 