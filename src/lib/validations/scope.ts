import { z } from 'zod';

// Define Zod schema for scope form validation
export const ScopeFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  displayName: z.string().min(1, 'Display name is required'),
  description: z.string().optional(),
  resources: z.string().optional()
});

// Define the type based on the schema
export type ScopeFormValues = z.infer<typeof ScopeFormSchema>;
