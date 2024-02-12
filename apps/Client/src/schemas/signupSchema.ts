import { z } from "zod";

export const signupSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "Name must be at least 2 character long" })
      .max(25, { message: "Name cannot exceed 25 characters" })
      .refine((value: string) => value.trim() !== "", {
        message: "Name cannot be made up of only spaces",
      }),
    lastName: z
      .string()
      .min(2, { message: "Name must be at least 2 character long" })
      .max(25, { message: "Name cannot exceed 25 characters" })
      .refine((value: string) => value.trim() !== "", {
        message: "Name cannot be made up of only spaces",
      }),
    phone: z
      .string()
      .refine(
        (value: string) =>
          /^(?:\+?\d{1,3}[\s-]?)?(?:\(\d{1,4}\)[\s-]?)?\d{6,14}$/.test(value),
        {
          message:
            "Invalid phone number format. It should contain between 6 to 14 digits.",
        }
      )
      .refine((value: string) => value.trim() !== "", {
        message: "Phone number cannot be made up of only spaces",
      }),

    email: z
      .string()
      .refine((value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
        message: "Invalid email format",
      })
      .refine((value: string) => value.trim() !== "", {
        message: "Email cannot be made up of only spaces",
      }),

    password: z
      .string()
      // .refine((value: string) => value.length >= 8, {
      //   message: "Password must be at least 8 characters long",
      // })
      // .refine((value: string) => /[a-z]/.test(value), {
      //   message: "Password must contain at least one lowercase letter",
      // })
      // .refine((value: string) => /[A-Z]/.test(value), {
      //   message: "Password must contain at least one uppercase letter",
      // })
      // .refine((value: string) => /\d/.test(value), {
      //   message: "Password must contain at least one digit",
      // })
      // .refine(
      //   (value: string) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value),
      //   {
      //     message: "Password must contain at least one special character",
      //   }
      // )
      // .refine((value: string) => value.trim() !== "", {
      //   message: "Password cannot be made up of only spaces",
      // })
      .refine((value: string) => value === value.trim(), {
        message: "Password cannot have leading or trailing spaces",
    })
    ,

    confirm_password: z
      .string()
      .refine((value: string) => value.trim() !== "", {
        message: "Confirm password cannot be made up of only spaces",
      }),
  })
  .refine(
    (data: { password: string; confirm_password: string }) =>
      data.password === data.confirm_password,
    {
      message: "Passwords must match",
      path: ["confirm_password"],
    }
  );

export type TSignupSchema = z.infer<typeof signupSchema>;
