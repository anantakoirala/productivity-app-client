import { z } from "zod";

export const taskSchema = z.object({
  icon: z.string().optional(),
  title: z.string().optional(),
  date: z.any(),
  content: z.any(),
});

export type TaskSchemaType = z.infer<typeof taskSchema>;
