import type { FAQItem, BlogPost, Page, Author } from '@gratuity/shared';
import { SITE_CONFIG } from '@gratuity/shared';

// Organization Schema
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/images/logo.png`,
    description: SITE_CONFIG.description,
    contactPoint: {
      '@type': 'ContactPoint',
      email: SITE_CONFIG.email,
      contactType: 'customer service',
    },
    sameAs: [
      // Add social media URLs here
    ],
  };
}

// Website Schema
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_CONFIG.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

// WebPage Schema
export function generateWebPageSchema(options: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  author?: Author;
}) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: options.title,
    description: options.description,
    url: options.url,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
  };

  if (options.datePublished) {
    schema.datePublished = options.datePublished;
  }

  if (options.dateModified) {
    schema.dateModified = options.dateModified;
  }

  if (options.author) {
    schema.author = {
      '@type': 'Person',
      name: options.author.name,
      url: options.author.socialLinks?.linkedin,
    };
  }

  return schema;
}

// Article Schema (for blog posts)
export function generateArticleSchema(options: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author: Author;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: options.title,
    description: options.description,
    url: options.url,
    image: options.image || `${SITE_CONFIG.url}/images/og-default.jpg`,
    datePublished: options.datePublished,
    dateModified: options.dateModified || options.datePublished,
    author: {
      '@type': 'Person',
      name: options.author.name,
      url: options.author.socialLinks?.linkedin,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': options.url,
    },
  };
}

// FAQ Schema
export function generateFAQSchema(faqItems: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

// HowTo Schema
export function generateHowToSchema(options: {
  name: string;
  description: string;
  totalTime?: string;
  steps: Array<{ name: string; text: string; image?: string }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: options.name,
    description: options.description,
    totalTime: options.totalTime,
    step: options.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: step.image }),
    })),
  };
}

// Breadcrumb Schema
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// LocalBusiness Schema
export function generateLocalBusinessSchema(options: {
  name: string;
  description: string;
  address: {
    streetAddress?: string;
    addressLocality: string;
    addressRegion: string;
    postalCode?: string;
    addressCountry: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  telephone?: string;
  email?: string;
  url: string;
}) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: options.name,
    description: options.description,
    url: options.url,
    address: {
      '@type': 'PostalAddress',
      ...options.address,
    },
  };

  if (options.geo) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: options.geo.latitude,
      longitude: options.geo.longitude,
    };
  }

  if (options.telephone) {
    schema.telephone = options.telephone;
  }

  if (options.email) {
    schema.email = options.email;
  }

  return schema;
}

// Calculator Schema (custom for gratuity calculator)
export function generateCalculatorSchema(options: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: options.name,
    description: options.description,
    url: options.url,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
}

// Location/Place Schema
export function generateLocationSchema(options: {
  name: string;
  description: string;
  url: string;
  type: string;
  image?: string;
  containment?: { name: string; url: string };
}) {
  // Map internal types to Schema.org types
  let schemaType = 'Place';
  if (options.type === 'emirate' || options.type === 'area') {
    schemaType = 'AdministrativeArea';
  } else if (options.type === 'landmark') {
    schemaType = 'LandmarksOrHistoricalBuildings';
  }

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    name: options.name,
    description: options.description,
    url: options.url,
  };

  if (options.image) {
    schema.image = options.image;
  }

  // If we have containment info (e.g. Dubai -> UAE)
  if (options.containment) {
    schema.containedInPlace = {
      '@type': 'Place',
      name: options.containment.name,
      url: options.containment.url,
    };
  }

  return schema;
}

// Combine multiple schemas
export function combineSchemas(schemas: object[]): string {
  if (schemas.length === 1) {
    return JSON.stringify(schemas[0]);
  }

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': schemas.map((schema) => {
      const { '@context': _, ...rest } = schema as Record<string, unknown>;
      return rest;
    }),
  });
}
