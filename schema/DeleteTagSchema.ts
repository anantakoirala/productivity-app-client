import { CustomColors } from "@/constants/CustomColors";
import { z } from "zod";

export const DeleteTagSchema = z.object({
  workspaceId: z.number(),
});

export type DeleteTagSchemaType = z.infer<typeof DeleteTagSchema>;
