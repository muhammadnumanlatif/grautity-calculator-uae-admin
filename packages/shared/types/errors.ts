export interface APIError {
  statusCode: number;
  message: string;
  code?: string;
  details?: unknown;
}

export interface ClientError {
  type: 'network' | 'data' | 'unauthorized' | 'notFound' | 'unknown';
  message: string;
  originalError?: unknown;
}

/**
 * Calculator Error Types
 * Comprehensive error handling for gratuity calculator edge cases
 */

// Error codes for categorization and i18n support
export type CalculatorErrorCode =
  // Input validation errors
  | 'INVALID_SALARY'
  | 'SALARY_TOO_LOW'
  | 'SALARY_TOO_HIGH'
  | 'SALARY_NEGATIVE'
  | 'SALARY_NOT_NUMBER'
  // Date errors
  | 'INVALID_START_DATE'
  | 'INVALID_END_DATE'
  | 'END_DATE_BEFORE_START'
  | 'FUTURE_START_DATE'
  | 'DATE_TOO_OLD'
  | 'DATE_RANGE_TOO_LONG'
  // Service period errors
  | 'INSUFFICIENT_SERVICE'
  | 'SERVICE_LESS_THAN_DAY'
  // Contract/Termination errors
  | 'INVALID_CONTRACT_TYPE'
  | 'INVALID_TERMINATION_REASON'
  | 'INVALID_FREE_ZONE'
  // Calculation errors
  | 'CALCULATION_OVERFLOW'
  | 'CALCULATION_FAILED'
  | 'UNEXPECTED_ERROR'
  // Free zone specific errors
  | 'FREE_ZONE_RULES_UNAVAILABLE'
  | 'DIFC_SPECIFIC_ERROR'
  | 'ADGM_SPECIFIC_ERROR';

// Error severity levels
export type ErrorSeverity = 'error' | 'warning' | 'info';

// Calculator error interface
export interface CalculatorError {
  code: CalculatorErrorCode;
  message: string;
  severity: ErrorSeverity;
  field?: string; // Which input field caused the error
  details?: string; // Additional context
  suggestion?: string; // How to fix the error
}

// Calculation result with error handling
export interface CalculationResultWithError<T> {
  success: boolean;
  data?: T;
  error?: CalculatorError;
  warnings?: CalculatorError[];
}

// Validation result
export interface ValidationResult {
  isValid: boolean;
  errors: CalculatorError[];
  warnings: CalculatorError[];
}

// Error messages mapping
export const ERROR_MESSAGES: Record<CalculatorErrorCode, { message: string; suggestion: string }> = {
  // Salary errors
  INVALID_SALARY: {
    message: 'Please enter a valid salary amount.',
    suggestion: 'Enter your monthly basic salary in AED (numbers only).',
  },
  SALARY_TOO_LOW: {
    message: 'Salary amount seems too low.',
    suggestion: 'The minimum wage in UAE is approximately AED 1,000. Please verify your basic salary.',
  },
  SALARY_TOO_HIGH: {
    message: 'Salary amount exceeds reasonable limits.',
    suggestion: 'Please enter a salary up to AED 1,000,000 per month.',
  },
  SALARY_NEGATIVE: {
    message: 'Salary cannot be negative.',
    suggestion: 'Enter a positive salary amount.',
  },
  SALARY_NOT_NUMBER: {
    message: 'Salary must be a valid number.',
    suggestion: 'Remove any letters or special characters from the salary field.',
  },

  // Date errors
  INVALID_START_DATE: {
    message: 'Please enter a valid start date.',
    suggestion: 'Select the date when you started your employment.',
  },
  INVALID_END_DATE: {
    message: 'Please enter a valid end date.',
    suggestion: 'Select your last working day or expected end date.',
  },
  END_DATE_BEFORE_START: {
    message: 'End date cannot be before start date.',
    suggestion: 'Make sure your end date is after your start date.',
  },
  FUTURE_START_DATE: {
    message: 'Start date cannot be in the future.',
    suggestion: 'Enter a start date that is today or in the past.',
  },
  DATE_TOO_OLD: {
    message: 'Date is too far in the past.',
    suggestion: 'UAE Labor Law applies from 1980 onwards. Please verify your dates.',
  },
  DATE_RANGE_TOO_LONG: {
    message: 'Employment period exceeds 50 years.',
    suggestion: 'Please verify your start and end dates are correct.',
  },

  // Service period errors
  INSUFFICIENT_SERVICE: {
    message: 'Minimum 1 year of service required for gratuity.',
    suggestion: 'You must complete at least 1 year of continuous service to be eligible for gratuity.',
  },
  SERVICE_LESS_THAN_DAY: {
    message: 'Service period is less than one day.',
    suggestion: 'The end date must be at least one day after the start date.',
  },

  // Contract/Termination errors
  INVALID_CONTRACT_TYPE: {
    message: 'Please select a valid contract type.',
    suggestion: 'Choose either "Unlimited Contract" or "Limited Contract".',
  },
  INVALID_TERMINATION_REASON: {
    message: 'Please select a reason for leaving.',
    suggestion: 'Select how your employment ended (resignation, termination, etc.).',
  },
  INVALID_FREE_ZONE: {
    message: 'Selected free zone is not recognized.',
    suggestion: 'Select a valid work location from the dropdown.',
  },

  // Calculation errors
  CALCULATION_OVERFLOW: {
    message: 'Calculation resulted in an unusually large number.',
    suggestion: 'Please verify your salary and dates are correct.',
  },
  CALCULATION_FAILED: {
    message: 'Unable to complete the calculation.',
    suggestion: 'Please refresh the page and try again. If the problem persists, contact support.',
  },
  UNEXPECTED_ERROR: {
    message: 'An unexpected error occurred.',
    suggestion: 'Please refresh the page and try again.',
  },

  // Free zone errors
  FREE_ZONE_RULES_UNAVAILABLE: {
    message: 'Rules for this free zone are not available.',
    suggestion: 'Standard UAE Labor Law rules will be applied. Consult your HR for specific free zone rules.',
  },
  DIFC_SPECIFIC_ERROR: {
    message: 'Error calculating DIFC gratuity.',
    suggestion: 'DIFC has special employment laws. Please consult DIFC regulations or your employer.',
  },
  ADGM_SPECIFIC_ERROR: {
    message: 'Error calculating ADGM gratuity.',
    suggestion: 'ADGM follows different regulations. Please consult ADGM employment rules or your employer.',
  },
};

// Helper function to create a CalculatorError
export function createCalculatorError(
  code: CalculatorErrorCode,
  overrides?: Partial<CalculatorError>
): CalculatorError {
  const defaultError = ERROR_MESSAGES[code];
  return {
    code,
    message: overrides?.message ?? defaultError.message,
    suggestion: overrides?.suggestion ?? defaultError.suggestion,
    severity: overrides?.severity ?? 'error',
    field: overrides?.field,
    details: overrides?.details,
  };
}

// Custom error class for calculator errors
export class GratuityCalculatorError extends Error {
  public readonly code: CalculatorErrorCode;
  public readonly severity: ErrorSeverity;
  public readonly field?: string;
  public readonly suggestion?: string;
  public readonly details?: string;

  constructor(error: CalculatorError) {
    super(error.message);
    this.name = 'GratuityCalculatorError';
    this.code = error.code;
    this.severity = error.severity;
    this.field = error.field;
    this.suggestion = error.suggestion;
    this.details = error.details;

    // Maintains proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, GratuityCalculatorError);
    }
  }

  toCalculatorError(): CalculatorError {
    return {
      code: this.code,
      message: this.message,
      severity: this.severity,
      field: this.field,
      suggestion: this.suggestion,
      details: this.details,
    };
  }
}

// Type guard to check if an error is a GratuityCalculatorError
export function isGratuityCalculatorError(error: unknown): error is GratuityCalculatorError {
  return error instanceof GratuityCalculatorError;
}
