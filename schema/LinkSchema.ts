import { z } from "zod";

export const LinkSchema = z.object({
  link: z.string().url(),
});

export type LinkSchemaType = z.infer<typeof LinkSchema>;
