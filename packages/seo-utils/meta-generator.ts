import type { SEOData, SocialData } from '@gratuity/shared';
import { SEO_DEFAULTS, SITE_CONFIG } from '@gratuity/shared';

export interface MetaTagsOptions {
  seo: SEOData;
  social?: SocialData;
  url: string;
  type?: 'website' | 'article';
}

export interface MetaTag {
  name?: string;
  property?: string;
  content: string;
}

// Generate meta title
export function generateMetaTitle(title: string, includeSuffix = true): string {
  if (!includeSuffix) {
    return title.substring(0, SEO_DEFAULTS.TITLE_MAX_LENGTH);
  }

  const suffix = SEO_DEFAULTS.TITLE_SUFFIX;
  const separator = SEO_DEFAULTS.TITLE_SEPARATOR;
  const maxTitleLength = SEO_DEFAULTS.TITLE_MAX_LENGTH - suffix.length - separator.length;

  const truncatedTitle = title.substring(0, maxTitleLength);
  return `${truncatedTitle}${separator}${suffix}`;
}

// Generate meta description
export function generateMetaDescription(description: string): string {
  return description.substring(0, SEO_DEFAULTS.DESCRIPTION_MAX_LENGTH);
}

// Generate robots meta content
export function generateRobotsMeta(robots: { index: boolean; follow: boolean }): string {
  const parts: string[] = [];
  parts.push(robots.index ? 'index' : 'noindex');
  parts.push(robots.follow ? 'follow' : 'nofollow');
  return parts.join(', ');
}

// Generate all meta tags
export function generateMetaTags(options: MetaTagsOptions): MetaTag[] {
  const { seo, social, url, type = 'website' } = options;
  const tags: MetaTag[] = [];

  // Basic meta tags
  tags.push({ name: 'description', content: generateMetaDescription(seo.metaDescription) });
  tags.push({ name: 'keywords', content: [seo.focusKeyword, ...seo.secondaryKeywords].join(', ') });
  tags.push({ name: 'robots', content: generateRobotsMeta(seo.robots) });

  // Canonical URL
  if (seo.canonicalUrl) {
    tags.push({ name: 'canonical', content: seo.canonicalUrl });
  }

  // Open Graph tags
  tags.push({ property: 'og:type', content: type });
  tags.push({ property: 'og:url', content: url });
  tags.push({ property: 'og:title', content: social?.ogTitle || seo.metaTitle });
  tags.push({ property: 'og:description', content: social?.ogDescription || seo.metaDescription });
  tags.push({
    property: 'og:image',
    content: social?.ogImage || `${SITE_CONFIG.url}${SEO_DEFAULTS.DEFAULT_OG_IMAGE}`,
  });
  tags.push({ property: 'og:site_name', content: SITE_CONFIG.name });
  tags.push({ property: 'og:locale', content: SITE_CONFIG.locale });

  // Twitter Card tags
  tags.push({ name: 'twitter:card', content: social?.twitterCard || 'summary_large_image' });
  tags.push({ name: 'twitter:title', content: social?.twitterTitle || seo.metaTitle });
  tags.push({
    name: 'twitter:description',
    content: social?.twitterDescription || seo.metaDescription,
  });
  tags.push({
    name: 'twitter:image',
    content: social?.twitterImage || social?.ogImage || `${SITE_CONFIG.url}${SEO_DEFAULTS.DEFAULT_OG_IMAGE}`,
  });

  return tags;
}

// Generate canonical URL
export function generateCanonicalUrl(path: string): string {
  const baseUrl = SITE_CONFIG.url.replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}

// Generate alternate language links
export function generateHreflangLinks(
  path: string,
  languages: Array<{ lang: string; url: string }>
): Array<{ rel: string; hreflang: string; href: string }> {
  return languages.map((lang) => ({
    rel: 'alternate',
    hreflang: lang.lang,
    href: lang.url,
  }));
}

// Generate sitemap entry
export interface SitemapEntry {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export function generateSitemapEntry(options: {
  path: string;
  lastmod?: Date;
  changefreq?: SitemapEntry['changefreq'];
  priority?: number;
}): SitemapEntry {
  return {
    url: generateCanonicalUrl(options.path),
    lastmod: options.lastmod?.toISOString().split('T')[0],
    changefreq: options.changefreq || 'weekly',
    priority: options.priority || 0.5,
  };
}

// Generate sitemap XML
export function generateSitemapXml(entries: SitemapEntry[]): string {
  const urlEntries = entries
    .map((entry) => {
      let xml = `  <url>\n    <loc>${entry.url}</loc>\n`;
      if (entry.lastmod) {
        xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
      }
      if (entry.changefreq) {
        xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
      }
      if (entry.priority !== undefined) {
        xml += `    <priority>${entry.priority}</priority>\n`;
      }
      xml += '  </url>';
      return xml;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

// Generate robots.txt content
export function generateRobotsTxt(options: {
  sitemapUrl: string;
  disallowPaths?: string[];
  allowPaths?: string[];
}): string {
  let content = 'User-agent: *\n';

  if (options.allowPaths) {
    options.allowPaths.forEach((path) => {
      content += `Allow: ${path}\n`;
    });
  }

  if (options.disallowPaths) {
    options.disallowPaths.forEach((path) => {
      content += `Disallow: ${path}\n`;
    });
  }

  content += `\nSitemap: ${options.sitemapUrl}\n`;

  return content;
}
