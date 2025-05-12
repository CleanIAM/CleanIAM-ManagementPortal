import { FieldError } from 'react-hook-form';

// Type definition for the merged error type from React Hook Form
export type ArrayFieldError = {
  type?: string;
  message?: string;
  [key: string]: unknown;
};

/**
 * Converts array field errors to regular field errors
 * This handles the type mismatch between array field errors and component props
 */
export function convertFieldError(
  error: ArrayFieldError | FieldError | undefined
): FieldError | undefined {
  if (!error) return undefined;
  
  // Create a new error object with the same properties
  const convertedError: FieldError = {
    type: error.type || 'validation',
    message: error.message || '',
  };
  
  // Copy any additional properties
  return { ...error, ...convertedError };
}
