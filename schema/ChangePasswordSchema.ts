import { z } from "zod";

export const changePasswordSchema = z
  .object({
    current_password: z.string().min(5),
    new_password: z.string().min(5),
    repeat_password: z.string(),
  })
  .refine((data) => data.new_password === data.repeat_password, {
    message: "Password does not match",
    path: ["repeat_password"],
  })
  .refine((data) => data.new_password !== data.current_password, {
    // Fix: should be !==
    message: "New password should not be the same as the current password",
    path: ["new_password"],
  });

export type ChangePasswordType = z.infer<typeof changePasswordSchema>;
