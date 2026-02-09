'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ClientError } from '@gratuity/shared/types/errors';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: ClientError | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    console.error("ErrorBoundary: getDerivedStateFromError", error);
    return {
      hasError: true, error: {
        type: 'unknown',
        message: error.message || 'An unexpected error occurred.',
        originalError: error,
      }
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary: Uncaught error:", error, errorInfo);
    // You can also log error messages to an error reporting service here
    // For example: logErrorToService(error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="container min-vh-100 d-flex align-items-center justify-content-center">
          <div className="card border-0 shadow-lg rounded-4 p-5 text-center" style={{ maxWidth: '500px' }}>
            <div className="mb-4">
              <div className="display-1 text-danger mb-3">⚠️</div>
              <h1 className="fw-bold h2">Something went wrong</h1>
              <p className="text-muted">
                We encountered an unexpected error. Don&apos;t worry, your data is safe.
              </p>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <div className="alert alert-light border x-small text-start mb-4">
                <code className="text-danger">{this.state.error?.message}</code>
              </div>
            )}

            <div className="d-grid gap-2">
              <button
                className="btn btn-primary btn-lg rounded-pill px-4"
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </button>
              <button
                className="btn btn-link text-muted text-decoration-none"
                onClick={() => this.setState({ hasError: false, error: null })}
              >
                Try to continue
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
