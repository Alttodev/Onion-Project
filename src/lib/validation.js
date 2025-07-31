import { z } from "zod";

export const schema = z.object({
  username: z.string().min(1, { message: "UserName is required" }),

  unit: z
    .string()
    .min(1, { message: "Unit is required" })
    .refine((val) => !isNaN(Number(val)), { message: "Must be a number" })
    .transform(Number)
    .refine((val) => val >= 0, { message: "Value cannot be negative" }),

  amount: z
    .string()
    .min(1, { message: "Amount is required" })
    .refine((val) => !isNaN(Number(val)), { message: "Must be a number" })
    .transform(Number)
    .refine((val) => val > 0, { message: "Amount must be greater than 0" }),

  received: z
    .string()
    .optional()
    .refine((val) => val === undefined || !isNaN(Number(val)), { message: "Must be a number" })
    .transform((val) => (val ? Number(val) : 0)),

  balance: z
    .string()
    .optional()
    .refine((val) => val === undefined || !isNaN(Number(val)), { message: "Must be a number" })
    .transform((val) => (val ? Number(val) : 0)),

  status: z.string().optional(),

  date: z.date().optional(),
});

export const loginSchema = z.object({
   email: z
    .string()
    .min(1, { message: "Email is required." })
    .email("Please enter a valid email."),
  
  password: z.string()
  .min(1,  "Password is required" )
  .min(8, "Password must be at least 8 characters long")
  .max(15, "Password must not exceed 15 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character (e.g., !@#$%^&*)")
});


export const resetSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email("Please enter a valid email."),
  
});