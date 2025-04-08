import { CustomColors } from "@/constants/CustomColors";
import { z } from "zod";

export const EditTagSchema = z.object({
  name: z.string().min(2).max(20),
  workspaceId: z.number(),
  color: z.nativeEnum(CustomColors),
});

export type EditTagEchemaType = z.infer<typeof EditTagSchema>;
