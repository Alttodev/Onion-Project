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

export const resetPasswordSchema = z.object({
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

export const orderSchema = z
  .object({
    username: z.string().nonempty("Customer is required"),

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

    status: z.string().nonempty("Status is required"),

    createdDate: z.preprocess(
      (val) => (val === "" ? undefined : val),
      z.coerce.date().optional()
    ),
    updatedDate: z.preprocess(
      (val) => (val === "" ? undefined : val),
      z.coerce.date().optional()
    ),
    id: z.string().optional(),
  })
  .refine((data) => data.id || data.createdDate, {
    message: "Date is required",
    path: ["createdDate"],
  })
  .refine((data) => !data.id || data.updatedDate, {
    message: "Date is required",
    path: ["updatedDate"],
  });


 


export const customerSchema = z.object({
  username: z.string().min(1, { message: "UserName is required" }),
  date: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.coerce.date({ message: "Date is required" })
  ),
  address: z.string().min(1, { message: "Address is required" }),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        let digits = val.replace(/\D/g, "");
        if (digits.startsWith("91")) {
          digits = digits.slice(2);
        }
        return digits.length === 10;
      },
      {
        message: "Phone must be exactly 10 digits",
      }
    ),
});

export const schema = z
  .object({
    username: z.string(),
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

    status: z.string().nonempty("Status is required"),

    createdDate: z.preprocess(
      (val) => (val === "" ? undefined : val),
      z.coerce.date().optional()
    ),
    updatedDate: z.preprocess(
      (val) => (val === "" ? undefined : val),
      z.coerce.date().optional()
    ),
    id: z.string().optional(),
  })
  .refine((data) => data.id || data.createdDate, {
    message: "Date is required",
    path: ["createdDate"],
  })
  .refine((data) => !data.id || data.updatedDate, {
    message: "Date is required",
    path: ["updatedDate"],
  });
