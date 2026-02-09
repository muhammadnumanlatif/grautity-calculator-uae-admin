'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light text-center px-4">
      <h1 className="display-1 fw-bold text-danger">Error</h1>
      <h2 className="h2 fw-semibold mt-4 mb-3">Something went wrong!</h2>
      <p className="lead text-muted mb-4">We apologize for the inconvenience. Please try again later.</p>
      <div className="d-flex gap-3 justify-content-center mt-3">
        <button
          className="btn btn-primary btn-lg rounded-pill shadow-sm"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </button>
        <Link href="/" className="btn btn-secondary btn-lg rounded-pill shadow-sm">
          Return Home
        </Link>
      </div>
    </div>
  );
}