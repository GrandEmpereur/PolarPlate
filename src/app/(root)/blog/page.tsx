"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Calendar,
  ChevronRight,
  Clock,
  Search,
  Tag,
  User,
  Bookmark,
  ChevronLeft,
} from "lucide-react";

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState<string>("all");
  const [filteredPosts, setFilteredPosts] = React.useState<BlogPost[]>(blogPosts);
  
  // Filtrer les articles en fonction de la recherche et de la catégorie
  React.useEffect(() => {
    let filtered = [...blogPosts];
    
    // Filtrage par catégorie
    if (activeCategory !== "all") {
      filtered = filtered.filter(post => post.category === activeCategory);
    }
    
    // Filtrage par recherche
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        post => 
          post.title.toLowerCase().includes(term) || 
          post.excerpt.toLowerCase().includes(term) ||
          post.author.name.toLowerCase().includes(term)
      );
    }
    
    setFilteredPosts(filtered);
  }, [searchTerm, activeCategory]);

  // Extraire les articles mis en avant
  const featuredPosts = React.useMemo(() => 
    blogPosts.filter(post => post.featured).slice(0, 3),
    []
  );

  // Calculer le nombre d'articles par catégorie
  const categoryCount = React.useMemo(() => {
    const counts: Record<string, number> = { all: blogPosts.length };
    
    blogPosts.forEach(post => {
      if (!counts[post.category]) {
        counts[post.category] = 0;
      }
      counts[post.category]++;
    });
    
    return counts;
  }, []);

  return (
    <div className="container max-w-7xl mx-auto px-4 py-12 space-y-16">
      {/* En-tête */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <Badge variant="outline" className="mb-4 px-3 py-1 text-sm rounded-full border-primary/30">
          BLOG
        </Badge>
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80"
        >
          Actualités & Ressources
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xl text-muted-foreground"
        >
          Découvrez nos derniers articles, tutoriels et astuces pour tirer le meilleur parti de PolarPlate.
        </motion.p>
      </div>

      {/* Barre de recherche */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Rechercher un article..."
            className="pl-10 pr-4 py-6 text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Articles mis en avant */}
      {searchTerm.trim() === "" && activeCategory === "all" && (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Articles à la une</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/blog/featured" className="flex items-center">
                Voir tous les articles à la une
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <FeaturedPostCard post={post} />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Liste des articles avec filtre par catégorie */}
      <div>
        <Tabs 
          defaultValue="all" 
          value={activeCategory}
          onValueChange={setActiveCategory}
          className="w-full"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <h2 className="text-2xl font-bold">{searchTerm.trim() !== "" ? "Résultats de recherche" : "Tous les articles"}</h2>
            
            <TabsList className="overflow-x-auto flex-nowrap h-auto py-2 bg-transparent space-x-2">
              <TabsTrigger 
                value="all" 
                className="rounded-full px-4 py-2 font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center"
              >
                Tous
                <span className="ml-2 text-xs rounded-full bg-muted px-2 py-0.5">
                  {categoryCount.all}
                </span>
              </TabsTrigger>
              
              {Object.keys(blogCategories).map(category => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="rounded-full px-4 py-2 font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground whitespace-nowrap flex items-center"
                >
                  {blogCategories[category]}
                  <span className="ml-2 text-xs rounded-full bg-muted px-2 py-0.5">
                    {categoryCount[category] || 0}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value={activeCategory} className="mt-6">
            {filteredPosts.length === 0 ? (
              <div className="text-center p-16 bg-card/30 rounded-xl border border-border/40">
                <h3 className="text-xl font-medium mb-2">Aucun article trouvé</h3>
                <p className="text-muted-foreground">Essayez d'autres termes de recherche ou catégories</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("");
                    setActiveCategory("all");
                  }}
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <BlogPostCard post={post} />
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Pagination */}
      {filteredPosts.length > 0 && (
        <div className="flex items-center justify-center space-x-2 mt-12">
          <Button variant="outline" size="icon" disabled>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" size="sm" className="h-9 w-9 p-0 font-medium bg-primary text-primary-foreground">1</Button>
          <Button variant="outline" size="sm" className="h-9 w-9 p-0 font-medium">2</Button>
          <Button variant="outline" size="sm" className="h-9 w-9 p-0 font-medium">3</Button>
          <Button variant="outline" size="sm" className="h-9 w-9 p-0 font-medium">4</Button>
          <Button variant="outline" size="sm" className="h-9 w-9 p-0 font-medium">5</Button>
          
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Newsletter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-card/50 border border-border/50 rounded-2xl p-8 md:p-12 my-16 text-center max-w-4xl mx-auto"
      >
        <Badge variant="outline" className="mb-4 border-primary/30">NEWSLETTER</Badge>
        <h2 className="text-3xl font-bold mb-4">Restez informé</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Recevez nos derniers articles, tutoriels et mises à jour directement dans votre boîte de réception.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="votre.email@exemple.com"
            className="h-12"
          />
          <Button className="h-12 whitespace-nowrap">
            S'abonner
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground mt-4">
          En vous inscrivant, vous acceptez de recevoir des emails de notre part. Vous pouvez vous désabonner à tout moment.
        </p>
      </motion.div>
    </div>
  );
}

// Composants d'articles
function BlogPostCard({ post }: { post: BlogPost }) {
  const formattedDate = format(new Date(post.date), 'dd MMMM yyyy', { locale: fr });
  
  return (
    <Card className="h-full overflow-hidden hover:border-primary/30 transition-colors">
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover transition-transform hover:scale-105 duration-500"
        />
        <div className="absolute top-3 right-3">
          <Badge className="bg-primary/80 backdrop-blur-sm text-primary-foreground hover:bg-primary/70">
            {blogCategories[post.category]}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex items-center text-sm text-muted-foreground space-x-4 mb-2">
          <span className="flex items-center">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            {formattedDate}
          </span>
          <span className="flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1" />
            {post.readTime} min
          </span>
        </div>
        
        <Link href={`/blog/${post.slug}`} className="group">
          <h3 className="font-bold text-xl group-hover:text-primary transition-colors">
            {post.title}
          </h3>
        </Link>
      </CardHeader>
      
      <CardContent>
        <p className="text-muted-foreground line-clamp-2">
          {post.excerpt}
        </p>
      </CardContent>
      
      <CardFooter className="flex items-center justify-between pt-2">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full overflow-hidden relative mr-2 border border-border">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              fill
              className="object-cover"
            />
          </div>
          <span className="text-sm font-medium">{post.author.name}</span>
        </div>
        
        <Button variant="ghost" size="sm" className="h-8 px-2">
          <Bookmark className="h-4 w-4" />
          <span className="sr-only">Enregistrer</span>
        </Button>
      </CardFooter>
    </Card>
  );
}

function FeaturedPostCard({ post }: { post: BlogPost }) {
  const formattedDate = format(new Date(post.date), 'dd MMMM yyyy', { locale: fr });
  
  return (
    <Card className="h-full overflow-hidden border-primary/20 hover:border-primary/40 transition-colors bg-card/50">
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover transition-transform hover:scale-105 duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4 w-full">
          <Badge className="bg-primary/90 text-primary-foreground mb-2">
            {blogCategories[post.category]}
          </Badge>
          <Link href={`/blog/${post.slug}`} className="group">
            <h3 className="font-bold text-xl text-white group-hover:text-primary/90 transition-colors">
              {post.title}
            </h3>
          </Link>
          <div className="flex items-center mt-2 text-white/80 text-xs space-x-3">
            <span className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {formattedDate}
            </span>
            <span className="flex items-center">
              <User className="h-3 w-3 mr-1" />
              {post.author.name}
            </span>
          </div>
        </div>
      </div>

      <CardContent className="pt-4">
        <p className="text-muted-foreground line-clamp-3">
          {post.excerpt}
        </p>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button variant="ghost" size="sm" className="ml-auto group" asChild>
          <Link href={`/blog/${post.slug}`}>
            Lire l'article
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

// Types et données
interface Author {
  name: string;
  avatar: string;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  date: string;
  coverImage: string;
  readTime: number;
  author: Author;
  category: string;
  tags: string[];
  featured: boolean;
}

const blogCategories: Record<string, string> = {
  "tutorial": "Tutoriel",
  "news": "Actualité",
  "guide": "Guide",
  "case-study": "Étude de cas",
  "tips": "Astuces",
  "tech": "Technologie",
};

const authors: Record<string, Author> = {
  "alex": {
    name: "Alex Dubois",
    avatar: "/images/avatars/alex.jpg",
  },
  "emma": {
    name: "Emma Martin",
    avatar: "/images/avatars/emma.jpg",
  },
  "thomas": {
    name: "Thomas Chen",
    avatar: "/images/avatars/thomas.jpg",
  },
  "sophie": {
    name: "Sophie Leroux",
    avatar: "/images/avatars/sophie.jpg",
  },
};

// Exemple de données pour les articles du blog
const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Comment déployer une application Next.js avec PolarPlate en 5 minutes",
    slug: "deployer-nextjs-avec-polarplate",
    excerpt: "Découvrez comment configurer et déployer votre application Next.js en quelques étapes simples grâce à notre plateforme intégrée.",
    date: "2024-05-10",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    readTime: 8,
    author: authors.alex,
    category: "tutorial",
    tags: ["nextjs", "deployment", "frontend"],
    featured: true,
  },
  {
    id: "2",
    title: "Les meilleures pratiques pour sécuriser votre API REST",
    slug: "meilleures-pratiques-securite-api-rest",
    excerpt: "Explorez les techniques essentielles pour protéger vos API REST contre les vulnérabilités courantes et garantir la sécurité de vos données.",
    date: "2024-05-05",
    coverImage: "https://images.unsplash.com/photo-1633265486501-0cf524a07213?q=80&w=2070&auto=format&fit=crop",
    readTime: 12,
    author: authors.emma,
    category: "guide",
    tags: ["api", "security", "backend"],
    featured: true,
  },
  {
    id: "3",
    title: "Optimisation des performances avec notre nouveau CDN global",
    slug: "optimisation-performances-cdn-global",
    excerpt: "Notre réseau de distribution de contenu vient de s'étendre à 5 nouveaux continents. Découvrez comment en tirer parti pour améliorer les performances de votre application.",
    date: "2024-04-28",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    readTime: 6,
    author: authors.thomas,
    category: "news",
    tags: ["performance", "cdn", "infrastructure"],
    featured: true,
  },
  {
    id: "4",
    title: "Introduction à l'authentification avec PolarPlate Auth",
    slug: "introduction-polarplate-auth",
    excerpt: "Découvrez notre solution d'authentification complète et apprenez à l'intégrer dans votre application en quelques lignes de code.",
    date: "2024-04-25",
    coverImage: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2070&auto=format&fit=crop",
    readTime: 10,
    author: authors.alex,
    category: "tutorial",
    tags: ["authentication", "security", "oauth"],
    featured: false,
  },
  {
    id: "5",
    title: "Comment Startup XYZ a réduit ses coûts d'infrastructure de 60%",
    slug: "startup-xyz-reduction-couts-infrastructure",
    excerpt: "Découvrez comment cette startup en pleine croissance a optimisé son infrastructure et réduit ses coûts tout en améliorant ses performances.",
    date: "2024-04-20",
    coverImage: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
    readTime: 15,
    author: authors.sophie,
    category: "case-study",
    tags: ["startup", "cost-optimization", "scaling"],
    featured: false,
  },
  {
    id: "6",
    title: "10 astuces pour accélérer votre workflow de développement",
    slug: "10-astuces-accelerer-workflow-developpement",
    excerpt: "Des raccourcis clavier avancés aux extensions d'éditeur méconnues, voici comment gagner des heures chaque semaine dans votre processus de développement.",
    date: "2024-04-15",
    coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
    readTime: 7,
    author: authors.emma,
    category: "tips",
    tags: ["productivity", "tools", "workflow"],
    featured: false,
  },
  {
    id: "7",
    title: "L'IA dans le développement web : tendances et applications",
    slug: "ia-developpement-web-tendances-applications",
    excerpt: "Comment l'intelligence artificielle transforme les métiers du développement web et quels sont les outils concrets que vous pouvez utiliser dès aujourd'hui.",
    date: "2024-04-10",
    coverImage: "https://images.unsplash.com/photo-1677442135035-8ceacbd2900b?q=80&w=2070&auto=format&fit=crop",
    readTime: 9,
    author: authors.thomas,
    category: "tech",
    tags: ["ai", "future", "innovation"],
    featured: false,
  },
  {
    id: "8",
    title: "Gérer les bases de données à l'échelle : leçons apprises",
    slug: "gerer-bases-donnees-echelle-lecons",
    excerpt: "Les défis que nous avons rencontrés en faisant évoluer notre infrastructure de bases de données pour gérer des millions d'utilisateurs.",
    date: "2024-04-05",
    coverImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=2021&auto=format&fit=crop",
    readTime: 14,
    author: authors.sophie,
    category: "guide",
    tags: ["database", "scaling", "postgres"],
    featured: false,
  },
  {
    id: "9",
    title: "Notre feuille de route produit pour le second semestre 2024",
    slug: "feuille-route-produit-2024-s2",
    excerpt: "Découvrez les nouvelles fonctionnalités et améliorations prévues pour PolarPlate dans les six prochains mois.",
    date: "2024-03-30",
    coverImage: "https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?q=80&w=2070&auto=format&fit=crop",
    readTime: 5,
    author: authors.alex,
    category: "news",
    tags: ["roadmap", "features", "updates"],
    featured: false,
  },
]; 