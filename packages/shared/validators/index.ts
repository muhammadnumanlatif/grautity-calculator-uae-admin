import { z } from 'zod';

// Gratuity Calculation Schema
export const gratuityInputSchema = z.object({
  contractType: z.enum(['unlimited', 'limited']),
  basicSalary: z.number().min(1, 'Basic salary must be greater than 0'),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  terminationReason: z.enum(['resignation', 'termination', 'contract_end', 'mutual_agreement']),
  freeZone: z.enum([
    'difc', 'adgm', 'jafza', 'dmcc', 'dic', 'dmc', 'dkp', 'dhcc', 'd3', 'dafza',
    'dubai_south', 'saif', 'hamriyah', 'shams', 'masdar', 'kizad', 'twofour54',
    'rak_ftz', 'ajman_fz', 'fujairah_fz', 'uaq_ftz', 'mainland'
  ]).optional().default('mainland'),
}).refine((data) => data.endDate > data.startDate, {
  message: 'End date must be after start date',
  path: ['endDate'],
});

// SEO Data Schema
export const seoDataSchema = z.object({
  metaTitle: z.string().min(1).max(70),
  metaDescription: z.string().min(1).max(170),
  focusKeyword: z.string().min(1),
  secondaryKeywords: z.array(z.string()).max(5).default([]),
  canonicalUrl: z.string().url().optional(),
  robots: z.object({
    index: z.boolean().default(true),
    follow: z.boolean().default(true),
  }).default({ index: true, follow: true }),
  seoScore: z.number().min(0).max(100).optional(),
});

// FAQ Item Schema
export const faqItemSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

// Citation Schema
export const citationSchema = z.object({
  title: z.string().min(1),
  url: z.string().url(),
  source: z.string().optional(),
});

// Social Data Schema
export const socialDataSchema = z.object({
  ogTitle: z.string().max(60).optional(),
  ogDescription: z.string().max(200).optional(),
  ogImage: z.string().url().optional(),
  twitterCard: z.enum(['summary', 'summary_large_image']).optional(),
  twitterTitle: z.string().max(70).optional(),
  twitterDescription: z.string().max(200).optional(),
  twitterImage: z.string().url().optional(),
});

// AEO Data Schema
export const aeoDataSchema = z.object({
  faqItems: z.array(faqItemSchema).default([]),
  paaTargets: z.array(z.string()).default([]),
  featuredSnippetType: z.enum(['paragraph', 'list', 'table']).optional(),
  voiceSearchKeywords: z.array(z.string()).default([]),
});

// E-E-A-T Data Schema
export const eeatDataSchema = z.object({
  authorId: z.string().optional(),
  authorCredentials: z.string().optional(),
  citations: z.array(citationSchema).default([]),
  lastReviewed: z.coerce.date().optional(),
  nextReviewDate: z.coerce.date().optional(),
  showLastUpdated: z.boolean().default(true),
  showAuthorBox: z.boolean().default(true),
});

// Local SEO Data Schema
export const localSeoDataSchema = z.object({
  locationName: z.string().min(1),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number(),
  }).optional(),
  serviceRadius: z.number().min(0).optional(),
  localKeywords: z.array(z.string()).default([]),
  includeLocalSchema: z.boolean().default(true),
});

// Featured Image Schema
export const featuredImageSchema = z.object({
  url: z.string().url(),
  alt: z.string().min(1),
  caption: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});

// Internal Link Schema
export const internalLinkSchema = z.object({
  url: z.string(),
  anchor: z.string(),
});

// Page Schema
export const pageSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  content: z.string().min(1),
  excerpt: z.string().max(300).optional(),
  featuredImage: featuredImageSchema.optional(),
  status: z.enum(['draft', 'published', 'scheduled', 'archived']).default('draft'),
  publishDate: z.coerce.date().optional(),
  seo: seoDataSchema,
  social: socialDataSchema.optional(),
  aeo: aeoDataSchema.optional(),
  eeat: eeatDataSchema.optional(),
  localSeo: localSeoDataSchema.optional(),
});

// Blog Post Schema
export const blogPostSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  excerpt: z.string().min(1).max(300),
  content: z.string().min(1),
  featuredImage: featuredImageSchema.optional(),
  category: z.string().min(1),
  tags: z.array(z.string()).default([]),
  authorId: z.string().min(1),
  status: z.enum(['draft', 'published', 'scheduled', 'archived']).default('draft'),
  publishedAt: z.coerce.date().optional(),
  seo: seoDataSchema,
  social: socialDataSchema.optional(),
  aeo: aeoDataSchema.optional(),
  eeat: eeatDataSchema.optional(),
  series: z.string().optional(),
  relatedPosts: z.array(z.string()).default([]),
});

// Location Schema
export const locationSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  type: z.enum(['emirate', 'area', 'free-zone', 'landmark']),
  emirate: z.enum(['dubai', 'abu-dhabi', 'sharjah', 'ajman', 'ras-al-khaimah', 'fujairah', 'umm-al-quwain']),
  parentId: z.string().optional(),
  description: z.string().optional(),
  content: z.string().optional(),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number(),
  }).optional(),
  seo: seoDataSchema,
  status: z.enum(['draft', 'published', 'scheduled', 'archived']).default('draft'),
});

// Author Schema
export const authorSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  bio: z.string().max(500).optional(),
  avatar: z.string().url().optional(),
  credentials: z.string().optional(),
  socialLinks: z.object({
    linkedin: z.string().url().optional(),
    twitter: z.string().url().optional(),
  }).optional(),
});

// Redirect Schema
export const redirectSchema = z.object({
  from: z.string().min(1).startsWith('/'),
  to: z.string().min(1),
  type: z.union([z.literal(301), z.literal(302)]),
});

// Keyword Schema
export const keywordSchema = z.object({
  keyword: z.string().min(1),
  volume: z.number().min(0).optional(),
  difficulty: z.number().min(0).max(100).optional(),
  cpc: z.number().min(0).optional(),
  assignedTo: z.string().optional(),
});

// Contact Form Schema
export const contactFormSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  subject: z.string().min(1).max(200),
  message: z.string().min(10).max(2000),
});

// Newsletter Subscription Schema
export const newsletterSchema = z.object({
  email: z.string().email(),
});

// Export types from schemas
export type GratuityInputData = z.infer<typeof gratuityInputSchema>;
export type ValidatedSEOData = z.infer<typeof seoDataSchema>;
export type PageData = z.infer<typeof pageSchema>;
export type BlogPostData = z.infer<typeof blogPostSchema>;
export type LocationData = z.infer<typeof locationSchema>;
export type AuthorData = z.infer<typeof authorSchema>;
export type RedirectData = z.infer<typeof redirectSchema>;
export type KeywordData = z.infer<typeof keywordSchema>;
export type ContactFormData = z.infer<typeof contactFormSchema>;

// ============================================================================
// COMPREHENSIVE GRATUITY VALIDATOR WITH EDGE CASE HANDLING
// ============================================================================

import type { GratuityInput, FreeZone } from '../types';
import {
  type CalculatorError,
  type ValidationResult,
  createCalculatorError,
} from '../types/errors';

// Validation constants
export const VALIDATION_CONSTANTS = {
  MIN_SALARY: 100, // Minimum realistic salary in AED
  MAX_SALARY: 1_000_000, // Maximum reasonable monthly salary
  MIN_DATE_YEAR: 1980, // UAE Labor Law historical limit
  MAX_SERVICE_YEARS: 50, // Maximum reasonable service period
  WARNING_SALARY_LOW: 1000, // Warning threshold for low salary
  WARNING_SALARY_HIGH: 500_000, // Warning threshold for high salary
};

// Valid free zone codes
const VALID_FREE_ZONES: FreeZone[] = [
  'difc', 'adgm', 'jafza', 'dmcc', 'dic', 'dmc', 'dkp', 'dhcc', 'd3', 'dafza',
  'dubai_south', 'saif', 'hamriyah', 'shams', 'masdar', 'kizad', 'twofour54',
  'rak_ftz', 'ajman_fz', 'fujairah_fz', 'uaq_ftz', 'mainland'
];

/**
 * Comprehensive gratuity input validator with edge case handling
 */
export function validateGratuityInput(input: Partial<GratuityInput>): ValidationResult {
  const errors: CalculatorError[] = [];
  const warnings: CalculatorError[] = [];

  // ========== SALARY VALIDATION ==========
  const salaryValidation = validateSalary(input.basicSalary);
  errors.push(...salaryValidation.errors);
  warnings.push(...salaryValidation.warnings);

  // ========== DATE VALIDATION ==========
  const dateValidation = validateDates(input.startDate, input.endDate);
  errors.push(...dateValidation.errors);
  warnings.push(...dateValidation.warnings);

  // ========== CONTRACT TYPE VALIDATION ==========
  if (!input.contractType || !['unlimited', 'limited'].includes(input.contractType)) {
    errors.push(createCalculatorError('INVALID_CONTRACT_TYPE', { field: 'contractType' }));
  }

  // ========== TERMINATION REASON VALIDATION ==========
  const validReasons = ['resignation', 'termination', 'contract_end', 'mutual_agreement'];
  if (!input.terminationReason || !validReasons.includes(input.terminationReason)) {
    errors.push(createCalculatorError('INVALID_TERMINATION_REASON', { field: 'terminationReason' }));
  }

  // ========== FREE ZONE VALIDATION ==========
  if (input.freeZone && !VALID_FREE_ZONES.includes(input.freeZone)) {
    errors.push(createCalculatorError('INVALID_FREE_ZONE', { field: 'freeZone' }));
  }

  // ========== EDGE CASE: SERVICE PERIOD ==========
  if (dateValidation.errors.length === 0 && input.startDate && input.endDate) {
    const serviceDays = Math.floor(
      (input.endDate.getTime() - input.startDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (serviceDays < 1) {
      errors.push(createCalculatorError('SERVICE_LESS_THAN_DAY', { field: 'endDate' }));
    } else if (serviceDays < 365) {
      // Not an error, but inform about eligibility
      warnings.push({
        code: 'INSUFFICIENT_SERVICE',
        message: 'Less than 1 year of service detected.',
        severity: 'warning',
        field: 'endDate',
        suggestion: 'You need at least 1 year of continuous service to be eligible for gratuity. Current service period will result in zero gratuity.',
      });
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate salary input with edge cases
 */
function validateSalary(salary: unknown): { errors: CalculatorError[]; warnings: CalculatorError[] } {
  const errors: CalculatorError[] = [];
  const warnings: CalculatorError[] = [];

  // Check if salary is provided
  if (salary === undefined || salary === null || salary === '') {
    errors.push(createCalculatorError('INVALID_SALARY', { field: 'basicSalary' }));
    return { errors, warnings };
  }

  // Check if salary is a valid number
  const numSalary = typeof salary === 'string' ? parseFloat(salary) : salary;

  if (typeof numSalary !== 'number' || isNaN(numSalary)) {
    errors.push(createCalculatorError('SALARY_NOT_NUMBER', { field: 'basicSalary' }));
    return { errors, warnings };
  }

  // Check for negative salary
  if (numSalary < 0) {
    errors.push(createCalculatorError('SALARY_NEGATIVE', { field: 'basicSalary' }));
    return { errors, warnings };
  }

  // Check for zero salary
  if (numSalary === 0) {
    errors.push(createCalculatorError('INVALID_SALARY', {
      field: 'basicSalary',
      message: 'Salary cannot be zero.',
      suggestion: 'Enter your monthly basic salary (excluding allowances).',
    }));
    return { errors, warnings };
  }

  // Check for unreasonably low salary
  if (numSalary < VALIDATION_CONSTANTS.MIN_SALARY) {
    errors.push(createCalculatorError('SALARY_TOO_LOW', {
      field: 'basicSalary',
      details: `Entered: AED ${numSalary}`,
    }));
    return { errors, warnings };
  }

  // Check for unreasonably high salary
  if (numSalary > VALIDATION_CONSTANTS.MAX_SALARY) {
    errors.push(createCalculatorError('SALARY_TOO_HIGH', {
      field: 'basicSalary',
      details: `Entered: AED ${numSalary.toLocaleString()}`,
    }));
    return { errors, warnings };
  }

  // Warning for potentially low salary
  if (numSalary < VALIDATION_CONSTANTS.WARNING_SALARY_LOW) {
    warnings.push({
      code: 'SALARY_TOO_LOW',
      message: 'Salary seems lower than average.',
      severity: 'warning',
      field: 'basicSalary',
      suggestion: `AED ${numSalary} is below the typical UAE minimum wage. Please verify this is your basic salary only.`,
    });
  }

  // Warning for very high salary (not an error, just verification)
  if (numSalary > VALIDATION_CONSTANTS.WARNING_SALARY_HIGH) {
    warnings.push({
      code: 'SALARY_TOO_HIGH',
      message: 'High salary detected.',
      severity: 'info',
      field: 'basicSalary',
      suggestion: `Please verify AED ${numSalary.toLocaleString()} is your basic monthly salary (not annual).`,
    });
  }

  // Check for decimal precision issues
  if (!Number.isFinite(numSalary)) {
    errors.push(createCalculatorError('INVALID_SALARY', {
      field: 'basicSalary',
      message: 'Invalid salary value.',
    }));
  }

  return { errors, warnings };
}

/**
 * Validate date inputs with edge cases
 */
function validateDates(
  startDate: unknown,
  endDate: unknown
): { errors: CalculatorError[]; warnings: CalculatorError[] } {
  const errors: CalculatorError[] = [];
  const warnings: CalculatorError[] = [];

  const now = new Date();
  const minDate = new Date(VALIDATION_CONSTANTS.MIN_DATE_YEAR, 0, 1);

  // Parse start date
  let parsedStartDate: Date | null = null;
  if (!startDate) {
    errors.push(createCalculatorError('INVALID_START_DATE', { field: 'startDate' }));
  } else {
    parsedStartDate = startDate instanceof Date ? startDate : new Date(startDate as string);
    if (isNaN(parsedStartDate.getTime())) {
      errors.push(createCalculatorError('INVALID_START_DATE', { field: 'startDate' }));
      parsedStartDate = null;
    }
  }

  // Parse end date
  let parsedEndDate: Date | null = null;
  if (!endDate) {
    errors.push(createCalculatorError('INVALID_END_DATE', { field: 'endDate' }));
  } else {
    parsedEndDate = endDate instanceof Date ? endDate : new Date(endDate as string);
    if (isNaN(parsedEndDate.getTime())) {
      errors.push(createCalculatorError('INVALID_END_DATE', { field: 'endDate' }));
      parsedEndDate = null;
    }
  }

  // If both dates are valid, perform additional checks
  if (parsedStartDate && parsedEndDate) {
    // Check if end date is before start date
    if (parsedEndDate < parsedStartDate) {
      errors.push(createCalculatorError('END_DATE_BEFORE_START', { field: 'endDate' }));
    }

    // Check if start date is in the future
    if (parsedStartDate > now) {
      errors.push(createCalculatorError('FUTURE_START_DATE', { field: 'startDate' }));
    }

    // Check if dates are too old
    if (parsedStartDate < minDate) {
      errors.push(createCalculatorError('DATE_TOO_OLD', {
        field: 'startDate',
        details: `Dates before ${VALIDATION_CONSTANTS.MIN_DATE_YEAR} are not supported.`,
      }));
    }

    // Check for unreasonably long service period
    const yearsOfService = (parsedEndDate.getTime() - parsedStartDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
    if (yearsOfService > VALIDATION_CONSTANTS.MAX_SERVICE_YEARS) {
      errors.push(createCalculatorError('DATE_RANGE_TOO_LONG', {
        field: 'endDate',
        details: `Service period: ${Math.floor(yearsOfService)} years`,
      }));
    }

    // Warning for future end date (allowed but flag it)
    if (parsedEndDate > now) {
      warnings.push({
        code: 'INVALID_END_DATE',
        message: 'End date is in the future.',
        severity: 'info',
        field: 'endDate',
        suggestion: 'This calculation assumes you will work until the specified end date.',
      });
    }
  }

  return { errors, warnings };
}

/**
 * Validate and sanitize gratuity input
 * Returns sanitized input if valid, throws if invalid
 */
export function sanitizeGratuityInput(input: Partial<GratuityInput>): GratuityInput {
  const validation = validateGratuityInput(input);

  if (!validation.isValid) {
    const firstError = validation.errors[0];
    throw new Error(firstError.message);
  }

  // Sanitize and return
  return {
    contractType: input.contractType as 'unlimited' | 'limited',
    basicSalary: Math.round((input.basicSalary as number) * 100) / 100, // Round to 2 decimal places
    startDate: input.startDate instanceof Date ? input.startDate : new Date(input.startDate as unknown as string),
    endDate: input.endDate instanceof Date ? input.endDate : new Date(input.endDate as unknown as string),
    terminationReason: input.terminationReason as 'resignation' | 'termination' | 'contract_end' | 'mutual_agreement',
    freeZone: (input.freeZone || 'mainland') as FreeZone,
  };
}

/**
 * Quick validation check (returns boolean)
 */
export function isValidGratuityInput(input: Partial<GratuityInput>): boolean {
  return validateGratuityInput(input).isValid;
}
