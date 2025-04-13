import { z } from "zod";

export const MindMapInfoSchema = z.object({
  title: z.string().min(2).max(30),
  emoji: z.string().optional(),
});

export type MindMapInfoSchemaType = z.infer<typeof MindMapInfoSchema>;
