import { z } from "zod";

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

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const customerSchema = z.object({
  username: z.string().min(1, { message: "UserName is required" }),
  date: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.coerce.date({ message: "Date is required" })
  ),
  address: z.string().min(1, { message: "Address is required" }),
  phone: z
    .string()
    .min(1, { message: "Phone number is required" })
    .regex(phoneRegex, { message: "Invalid phone number format" }),
});

export const schema = z.object({
  unit: z
    .string()
    .min(1, { message: "Unit is required" })
    .refine(
      (val) => {
        const num = parseFloat(val);
        return !isNaN(num) && num >= 0;
      },
      { message: "Unit cannot be negative" }
    ),

  amount: z
    .string()
    .min(1, { message: "Amount is required" })
    .refine(
      (val) => {
        const num = parseFloat(val);
        return !isNaN(num) && num >= 0;
      },
      { message: "Amount cannot be negative" }
    ),

  received: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (val === undefined || val === "") return true;
        const num = parseFloat(val);
        return !isNaN(num) && num >= 0;
      },
      { message: "Received Amount cannot be negative" }
    ),

  balance: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (val === undefined || val === "") return true;
        const num = parseFloat(val);
        return !isNaN(num) && num >= 0;
      },
      { message: "Balance Amount cannot be negative" }
    ),

  status: z.string().min(1, { message: "Status is required" }),

  createdDate: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.coerce.date({ message: "Date is required" })
  ),
  updatedDate: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.coerce.date({ message: "Date is required" })
  ),
});
