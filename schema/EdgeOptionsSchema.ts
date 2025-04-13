import { z } from "zod";

export const EdgeOptionsSchema = z.object({
  edgeId: z.string(),
  label: z.string().min(2, "SCHEMA.WORKSPACE.SHORT"),
  type: z.enum([
    "customStraight",
    "customStepSharp",
    "customStepRound",
    "customBezier",
  ]),
  animated: z.boolean(),
});

export type EdgeOptionsSchemaType = z.infer<typeof EdgeOptionsSchema>;
