import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .refine((value: string) => value.length >= 8, {
        message: "Password must be at least 8 characters long",
      })
      .refine((value: string) => /[a-z]/.test(value), {
        message: "Password must contain at least one lowercase letter",
      })
      .refine((value: string) => /[A-Z]/.test(value), {
        message: "Password must contain at least one uppercase letter",
      })
      .refine((value: string) => /\d/.test(value), {
        message: "Password must contain at least one digit",
      })
      .refine(
        (value: string) => /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(value),
        {
          message: "Password must contain at least one special character",
        }
      )
      .refine((value: string) => value.trim() !== "", {
        message: "Password cannot be made up of only spaces",
      })
      .refine((value: string) => value === value.trim(), {
        message: "Password cannot have leading or trailing spaces",
      }),
    confirm_password: z.string(),
  })
  .refine(
    (data: { newPassword: string; confirm_password: string }) =>
      data.newPassword === data.confirm_password,
    {
      message: "Passwords must match",
      path: ["confirm_password"],
    }
  );

export type TResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
