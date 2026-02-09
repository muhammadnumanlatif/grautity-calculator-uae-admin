import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import { getDynamicContentBySlug } from '@/lib/dynamic-content';
import { SITE_CONFIG } from '@gratuity/shared';
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateLocationSchema,
  combineSchemas,
} from '@gratuity/seo-utils';

interface PageProps {
  params: {
    slug: string[];
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const content = await getDynamicContentBySlug(params.slug);

  if (!content) {
    return {
      title: 'Page Not Found',
    };
  }

  const displayName = content.contentType === 'page' ? (content as any).title : (content as any).name;

  // Enhance default title and keywords for locations
  let defaultTitle = displayName;
  let defaultKeywords = content.seo?.secondaryKeywords || [];

  if (content.contentType === 'location') {
    defaultTitle = `${displayName} Gratuity Calculator 2026`;
    if (!content.seo?.secondaryKeywords || content.seo.secondaryKeywords.length === 0) {
      defaultKeywords = [
        `${displayName} gratuity calculator`,
        `${displayName} end of service`,
        `mohre calculator ${displayName}`,
        `labor law ${displayName}`
      ];
    }
  }

  return {
    title: content.seo?.metaTitle || defaultTitle,
    description: content.seo?.metaDescription,
    keywords: defaultKeywords,
    alternates: {
      canonical: content.seo?.canonicalUrl || `${SITE_CONFIG.url}/${params.slug.join('/')}`,
    },
    robots: {
      index: content.seo?.robots?.index ?? true,
      follow: content.seo?.robots?.follow ?? true,
    },
    openGraph: {
      title: content.social?.ogTitle || content.seo?.metaTitle,
      description: content.social?.ogDescription || content.seo?.metaDescription,
      images: content.social?.ogImage ? [{ url: content.social.ogImage }] : undefined,
    },
  };
}

export default async function DynamicSlugPage({ params }: PageProps) {
  const content = await getDynamicContentBySlug(params.slug);

  if (!content) {
    notFound();
  }

  // Get display name (Page uses 'title', Location uses 'name')
  const displayName = content.contentType === 'page' ? (content as any).title : (content as any).name;

  // Prepare breadcrumbs
  const breadcrumbs = [{ name: 'Home', url: SITE_CONFIG.url }];

  // Iterate through slug parts to build intermediate crumbs
  let currentPath = '';
  params.slug.forEach((slugPart, index) => {
    currentPath += `/${slugPart}`;
    const isLast = index === params.slug.length - 1;

    // For the last item, use the official displayName from content
    if (isLast) {
      breadcrumbs.push({
        name: displayName,
        url: `${SITE_CONFIG.url}${currentPath}`
      });
    } else {
      // For intermediate items, format the slug
      const name = slugPart
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      breadcrumbs.push({
        name: name,
        url: `${SITE_CONFIG.url}${currentPath}`
      });
    }
  });

  // Prepare schemas
  const schemasToCombine: any[] = [generateBreadcrumbSchema(breadcrumbs)];

  if (content.contentType === 'location') {
    schemasToCombine.push(generateLocationSchema({
      name: displayName,
      description: content.seo?.metaDescription || `Gratuity calculation services in ${displayName}`,
      url: `${SITE_CONFIG.url}/${params.slug.join('/')}`,
      type: (content as any).type || 'area',
      image: content.social?.ogImage,
      // We could add containment here if we parsed hierarchy
      containment: params.slug.length > 1 ? {
        name: params.slug[params.slug.length - 2].split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        url: `${SITE_CONFIG.url}/${params.slug.slice(0, -1).join('/')}`
      } : undefined
    }));
  }

  if (content.faqs && content.faqs.length > 0) {
    schemasToCombine.push(generateFAQSchema(content.faqs));
  }

  const schemas = combineSchemas(schemasToCombine);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemas }}
      />

      {/* If there are blocks, use the BlockRenderer */}
      {content.blocks && content.blocks.length > 0 ? (
        <BlockRenderer blocks={content.blocks} />
      ) : (
        /* Fallback for legacy content or pages without blocks */
        <div className="container py-5">
          <h1>{displayName}</h1>
          <div dangerouslySetInnerHTML={{ __html: (content as any).content || '' }} />
        </div>
      )}
    </>
  );
}
