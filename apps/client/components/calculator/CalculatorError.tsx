'use client';

import { memo } from 'react';
import type { CalculatorError, ErrorSeverity } from '@gratuity/shared/types/errors';

interface CalculatorErrorDisplayProps {
  error: CalculatorError;
  onDismiss?: () => void;
  showSuggestion?: boolean;
}

interface CalculatorWarningsProps {
  warnings: CalculatorError[];
  onDismiss?: (index: number) => void;
}

interface CalculatorErrorListProps {
  errors: CalculatorError[];
  warnings?: CalculatorError[];
  onDismissError?: () => void;
  onDismissWarning?: (index: number) => void;
}

// Severity-based styling
const severityStyles: Record<ErrorSeverity, { bg: string; border: string; text: string; icon: string }> = {
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-800',
    icon: '❌',
  },
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-800',
    icon: '⚠️',
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-800',
    icon: 'ℹ️',
  },
};

/**
 * Single error display component
 */
export const CalculatorErrorDisplay = memo(function CalculatorErrorDisplay({
  error,
  onDismiss,
  showSuggestion = true,
}: CalculatorErrorDisplayProps) {
  const styles = severityStyles[error.severity];

  return (
    <div
      className={`calculator-error ${styles.bg} ${styles.border} ${styles.text} border rounded-lg p-4 mb-3`}
      role="alert"
      aria-live="polite"
    >
      <div className="d-flex align-items-start">
        <span className="error-icon me-2" aria-hidden="true">
          {styles.icon}
        </span>
        <div className="flex-grow-1">
          <div className="error-message fw-medium">{error.message}</div>
          {showSuggestion && error.suggestion && (
            <div className="error-suggestion mt-1 opacity-75 small">
              {error.suggestion}
            </div>
          )}
          {error.details && (
            <div className="error-details mt-1 opacity-50 small font-monospace">
              {error.details}
            </div>
          )}
        </div>
        {onDismiss && (
          <button
            type="button"
            className="btn-close ms-2"
            onClick={onDismiss}
            aria-label="Dismiss error"
          />
        )}
      </div>

      <style jsx>{`
        .calculator-error {
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .error-icon {
          font-size: 1.25rem;
          line-height: 1;
        }

        .btn-close {
          background-size: 0.75rem;
          opacity: 0.5;
        }

        .btn-close:hover {
          opacity: 1;
        }
      `}</style>
    </div>
  );
});

/**
 * Warnings list component
 */
export const CalculatorWarnings = memo(function CalculatorWarnings({
  warnings,
  onDismiss,
}: CalculatorWarningsProps) {
  if (warnings.length === 0) return null;

  return (
    <div className="calculator-warnings" role="status" aria-live="polite">
      {warnings.map((warning, index) => (
        <CalculatorErrorDisplay
          key={`${warning.code}-${index}`}
          error={warning}
          onDismiss={onDismiss ? () => onDismiss(index) : undefined}
          showSuggestion={true}
        />
      ))}
    </div>
  );
});

/**
 * Combined errors and warnings list
 */
export const CalculatorErrorList = memo(function CalculatorErrorList({
  errors,
  warnings = [],
  onDismissError,
  onDismissWarning,
}: CalculatorErrorListProps) {
  if (errors.length === 0 && warnings.length === 0) return null;

  return (
    <div className="calculator-error-list">
      {/* Errors first (more critical) */}
      {errors.map((error, index) => (
        <CalculatorErrorDisplay
          key={`error-${error.code}-${index}`}
          error={error}
          onDismiss={onDismissError}
          showSuggestion={true}
        />
      ))}

      {/* Then warnings */}
      <CalculatorWarnings warnings={warnings} onDismiss={onDismissWarning} />
    </div>
  );
});

/**
 * Inline field error component (for form validation)
 */
export function FieldError({ error }: { error?: CalculatorError }) {
  if (!error) return null;

  return (
    <div className="field-error text-danger small mt-1" role="alert">
      {error.message}
    </div>
  );
}

/**
 * Zero gratuity result component
 */
export function ZeroGratuityMessage({
  reason,
  onLearnMore,
}: {
  reason: string;
  onLearnMore?: () => void;
}) {
  return (
    <div className="zero-gratuity-message bg-light border rounded-lg p-4 text-center">
      <div className="display-icon mb-3" aria-hidden="true">
        💡
      </div>
      <h5 className="mb-2">No Gratuity Entitlement</h5>
      <p className="text-muted mb-3">{reason}</p>
      {onLearnMore && (
        <button
          type="button"
          className="btn btn-outline-primary btn-sm"
          onClick={onLearnMore}
        >
          Learn More About Gratuity Rules
        </button>
      )}

      <style jsx>{`
        .zero-gratuity-message {
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .display-icon {
          font-size: 3rem;
        }
      `}</style>
    </div>
  );
}

/**
 * Retry prompt component for calculation failures
 */
export function CalculationRetryPrompt({
  onRetry,
  onReset,
}: {
  onRetry: () => void;
  onReset?: () => void;
}) {
  return (
    <div className="retry-prompt bg-light border rounded-lg p-4 text-center">
      <div className="display-icon mb-3" aria-hidden="true">
        🔄
      </div>
      <h5 className="mb-2">Calculation Failed</h5>
      <p className="text-muted mb-3">
        We couldn&apos;t complete your calculation. Please check your inputs and try again.
      </p>
      <div className="d-flex justify-content-center gap-2">
        <button type="button" className="btn btn-primary" onClick={onRetry}>
          Try Again
        </button>
        {onReset && (
          <button type="button" className="btn btn-outline-secondary" onClick={onReset}>
            Reset Form
          </button>
        )}
      </div>

      <style jsx>{`
        .retry-prompt {
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .display-icon {
          font-size: 3rem;
        }
      `}</style>
    </div>
  );
}

export default CalculatorErrorDisplay;
