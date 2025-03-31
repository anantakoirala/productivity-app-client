import { z } from "zod";

export const deleteAccountSchema = z.object({
  email: z.string().email(),
});

export type DeleteAccountType = z.infer<typeof deleteAccountSchema>;
