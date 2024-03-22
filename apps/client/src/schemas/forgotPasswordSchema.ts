import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .refine((value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
      message: 'Invalid email format',
    })
    .refine((value: string) => value.trim() !== '', {
      message: 'Email cannot be made up of only spaces',
    })
    .refine((value: string) => value === value.trim(), {
      message: 'Email cannot have leading or trailing spaces',
    }),
});

export type TForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
