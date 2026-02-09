import type {
  GratuityInput,
  GratuityResult,
  GratuityBreakdown,
  ContractType,
  TerminationReason,
  FreeZone,
} from '../types';
import {
  type CalculatorError,
  type CalculationResultWithError,
  type ValidationResult,
  createCalculatorError,
  GratuityCalculatorError,
  isGratuityCalculatorError,
} from '../types/errors';
import {
  GRATUITY_CONSTANTS,
  RESIGNATION_ENTITLEMENT,
  FREE_ZONE_RULES,
  LEGAL_REFERENCES,
} from '../constants';
import { validateGratuityInput } from '../validators';

/**
 * Calculate the total years, months, and days of service
 */
export function calculateServiceDuration(startDate: Date, endDate: Date) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months--;
    const lastMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += lastMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const totalDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const totalYears = totalDays / 365.25;

  return {
    years,
    months,
    days,
    totalDays,
    totalYears,
  };
}

/**
 * Get the resignation entitlement percentage based on years of service
 */
export function getResignationEntitlement(yearsOfService: number): number {
  if (yearsOfService < 1) {
    return RESIGNATION_ENTITLEMENT.LESS_THAN_1_YEAR;
  } else if (yearsOfService < 3) {
    return RESIGNATION_ENTITLEMENT.BETWEEN_1_AND_3_YEARS;
  } else if (yearsOfService < 5) {
    return RESIGNATION_ENTITLEMENT.BETWEEN_3_AND_5_YEARS;
  } else {
    return RESIGNATION_ENTITLEMENT.MORE_THAN_5_YEARS;
  }
}

/**
 * Calculate daily rate from monthly salary
 */
export function calculateDailyRate(monthlySalary: number): number {
  return monthlySalary / GRATUITY_CONSTANTS.DAYS_PER_MONTH;
}

/**
 * Calculate gratuity for UAE mainland (standard UAE Labor Law)
 */
export function calculateMainlandGratuity(input: GratuityInput): GratuityResult {
  const { basicSalary, startDate, endDate, contractType, terminationReason } = input;

  const duration = calculateServiceDuration(startDate, endDate);
  const dailyRate = calculateDailyRate(basicSalary);

  const breakdown: GratuityBreakdown[] = [];
  let totalGratuity = 0;

  // Check minimum service requirement
  if (duration.totalYears < 1) {
    return {
      totalGratuity: 0,
      yearsOfService: duration.years,
      monthsOfService: duration.months,
      daysOfService: duration.days,
      breakdown: [],
      maxGratuityExceeded: false,
      entitlementPercentage: 0,
      legalReferences: [LEGAL_REFERENCES.UAE_LABOR_LAW, LEGAL_REFERENCES.ARTICLE_51],
    };
  }

  // Calculate gratuity for first 5 years
  const yearsFirst5 = Math.min(duration.totalYears, 5);
  if (yearsFirst5 > 0) {
    const amountFirst5 = dailyRate * GRATUITY_CONSTANTS.DAYS_FIRST_5_YEARS * yearsFirst5;
    breakdown.push({
      period: 'First 5 years',
      years: yearsFirst5,
      daysPerYear: GRATUITY_CONSTANTS.DAYS_FIRST_5_YEARS,
      dailyRate,
      amount: amountFirst5,
    });
    totalGratuity += amountFirst5;
  }

  // Calculate gratuity for years after 5
  const yearsAfter5 = Math.max(0, duration.totalYears - 5);
  if (yearsAfter5 > 0) {
    const amountAfter5 = dailyRate * GRATUITY_CONSTANTS.DAYS_AFTER_5_YEARS * yearsAfter5;
    breakdown.push({
      period: 'After 5 years',
      years: yearsAfter5,
      daysPerYear: GRATUITY_CONSTANTS.DAYS_AFTER_5_YEARS,
      dailyRate,
      amount: amountAfter5,
    });
    totalGratuity += amountAfter5;
  }

  // Apply resignation reduction for unlimited contracts
  let entitlementPercentage = 1;
  if (contractType === 'unlimited' && terminationReason === 'resignation') {
    entitlementPercentage = getResignationEntitlement(duration.totalYears);
    totalGratuity = totalGratuity * entitlementPercentage;
  }

  // Check maximum gratuity limit (2 years' salary)
  const maxGratuity = basicSalary * 12 * GRATUITY_CONSTANTS.MAX_GRATUITY_YEARS;
  const maxGratuityExceeded = totalGratuity > maxGratuity;
  if (maxGratuityExceeded) {
    totalGratuity = maxGratuity;
  }

  return {
    totalGratuity: Math.round(totalGratuity * 100) / 100,
    yearsOfService: duration.years,
    monthsOfService: duration.months,
    daysOfService: duration.days,
    breakdown,
    maxGratuityExceeded,
    entitlementPercentage,
    legalReferences: [
      LEGAL_REFERENCES.UAE_LABOR_LAW,
      LEGAL_REFERENCES.ARTICLE_51,
      LEGAL_REFERENCES.ARTICLE_52,
      ...(terminationReason === 'resignation' ? [LEGAL_REFERENCES.ARTICLE_53] : []),
    ],
  };
}

/**
 * Calculate gratuity for DIFC employees
 * DIFC uses a different calculation: 21 days for all years
 */
export function calculateDIFCGratuity(input: GratuityInput): GratuityResult {
  const { basicSalary, startDate, endDate } = input;

  const duration = calculateServiceDuration(startDate, endDate);
  const dailyRate = calculateDailyRate(basicSalary);

  // DIFC: 21 days' salary for each year of service (no tiered system)
  const totalGratuity = dailyRate * 21 * duration.totalYears;

  const breakdown: GratuityBreakdown[] = [
    {
      period: 'All years (DIFC)',
      years: duration.totalYears,
      daysPerYear: 21,
      dailyRate,
      amount: totalGratuity,
    },
  ];

  // Check maximum gratuity limit
  const maxGratuity = basicSalary * 12 * GRATUITY_CONSTANTS.MAX_GRATUITY_YEARS;
  const maxGratuityExceeded = totalGratuity > maxGratuity;

  return {
    totalGratuity: Math.round(Math.min(totalGratuity, maxGratuity) * 100) / 100,
    yearsOfService: duration.years,
    monthsOfService: duration.months,
    daysOfService: duration.days,
    breakdown,
    maxGratuityExceeded,
    entitlementPercentage: 1,
    legalReferences: [LEGAL_REFERENCES.DIFC_EMPLOYMENT_LAW],
  };
}

/**
 * Main gratuity calculation function
 */
export function calculateGratuity(input: GratuityInput): GratuityResult {
  const freeZone = input.freeZone || 'mainland';

  // Check for special free zone rules
  if (freeZone === 'difc') {
    return calculateDIFCGratuity(input);
  }

  if (freeZone === 'adgm') {
    // ADGM follows similar rules to DIFC
    return calculateDIFCGratuity(input);
  }

  // Default to mainland calculation
  return calculateMainlandGratuity(input);
}

/**
 * Format currency in AED
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: 'AED',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format date in readable format
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-AE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

/**
 * Generate URL slug from text
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Calculate reading time for content
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

/**
 * Strip HTML tags from content
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

/**
 * Get free zone info
 */
export function getFreeZoneInfo(freeZoneCode: string) {
  return FREE_ZONE_RULES[freeZoneCode] || FREE_ZONE_RULES.mainland;
}

/**
 * Check if date is valid
 */
export function isValidDate(date: unknown): date is Date {
  return date instanceof Date && !isNaN(date.getTime());
}

/**
 * Parse date string to Date object
 */
export function parseDate(dateString: string): Date | null {
  const date = new Date(dateString);
  return isValidDate(date) ? date : null;
}

// ============================================================================
// SAFE CALCULATION WITH ERROR HANDLING
// ============================================================================

/**
 * Safe gratuity calculation with comprehensive error handling
 * Returns a result object with success status, data, errors, and warnings
 */
export function calculateGratuitySafe(
  input: Partial<GratuityInput>
): CalculationResultWithError<GratuityResult> {
  const warnings: CalculatorError[] = [];

  try {
    // Step 1: Validate input
    const validation = validateGratuityInput(input);

    if (!validation.isValid) {
      return {
        success: false,
        error: validation.errors[0],
        warnings: validation.warnings,
      };
    }

    // Collect warnings
    warnings.push(...validation.warnings);

    // Step 2: Ensure all required fields are present (type safety)
    const safeInput: GratuityInput = {
      contractType: input.contractType as 'unlimited' | 'limited',
      basicSalary: input.basicSalary as number,
      startDate: input.startDate instanceof Date
        ? input.startDate
        : new Date(input.startDate as unknown as string),
      endDate: input.endDate instanceof Date
        ? input.endDate
        : new Date(input.endDate as unknown as string),
      terminationReason: input.terminationReason as 'resignation' | 'termination' | 'contract_end' | 'mutual_agreement',
      freeZone: (input.freeZone || 'mainland') as FreeZone,
    };

    // Step 3: Perform calculation
    const result = calculateGratuity(safeInput);

    // Step 4: Validate result
    if (!Number.isFinite(result.totalGratuity)) {
      return {
        success: false,
        error: createCalculatorError('CALCULATION_OVERFLOW'),
        warnings,
      };
    }

    // Step 5: Add informational warnings for edge cases
    if (result.totalGratuity === 0 && result.entitlementPercentage === 0) {
      warnings.push({
        code: 'INSUFFICIENT_SERVICE',
        message: 'No gratuity entitlement for service less than 1 year.',
        severity: 'info',
        suggestion: 'Gratuity is only payable after completing at least 1 year of continuous service.',
      });
    }

    if (result.maxGratuityExceeded) {
      warnings.push({
        code: 'CALCULATION_OVERFLOW',
        message: 'Gratuity capped at maximum limit.',
        severity: 'info',
        suggestion: 'Maximum gratuity is limited to 2 years\' total salary as per UAE Labor Law.',
      });
    }

    return {
      success: true,
      data: result,
      warnings,
    };
  } catch (error) {
    // Handle known calculator errors
    if (isGratuityCalculatorError(error)) {
      return {
        success: false,
        error: error.toCalculatorError(),
        warnings,
      };
    }

    // Handle unexpected errors
    console.error('Gratuity calculation failed:', error);
    return {
      success: false,
      error: createCalculatorError('CALCULATION_FAILED', {
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      warnings,
    };
  }
}

/**
 * Calculate gratuity for ADGM employees
 * ADGM follows similar rules to DIFC but with some variations
 */
export function calculateADGMGratuity(input: GratuityInput): GratuityResult {
  const { basicSalary, startDate, endDate, terminationReason } = input;

  const duration = calculateServiceDuration(startDate, endDate);
  const dailyRate = calculateDailyRate(basicSalary);

  // ADGM: Similar to DIFC, but with minor variations
  // Using 21 days per year as base
  let totalGratuity = dailyRate * 21 * duration.totalYears;

  const breakdown: GratuityBreakdown[] = [
    {
      period: 'All years (ADGM)',
      years: duration.totalYears,
      daysPerYear: 21,
      dailyRate,
      amount: totalGratuity,
    },
  ];

  // ADGM may have different resignation rules - applying standard for now
  let entitlementPercentage = 1;
  if (terminationReason === 'resignation' && duration.totalYears < 5) {
    // ADGM has more generous rules for resignation
    entitlementPercentage = duration.totalYears < 1 ? 0 : 1;
    totalGratuity = totalGratuity * entitlementPercentage;
  }

  // Check maximum gratuity limit
  const maxGratuity = basicSalary * 12 * GRATUITY_CONSTANTS.MAX_GRATUITY_YEARS;
  const maxGratuityExceeded = totalGratuity > maxGratuity;

  return {
    totalGratuity: Math.round(Math.min(totalGratuity, maxGratuity) * 100) / 100,
    yearsOfService: duration.years,
    monthsOfService: duration.months,
    daysOfService: duration.days,
    breakdown,
    maxGratuityExceeded,
    entitlementPercentage,
    legalReferences: [LEGAL_REFERENCES.ADGM_EMPLOYMENT_REGULATIONS],
  };
}

/**
 * Get a user-friendly error message from any error
 */
export function getErrorMessage(error: unknown): string {
  if (isGratuityCalculatorError(error)) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'An unexpected error occurred. Please try again.';
}

/**
 * Get error suggestion from any error
 */
export function getErrorSuggestion(error: unknown): string | undefined {
  if (isGratuityCalculatorError(error)) {
    return error.suggestion;
  }

  return undefined;
}

/**
 * Create a fallback result for display purposes when calculation fails
 */
export function createFallbackResult(): GratuityResult {
  return {
    totalGratuity: 0,
    yearsOfService: 0,
    monthsOfService: 0,
    daysOfService: 0,
    breakdown: [],
    maxGratuityExceeded: false,
    entitlementPercentage: 0,
    legalReferences: [],
  };
}

/**
 * Check if a calculation result indicates zero gratuity (but valid calculation)
 */
export function isZeroGratuityResult(result: GratuityResult): boolean {
  return result.totalGratuity === 0 && result.entitlementPercentage === 0;
}

/**
 * Get reason for zero gratuity
 */
export function getZeroGratuityReason(
  input: GratuityInput,
  result: GratuityResult
): string {
  const duration = calculateServiceDuration(input.startDate, input.endDate);

  if (duration.totalYears < 1) {
    return 'Service period is less than 1 year. Minimum 1 year of continuous service is required for gratuity eligibility.';
  }

  if (input.contractType === 'unlimited' && input.terminationReason === 'resignation') {
    if (duration.totalYears < 1) {
      return 'Resigning before completing 1 year of service means no gratuity entitlement for unlimited contracts.';
    }
  }

  return 'Based on the provided information, no gratuity is payable.';
}

/**
 * Project gratuity into the future
 */
export function projectGratuity(
  input: GratuityInput,
  additionalYears: number
): GratuityResult {
  const projectedEndDate = new Date(input.endDate);
  projectedEndDate.setFullYear(projectedEndDate.getFullYear() + additionalYears);

  return calculateGratuity({
    ...input,
    endDate: projectedEndDate,
  });
}

// Re-export error utilities for convenience
export {
  createCalculatorError,
  GratuityCalculatorError,
  isGratuityCalculatorError,
};
