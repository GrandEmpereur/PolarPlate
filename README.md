# PolarPlate

![PolarPlate](https://img.shields.io/badge/PolarPlate-v1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

PolarPlate est un boilerplate moderne et robuste pour le développement d'applications web full-stack. Cette stack technique soigneusement sélectionnée combine les technologies de pointe pour offrir une expérience de développement optimale et des performances exceptionnelles.

## 🚀 Technologies

- **[Next.js 15](https://nextjs.org/)** - Framework React avec rendu hybride, App Router et Server Components
- **[Supabase](https://supabase.com/)** - Alternative open source à Firebase pour la gestion de base de données PostgreSQL
- **[Better Auth](https://betterauth.io/)** - Solution d'authentification avancée et sécurisée
- **[Polar.sh](https://polar.sh/)** - Plateforme de gestion pour projets open source
- **[Prisma](https://www.prisma.io/)** - ORM nouvelle génération pour TypeScript et Node.js
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Framework CSS utilitaire pour un design rapide et responsive
- **[shadcn/ui](https://ui.shadcn.com/)** - Composants React accessibles et réutilisables
- **[Bun](https://bun.sh/)** - Runtime JavaScript ultra-rapide et gestionnaire de paquets

## ✨ Caractéristiques

- **Architecture moderne** - App Router de Next.js avec React Server Components
- **UI/UX optimisée** - Design system complet avec composants personnalisables
- **Authentification robuste** - Multiples stratégies d'authentification intégrées
- **Base de données flexible** - Modèles Prisma typés et migrations automatisées
- **Performance optimale** - Déploiements rapides et temps de chargement minimaux
- **DX exceptionnelle** - Configuration prête à l'emploi pour un développement fluide
- **TypeScript natif** - Support complet de TypeScript pour une meilleure maintenabilité

## 🛠️ Pour commencer

### Prérequis

- Node.js 18+
- Bun installé globalement
- Compte Supabase (pour la base de données)

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/votre-username/polarplate.git
cd polarplate

# Installer les dépendances
bun install

# Configurer les variables d'environnement
cp .env.example .env.local
# Remplir les variables dans .env.local

# Lancer le serveur de développement
bun dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) avec votre navigateur pour voir le résultat.

## 📚 Structure du projet

```
polarplate/
├── app/               # App Router de Next.js
├── components/        # Composants réutilisables
├── lib/              # Utilitaires et helpers
├── prisma/           # Schéma et migrations Prisma
├── public/           # Fichiers statiques
└── ...
```

## 📝 Documentation

Pour une documentation plus détaillée, consultez les ressources suivantes :

- [Documentation Next.js](https://nextjs.org/docs)
- [Guide Supabase](https://supabase.com/docs)
- [Documentation Prisma](https://www.prisma.io/docs)
- [Guide shadcn/ui](https://ui.shadcn.com/docs)

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.
