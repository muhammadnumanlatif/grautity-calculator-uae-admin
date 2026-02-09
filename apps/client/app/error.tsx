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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold text-red-600">Error</h1>
      <h2 className="text-2xl font-semibold mt-4">Something went wrong!</h2>
      <p className="text-lg mt-2">We apologize for the inconvenience. Please try again later.</p>
      <div className="mt-6 flex space-x-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </button>
        <Link href="/" className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-300">
          Return Home
        </Link>
      </div>
    </div>
  );
}