import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.string().email("Please enter a valid email"),
    password: z
      .string()
      .min(5, "Password should contain atleast 5 characters")
      .nonempty("Password is required"), // Ensures password is not empty,
    confirmPassword: z.string().nonempty("Confirm Password is required"),
    username: z
      .string()
      .min(2, "Username should contain at least 2 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Error will be attached to confirmPassword
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;
