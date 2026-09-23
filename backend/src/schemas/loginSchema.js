import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .email("Email must be a valid email")
    .min(1, "Email is required")
    .max(30, "Email must be less than 30 characters")
    .trim(),
  password: z
    .string()
    .min(1, "Password is required")
    .max(30, "Password must be less than 30 characters")
    .trim(),
});
