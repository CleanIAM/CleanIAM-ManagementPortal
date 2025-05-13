import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Don't refetch when window focus changes
      refetchOnWindowFocus: false,

      // Set a reasonable stale time for all queries (5 minutes)
      staleTime: 5 * 60 * 1000,

      // Disable automatic refetching
      refetchInterval: false,

      // Limit retries (0 = no retries, only first attempt)
      retry: 1,

      // Set a reasonable timeout for queries
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
    },
    mutations: {
      // Limit retries for mutations
      retry: 0
    }
  }
});
