import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().nonempty("Password is required"), // Ensures password is not empty,
});

export type SignInSchema = z.infer<typeof signInSchema>;
