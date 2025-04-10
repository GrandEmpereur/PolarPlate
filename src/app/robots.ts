import { MetadataRoute } from 'next';

/**
 * Robots.txt configuration for PolarPlate
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://polarplate.com';
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dashboard/',    // Protège les pages du tableau de bord
        '/api/',          // Protège les routes API
        '/auth/verify*',  // Protège les pages de vérification
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
} 