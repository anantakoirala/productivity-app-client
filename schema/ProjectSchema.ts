import { z } from "zod";

export const ProjectSchema = z.object({
  name: z.string().min(2, "Name should be atleast 2 characters").max(30),
});

export type ProjectSchemaType = z.infer<typeof ProjectSchema>;
