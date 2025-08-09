import { z } from "zod";

export const schema = z.object({
  username: z.string().min(1, { message: "UserName is required" }),

  unit: z.string().min(1, { message: "Unit is required" }),

  amount: z.string().min(1, { message: "Amount is required" }),

  received: z.string().optional(),

  balance: z.string().optional(),

  status: z.string().min(1, { message: "Status is required" }),

  date: z.union([z.date(), z.string().length(0)]).optional(),
});

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email("Please enter a valid email."),

  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(15, "Password must not exceed 15 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character (e.g., !@#$%^&*)"
    ),
});

export const resetSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email("Please enter a valid email."),
});
