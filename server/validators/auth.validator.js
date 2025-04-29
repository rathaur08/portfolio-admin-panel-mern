import { z } from "zod";

// Creating an Object Schema

export const signupSchema = z.object({
  name: z.string({ required_error: "Name is required" }).trim(),
  email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email format" }),
  phone: z.string({ required_error: "Phone is required" }).regex(/^\d{10}$/, "Phone must be 10 digits"),
  password: z.string({ required_error: "Password is required" }).min(3, { message: "Password must be at least 3 characters" }),
});


