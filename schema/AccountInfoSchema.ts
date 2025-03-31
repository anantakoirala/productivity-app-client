import { z } from "zod";

export const accountInfoSchema = z.object({
  username: z
    .string()
    .min(2, "Username should be atleast 2 characters")
    .refine((username) => /^[a-zA-Z0-9]+$/.test(username), {
      message: "Username can only contain letters and numbers",
    })
    .optional(),
  name: z.string().min(2, "Name should be atleast 2 characters"),
});

export type AccountInfoType = z.infer<typeof accountInfoSchema>;
