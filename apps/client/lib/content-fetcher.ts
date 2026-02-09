import { APIError, ClientError } from '@gratuity/shared/types/errors';

interface FetchOptions extends RequestInit {
  errorMessage?: string;
}

export async function fetchContent<T>(url: string, options?: FetchOptions): Promise<T> {
  const { errorMessage = 'Failed to fetch data', ...fetchInit } = options || {};

  try {
    const response = await fetch(url, fetchInit);

    if (!response.ok) {
      let errorData: APIError | null = null;
      try {
        errorData = await response.json();
      } catch (jsonError) {
        // If response is not JSON, use a generic error
      }

      const clientError: ClientError = {
        type: 'network',
        message: errorData?.message || `${errorMessage}: ${response.status} ${response.statusText}`,
        originalError: errorData || { status: response.status, statusText: response.statusText },
      };
      throw clientError;
    }

    return response.json();
  } catch (error) {
    console.error('Error in content-fetcher:', error);
    if (error instanceof Error) {
      throw { type: 'unknown', message: error.message, originalError: error } as ClientError;
    } else if (typeof error === 'object' && error !== null && 'type' in error && 'message' in error) {
      throw error as ClientError;
    }
    throw { type: 'unknown', message: 'An unexpected error occurred during content fetching.', originalError: error } as ClientError;
  }
}
