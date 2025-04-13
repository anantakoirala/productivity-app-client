import { z } from "zod";

export const MindMapSchema = z.object({
  workspaceId: z.number(),
  content: z.any(),
});

export type MindMapSchemaType = z.infer<typeof MindMapSchema>;
