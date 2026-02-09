'use client';

import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  gratuityInputSchema,
  type GratuityInputData,
  validateGratuityInput,
} from '@gratuity/shared/validators';
import {
  calculateGratuitySafe,
  formatCurrency,
  getZeroGratuityReason,
  isZeroGratuityResult,
} from '@gratuity/shared/utils';
import type {
  GratuityResult,
  ContractType,
  TerminationReason,
  FreeZone,
  GratuityInput,
} from '@gratuity/shared/types';
import type { CalculatorError } from '@gratuity/shared/types/errors';
import {
  DUBAI_FREE_ZONES,
  ABU_DHABI_FREE_ZONES,
  SHARJAH_FREE_ZONES,
} from '@gratuity/shared/constants';
import CalculatorErrorBoundary from './CalculatorErrorBoundary';
import {
  CalculatorErrorDisplay,
  CalculatorWarnings,
  ZeroGratuityMessage,
  CalculationRetryPrompt,
} from './CalculatorError';
import CalculatorExpertFeatures from './CalculatorExpertFeatures';

interface GratuityCalculatorProps {
  defaultContractType?: ContractType;
  showFreeZone?: boolean;
  onCalculationComplete?: (result: GratuityResult) => void;
  onCalculationError?: (error: CalculatorError) => void;
}

function GratuityCalculatorInner({
  defaultContractType = 'unlimited',
  showFreeZone = true,
  onCalculationComplete,
  onCalculationError,
}: GratuityCalculatorProps) {
  const [result, setResult] = useState<GratuityResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationError, setCalculationError] = useState<CalculatorError | null>(null);
  const [warnings, setWarnings] = useState<CalculatorError[]>([]);
  const [showRetryPrompt, setShowRetryPrompt] = useState(false);
  const [lastInput, setLastInput] = useState<GratuityInput | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<GratuityInputData>({
    resolver: zodResolver(gratuityInputSchema),
    defaultValues: {
      contractType: defaultContractType,
      terminationReason: 'resignation',
      freeZone: 'mainland',
    },
  });

  const contractType = watch('contractType');
  const terminationReason = watch('terminationReason');

  const allFreeZones = [
    ...DUBAI_FREE_ZONES,
    ...ABU_DHABI_FREE_ZONES,
    ...SHARJAH_FREE_ZONES,
  ];

  // Clear error when user starts typing
  const clearError = useCallback(() => {
    if (calculationError) {
      setCalculationError(null);
    }
    if (showRetryPrompt) {
      setShowRetryPrompt(false);
    }
  }, [calculationError, showRetryPrompt]);

  // Dismiss specific warning
  const dismissWarning = useCallback((index: number) => {
    setWarnings((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // Reset form and state
  const handleReset = useCallback(() => {
    reset();
    setResult(null);
    setCalculationError(null);
    setWarnings([]);
    setShowRetryPrompt(false);
  }, [reset]);

  // Main calculation handler
  const onSubmit = async (data: GratuityInputData) => {
    // Clear previous errors/warnings
    clearError();
    setResult(null);
    setWarnings([]);
    setIsCalculating(true);

    try {
      // Small delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Prepare input
      const input = {
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
      };

      // Pre-validate with our comprehensive validator
      const validation = validateGratuityInput(input);

      if (!validation.isValid) {
        const firstError = validation.errors[0];
        setCalculationError(firstError);
        setWarnings(validation.warnings);
        onCalculationError?.(firstError);
        return;
      }

      // Perform safe calculation
      const calculationResult = calculateGratuitySafe(input);

      if (!calculationResult.success) {
        setCalculationError(calculationResult.error || null);
        setWarnings(calculationResult.warnings || []);
        setShowRetryPrompt(true);
        if (calculationResult.error) {
          onCalculationError?.(calculationResult.error);
        }
        return;
      }

      // Success!
      if (calculationResult.data) {
        setResult(calculationResult.data);
        setLastInput(input);
        setWarnings(calculationResult.warnings || []);
        onCalculationComplete?.(calculationResult.data);
      }
    } catch (error) {
      console.error('Calculation error:', error);
      const errorObj: CalculatorError = {
        code: 'UNEXPECTED_ERROR',
        message: 'An unexpected error occurred during calculation.',
        severity: 'error',
        suggestion: 'Please check your inputs and try again.',
      };
      setCalculationError(errorObj);
      setShowRetryPrompt(true);
      onCalculationError?.(errorObj);
    } finally {
      setIsCalculating(false);
    }
  };

  // Retry calculation
  const handleRetry = useCallback(() => {
    setShowRetryPrompt(false);
    setCalculationError(null);
    handleSubmit(onSubmit)();
  }, [handleSubmit]);

  return (
    <div className="calculator-wrapper">
      <div className="calculator-card">
        {/* Display calculation error if any */}
        {calculationError && (
          <CalculatorErrorDisplay
            error={calculationError}
            onDismiss={clearError}
            showSuggestion={true}
          />
        )}

        {/* Show retry prompt if calculation failed */}
        {showRetryPrompt && !calculationError && (
          <CalculationRetryPrompt onRetry={handleRetry} onReset={handleReset} />
        )}

        <form onSubmit={handleSubmit(onSubmit)} onChange={clearError}>
          <div className="row">
            {/* Contract Type */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Contract Type</label>
              <select
                className={`form-select ${errors.contractType ? 'is-invalid' : ''}`}
                {...register('contractType')}
              >
                <option value="unlimited">Unlimited Contract</option>
                <option value="limited">Limited Contract</option>
              </select>
              {errors.contractType && (
                <div className="invalid-feedback">{errors.contractType.message}</div>
              )}
            </div>

            {/* Basic Salary */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Basic Salary (AED)</label>
              <div className="input-group">
                <span className="input-group-text">AED</span>
                <input
                  type="number"
                  className={`form-control ${errors.basicSalary ? 'is-invalid' : ''}`}
                  placeholder="e.g., 10000"
                  min="0"
                  step="0.01"
                  {...register('basicSalary', { valueAsNumber: true })}
                />
                {errors.basicSalary && (
                  <div className="invalid-feedback">{errors.basicSalary.message}</div>
                )}
              </div>
              <small className="text-muted">Basic salary only (excluding allowances)</small>
            </div>

            {/* Start Date */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                className={`form-control ${errors.startDate ? 'is-invalid' : ''}`}
                max={new Date().toISOString().split('T')[0]}
                {...register('startDate')}
              />
              {errors.startDate && (
                <div className="invalid-feedback">{errors.startDate.message}</div>
              )}
            </div>

            {/* End Date */}
            <div className="col-md-6 mb-3">
              <label className="form-label">End Date</label>
              <input
                type="date"
                className={`form-control ${errors.endDate ? 'is-invalid' : ''}`}
                {...register('endDate')}
              />
              {errors.endDate && (
                <div className="invalid-feedback">{errors.endDate.message}</div>
              )}
            </div>

            {/* Termination Reason */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Reason for Leaving</label>
              <select
                className={`form-select ${errors.terminationReason ? 'is-invalid' : ''}`}
                {...register('terminationReason')}
              >
                <option value="resignation">Resignation</option>
                <option value="termination">Termination by Employer</option>
                <option value="contract_end">Contract End</option>
                <option value="mutual_agreement">Mutual Agreement</option>
              </select>
              {errors.terminationReason && (
                <div className="invalid-feedback">{errors.terminationReason.message}</div>
              )}
            </div>

            {/* Free Zone */}
            {showFreeZone && (
              <div className="col-md-6 mb-3">
                <label className="form-label">Work Location</label>
                <select
                  className={`form-select ${errors.freeZone ? 'is-invalid' : ''}`}
                  {...register('freeZone')}
                >
                  <option value="mainland">UAE Mainland</option>
                  <optgroup label="Dubai Free Zones">
                    {DUBAI_FREE_ZONES.map((zone) => (
                      <option key={zone.slug} value={zone.code}>
                        {zone.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Abu Dhabi Free Zones">
                    {ABU_DHABI_FREE_ZONES.map((zone) => (
                      <option key={zone.slug} value={zone.code}>
                        {zone.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Sharjah Free Zones">
                    {SHARJAH_FREE_ZONES.map((zone) => (
                      <option key={zone.slug} value={zone.code}>
                        {zone.name}
                      </option>
                    ))}
                  </optgroup>
                </select>
                {errors.freeZone && (
                  <div className="invalid-feedback">{errors.freeZone.message}</div>
                )}
              </div>
            )}
          </div>

          {/* Info Box for Resignation */}
          {contractType === 'unlimited' && terminationReason === 'resignation' && (
            <div className="alert alert-info mb-3">
              <strong>Note:</strong> For unlimited contracts, gratuity upon resignation
              depends on years of service:
              <ul className="mb-0 mt-2">
                <li>Less than 1 year: No gratuity</li>
                <li>1-3 years: 1/3 of gratuity</li>
                <li>3-5 years: 2/3 of gratuity</li>
                <li>5+ years: Full gratuity</li>
              </ul>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary btn-lg w-100"
            disabled={isCalculating}
          >
            {isCalculating ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Calculating...
              </>
            ) : (
              'Calculate Gratuity'
            )}
          </button>
        </form>

        {/* Warnings */}
        {warnings.length > 0 && !calculationError && (
          <div className="mt-4">
            <CalculatorWarnings warnings={warnings} onDismiss={dismissWarning} />
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="calculator-result mt-4">
            {/* Zero gratuity special handling */}
            {isZeroGratuityResult(result) ? (
              <ZeroGratuityMessage
                reason={getZeroGratuityReason(
                  {
                    contractType: watch('contractType'),
                    basicSalary: watch('basicSalary'),
                    startDate: new Date(watch('startDate')),
                    endDate: new Date(watch('endDate')),
                    terminationReason: watch('terminationReason'),
                    freeZone: watch('freeZone') as FreeZone,
                  },
                  result
                )}
              />
            ) : (
              <>
                <div className="text-center mb-4">
                  <div className="result-label">Your Estimated Gratuity</div>
                  <div className="result-amount">{formatCurrency(result.totalGratuity)}</div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="result-detail">
                      <span className="detail-label">Years of Service</span>
                      <span className="detail-value">
                        {result.yearsOfService} years, {result.monthsOfService} months,{' '}
                        {result.daysOfService} days
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="result-detail">
                      <span className="detail-label">Entitlement</span>
                      <span className="detail-value">
                        {(result.entitlementPercentage * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Breakdown */}
                {result.breakdown.length > 0 && (
                  <div className="mt-4">
                    <h6 className="mb-3">Calculation Breakdown</h6>
                    <div className="table-responsive">
                      <table className="table table-sm">
                        <thead>
                          <tr>
                            <th>Period</th>
                            <th>Years</th>
                            <th>Days/Year</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.breakdown.map((item, index) => (
                            <tr key={index}>
                              <td>{item.period}</td>
                              <td>{item.years.toFixed(2)}</td>
                              <td>{item.daysPerYear}</td>
                              <td>{formatCurrency(item.amount)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Max Gratuity Warning */}
                {result.maxGratuityExceeded && (
                  <div className="alert alert-warning mt-3">
                    <strong>Note:</strong> The calculated gratuity exceeded the maximum limit (2
                    years&apos; salary). The amount shown is the maximum allowed.
                  </div>
                )}

                {/* Legal References */}
                <div className="mt-4 pt-3 border-top">
                  <small className="text-muted">
                    <strong>Legal References:</strong> {result.legalReferences.join(', ')}
                  </small>
                </div>
              </>
            )}

            {/* Expert Features (Visualizer & Projections) */}
            {result && lastInput && !isZeroGratuityResult(result) && (
              <CalculatorExpertFeatures input={lastInput} result={result} />
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .calculator-wrapper {
          background: linear-gradient(135deg, #0066cc 0%, #004d99 100%);
          border-radius: 1rem;
          padding: 1.5rem;
        }

        .calculator-card {
          background: white;
          border-radius: 0.75rem;
          padding: 2rem;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        }

        .form-label {
          font-weight: 500;
          color: #212529;
          margin-bottom: 0.5rem;
        }

        .calculator-result {
          background: #f8f9fa;
          border-radius: 0.5rem;
          padding: 1.5rem;
        }

        .result-label {
          font-size: 0.875rem;
          color: #6c757d;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
        }

        .result-amount {
          font-size: 2.5rem;
          font-weight: 700;
          color: #0066cc;
        }

        .result-detail {
          background: white;
          padding: 1rem;
          border-radius: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .detail-label {
          display: block;
          font-size: 0.75rem;
          color: #6c757d;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .detail-value {
          display: block;
          font-weight: 600;
          color: #212529;
          margin-top: 0.25rem;
        }

        @media (max-width: 768px) {
          .calculator-wrapper {
            padding: 1rem;
          }

          .calculator-card {
            padding: 1.5rem;
          }

          .result-amount {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}

/**
 * Main GratuityCalculator component wrapped with error boundary
 */
export default function GratuityCalculator(props: GratuityCalculatorProps) {
  return (
    <CalculatorErrorBoundary>
      <GratuityCalculatorInner {...props} />
    </CalculatorErrorBoundary>
  );
}
