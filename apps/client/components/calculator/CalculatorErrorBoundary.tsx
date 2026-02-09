'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import {
  type CalculatorError,
  isGratuityCalculatorError,
  createCalculatorError,
} from '@gratuity/shared/types/errors';

interface CalculatorErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: CalculatorError) => void;
  onReset?: () => void;
}

interface CalculatorErrorBoundaryState {
  hasError: boolean;
  error: CalculatorError | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Error boundary specifically for the calculator component
 * Catches JavaScript errors in calculator child components
 */
class CalculatorErrorBoundary extends Component<
  CalculatorErrorBoundaryProps,
  CalculatorErrorBoundaryState
> {
  constructor(props: CalculatorErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<CalculatorErrorBoundaryState> {
    // Convert error to CalculatorError format
    let calculatorError: CalculatorError;

    if (isGratuityCalculatorError(error)) {
      calculatorError = error.toCalculatorError();
    } else {
      calculatorError = createCalculatorError('UNEXPECTED_ERROR', {
        message: error.message || 'An unexpected error occurred in the calculator.',
        details: error.name,
      });
    }

    return {
      hasError: true,
      error: calculatorError,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details
    console.error('Calculator Error Boundary caught an error:', error);
    console.error('Component stack:', errorInfo.componentStack);

    this.setState({ errorInfo });

    // Notify parent if callback provided
    if (this.props.onError && this.state.error) {
      this.props.onError(this.state.error);
    }

    // In production, you might want to log to an error reporting service
    // logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });

    // Call parent reset handler if provided
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { error } = this.state;

      return (
        <div className="calculator-error-boundary">
          <div className="error-container">
            <div className="error-icon" aria-hidden="true">
              ⚠️
            </div>
            <h3 className="error-title">Calculator Error</h3>
            <p className="error-message">
              {error?.message || 'Something went wrong with the calculator.'}
            </p>
            {error?.suggestion && (
              <p className="error-suggestion">{error.suggestion}</p>
            )}

            <div className="error-actions">
              <button
                type="button"
                className="btn btn-primary me-2"
                onClick={this.handleReset}
              >
                Try Again
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={this.handleReload}
              >
                Reload Page
              </button>
            </div>

            {/* Show technical details in development */}
            {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
              <details className="error-details mt-4">
                <summary className="text-muted small cursor-pointer">
                  Technical Details (Development Only)
                </summary>
                <pre className="bg-dark text-light p-3 rounded mt-2 small overflow-auto">
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>

          <style jsx>{`
            .calculator-error-boundary {
              padding: 2rem;
              background: linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%);
              border-radius: 0.75rem;
              border: 1px solid #feb2b2;
            }

            .error-container {
              text-align: center;
              max-width: 500px;
              margin: 0 auto;
            }

            .error-icon {
              font-size: 4rem;
              margin-bottom: 1rem;
            }

            .error-title {
              color: #c53030;
              margin-bottom: 0.5rem;
              font-weight: 600;
            }

            .error-message {
              color: #742a2a;
              margin-bottom: 0.5rem;
            }

            .error-suggestion {
              color: #9b2c2c;
              font-size: 0.875rem;
              opacity: 0.8;
              margin-bottom: 1.5rem;
            }

            .error-actions {
              display: flex;
              justify-content: center;
              gap: 0.5rem;
            }

            .error-details summary {
              cursor: pointer;
            }

            .error-details pre {
              text-align: left;
              font-size: 0.75rem;
              max-height: 200px;
            }
          `}</style>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Hook-based error boundary wrapper for functional components
 */
export function withCalculatorErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options?: {
    fallback?: ReactNode;
    onError?: (error: CalculatorError) => void;
  }
) {
  return function WithErrorBoundary(props: P) {
    return (
      <CalculatorErrorBoundary
        fallback={options?.fallback}
        onError={options?.onError}
      >
        <WrappedComponent {...props} />
      </CalculatorErrorBoundary>
    );
  };
}

export default CalculatorErrorBoundary;
