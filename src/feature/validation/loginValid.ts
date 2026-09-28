import * as z from 'zod';

export const loginSchema = z.object({
  email: z.email().min(1, 'Input at least one character'),
  password: z
    .string()
    .min(1, 'Can not be less than 1 character')
    .max(8, 'Max. character is 8'),
});

export type LoginRequest = z.infer<typeof loginSchema>;