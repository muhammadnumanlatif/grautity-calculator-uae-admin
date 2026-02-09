import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@gratuity/shared';
import { getDocuments, COLLECTIONS } from '@gratuity/firebase-config/firestore';
import { Page, BlogPost, Location } from '@gratuity/shared/types';

const baseUrl = SITE_CONFIG.url;

export const revalidate = 3600; // Revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // 1. Static Core Pages (Manual)
  // These are hardcoded application routes that might not be in the CMS
  const staticRoutes = [
    '',
    '/mohre-calculator',
    '/mohre-gratuity-calculator',
    '/limited-contract',
    '/unlimited-contract',
    '/labor-card-check',
    '/e-signature-card',
    '/faq',
    '/blog',
    '/contact',
    '/privacy-policy',
    '/terms-of-use',
  ];

  const corePages: MetadataRoute.Sitemap = staticRoutes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 2. Fetch Dynamic Content
  let dynamicPages: MetadataRoute.Sitemap = [];

  try {
    // A. Content Pages
    const pages = await getDocuments<Page>(COLLECTIONS.PAGES);
    const pageEntries: MetadataRoute.Sitemap = pages
      .filter(p => p.status === 'published')
      .map(page => ({
        url: `${baseUrl}/${page.slug}`,
        lastModified: (page.updatedAt as any)?.toDate ? (page.updatedAt as any).toDate() : new Date(page.updatedAt),
        changeFrequency: 'weekly',
        priority: 0.8,
      }));

    // B. Blog Posts
    const blogs = await getDocuments<BlogPost>(COLLECTIONS.BLOGS);
    const blogEntries: MetadataRoute.Sitemap = blogs
      .filter(b => b.status === 'published')
      .map(post => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: (post.updatedAt as any)?.toDate ? (post.updatedAt as any).toDate() : new Date(post.updatedAt),
        changeFrequency: 'weekly',
        priority: 0.7,
      }));

    // C. Locations
    const locations = await getDocuments<Location>(COLLECTIONS.LOCATIONS);
    const locationEntries: MetadataRoute.Sitemap = locations
      .filter(l => l.status === 'published')
      .map(loc => {
        let path = '';
        switch (loc.type) {
          case 'emirate':
            path = `/${loc.slug}`;
            break;
          case 'area':
            path = `/${loc.emirate}/${loc.slug}`;
            break;
          case 'free-zone':
            path = `/${loc.emirate}/free-zones/${loc.slug}`;
            break;
          case 'landmark':
            path = `/${loc.emirate}/landmarks/${loc.slug}`;
            break;
          default:
            path = `/${loc.slug}`; // Fallback
        }

        return {
          url: `${baseUrl}${path}`,
          lastModified: (loc.updatedAt as any)?.toDate ? (loc.updatedAt as any).toDate() : new Date(loc.updatedAt),
          changeFrequency: 'monthly',
          priority: loc.type === 'emirate' ? 0.9 : 0.7,
        };
      });

    dynamicPages = [...pageEntries, ...blogEntries, ...locationEntries];

  } catch (error) {
    console.error('Failed to generate dynamic sitemap:', error);
    // Continue with static pages only if DB fails
  }

  // Deduplicate: If a static route is also in dynamic (unlikely but safe), prefer dynamic
  const allEntries = [...corePages, ...dynamicPages];
  const uniqueEntries = Array.from(new Map(allEntries.map(item => [item.url, item])).values());

  return uniqueEntries;
}
