import { z } from "zod";

enum CustomColors {
  PURPLE = "PURPLE",
  RED = "RED",
  GREEN = "GREEN",
  BLUE = "BLUE",
  PINK = "PINK",
  YELLOW = "YELLOW",
  ORANGE = "ORANGE",
  CYAN = "CYAN",
  LIME = "LIME",
  EMERALD = "EMERALD",
  INDIGO = "INDIGO",
  FUCHSIA = "FUCHSIA",
}

export const newTagSchema = z.object({
  name: z.string().min(2).max(20),
  workspaceId: z.number(),
  color: z.nativeEnum(CustomColors),
});

export type NewTagType = z.infer<typeof newTagSchema>;
