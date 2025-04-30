import { z } from "zod";

export const EditProjectSchema = z.object({
  name: z.string().min(2),
});

export type EditProjectSchemaType = z.infer<typeof EditProjectSchema>;
