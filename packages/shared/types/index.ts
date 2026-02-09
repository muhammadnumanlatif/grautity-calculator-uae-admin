export * from './blocks';
export * from './blocks';
// Contract Types
export type ContractType = 'unlimited' | 'limited';

// Termination Reasons
export type TerminationReason = 'resignation' | 'termination' | 'contract_end' | 'mutual_agreement';

// Gratuity Calculation Input
export interface GratuityInput {
  contractType: ContractType;
  basicSalary: number;
  startDate: Date;
  endDate: Date;
  terminationReason: TerminationReason;
  freeZone?: FreeZone;
}

// Gratuity Calculation Result
export interface GratuityResult {
  totalGratuity: number;
  yearsOfService: number;
  monthsOfService: number;
  daysOfService: number;
  breakdown: GratuityBreakdown[];
  maxGratuityExceeded: boolean;
  entitlementPercentage: number;
  legalReferences: string[];
}

// Gratuity Breakdown by Period
export interface GratuityBreakdown {
  period: string;
  years: number;
  daysPerYear: number;
  dailyRate: number;
  amount: number;
}

// Free Zone Types
export type FreeZone =
  | 'difc'
  | 'adgm'
  | 'jafza'
  | 'dmcc'
  | 'dic'
  | 'dmc'
  | 'dkp'
  | 'dhcc'
  | 'd3'
  | 'dafza'
  | 'dubai_south'
  | 'saif'
  | 'hamriyah'
  | 'shams'
  | 'masdar'
  | 'kizad'
  | 'twofour54'
  | 'rak_ftz'
  | 'ajman_fz'
  | 'fujairah_fz'
  | 'uaq_ftz'
  | 'mainland';

// Emirates
export type Emirate =
  | 'dubai'
  | 'abu-dhabi'
  | 'sharjah'
  | 'ajman'
  | 'ras-al-khaimah'
  | 'fujairah'
  | 'umm-al-quwain';

// Location Types
export type LocationType = 'emirate' | 'area' | 'free-zone' | 'landmark';

// Location Interface
export interface Location {
  id: string;
  name: string;
  slug: string;
  type: LocationType;
  emirate: Emirate;
  parentId?: string;
  description?: string;
  content?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  seo: SEOData;
  faqs?: FAQItem[];
  aeo?: AEOData;
  eeat?: EEATData;
  localSeo?: LocalSEOData;
  status: ContentStatus;
  createdAt: Date;
  updatedAt: Date;
  blocks?: PageBlock[];
}

// SEO Data
export interface SEOData {
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  secondaryKeywords: string[];
  canonicalUrl?: string;
  robots: {
    index: boolean;
    follow: boolean;
  };
  seoScore?: number;
}

// Schema Markup
export interface SchemaMarkup {
  type: SchemaType;
  data: Record<string, unknown>;
  customSchema?: string;
}

export type SchemaType =
  | 'Article'
  | 'FAQPage'
  | 'HowTo'
  | 'BreadcrumbList'
  | 'WebPage'
  | 'Organization'
  | 'LocalBusiness'
  | 'Calculator';

// Social Media Data
export interface SocialData {
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

// FAQ Item
export interface FAQItem {
  question: string;
  answer: string;
}

// AEO (Answer Engine Optimization) Data
export interface AEOData {
  faqItems: FAQItem[];
  paaTargets: string[];
  featuredSnippetType?: 'paragraph' | 'list' | 'table';
  voiceSearchKeywords: string[];
}

// E-E-A-T Data
export interface EEATData {
  authorId?: string;
  authorCredentials?: string;
  citations: Citation[];
  lastReviewed?: Date;
  nextReviewDate?: Date;
  showLastUpdated: boolean;
  showAuthorBox: boolean;
}

export interface Citation {
  title: string;
  url: string;
  source?: string;
}

// Local SEO Data
export interface LocalSEOData {
  locationName: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  serviceRadius?: number;
  localKeywords: string[];
  includeLocalSchema: boolean;
}

// Content Status
export type ContentStatus = 'draft' | 'published' | 'scheduled' | 'archived';

// Page Interface
export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featuredImage?: FeaturedImage;
  status: ContentStatus;
  publishDate?: Date;
  seo: SEOData;
  schema?: SchemaMarkup;
  social?: SocialData;
  aeo?: AEOData;
  eeat?: EEATData;
  localSeo?: LocalSEOData;
  internalLinks?: InternalLinks;
  faqs?: FAQItem[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy?: string;
  blocks?: PageBlock[];
}

// Blog Post Interface
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: FeaturedImage;
  category: string;
  tags: string[];
  authorId: string;
  readingTime: number;
  status: ContentStatus;
  publishedAt?: Date;
  seo: SEOData;
  schema?: SchemaMarkup;
  social?: SocialData;
  aeo?: AEOData;
  eeat?: EEATData;
  internalLinks?: InternalLinks;
  faqs?: FAQItem[];
  series?: string;
  relatedPosts?: string[];
  createdAt: Date;
  updatedAt: Date;
  revisionHistory?: Revision[];
  blocks?: PageBlock[];
}

// Featured Image
export interface FeaturedImage {
  url: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

// Internal Links
export interface InternalLinks {
  outbound: InternalLink[];
  suggestedLinks?: InternalLink[];
}

export interface InternalLink {
  url: string;
  anchor: string;
}

// Revision
export interface Revision {
  content: string;
  timestamp: Date;
  userId: string;
}

// User
export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role: UserRole;
  createdAt: Date;
  lastLoginAt?: Date;
}

export type UserRole = 'admin' | 'editor' | 'viewer';

// Author (for blog posts)
export interface Author {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  credentials?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
  };
}

// Calculation Log
export interface CalculationLog {
  id: string;
  userId?: string;
  input: GratuityInput;
  result: GratuityResult;
  createdAt: Date;
  ipAddress?: string;
  userAgent?: string;
}

// Keyword
export interface Keyword {
  id: string;
  keyword: string;
  volume?: number;
  difficulty?: number;
  cpc?: number;
  assignedTo?: string;
  rankings?: KeywordRanking[];
}

export interface KeywordRanking {
  date: Date;
  position: number;
  url?: string;
}

// Redirect
export interface Redirect {
  id: string;
  from: string;
  to: string;
  type: 301 | 302;
  createdAt: Date;
}

// Global SEO Settings
export interface GlobalSEOSettings {
  organization: {
    name: string;
    logo?: string;
    url: string;
    sameAs: string[];
    contactPoint?: {
      telephone?: string;
      email?: string;
      contactType?: string;
    };
  };
  defaults: {
    robotsMeta: string;
    canonicalBase: string;
    titleSeparator: string;
    titleSuffix: string;
  };
  sitemap: {
    includePages: boolean;
    includeBlogs: boolean;
    includeLocations: boolean;
    excludedUrls: string[];
    defaultPriority: number;
    defaultChangeFreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  };
  analytics: {
    gaId?: string;
    gscProperty?: string;
    fbPixel?: string;
  };
}

// Site Settings
export interface SiteSettings {
  id?: string;
  general: {
    siteName: string;
    siteDescription: string;
    contactEmail: string;
    contactPhone?: string;
    address?: string;
    logoUrl?: string;
    faviconUrl?: string;
  };
  socialLinks: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    youtube?: string;
  };
  footer: {
    copyrightText: string;
    disclaimer?: string;
  };
  updatedAt: Date;
}

// Re-export error types
export * from './errors';
