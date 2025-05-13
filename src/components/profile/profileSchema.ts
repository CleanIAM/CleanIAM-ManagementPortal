import { z } from 'zod';

export const profileFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters' })
    .max(64, { message: 'First name cannot exceed 64 characters' }),
  lastName: z
    .string()
    .min(2, { message: 'Last name must be at least 2 characters' })
    .max(64, { message: 'Last name cannot exceed 64 characters' })
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
