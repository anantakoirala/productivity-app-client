import { SoundEffect } from "@/types/SoundEffects";
import { z } from "zod";

export const PomodoroSettingSchema = z.object({
  workDuration: z.number().min(5).max(60),
  shortBreakDuration: z.number().min(1).max(15),
  longBreakDuration: z.number().min(10).max(45),
  longBreakInterval: z.number().min(2).max(10),
  rounds: z.number().min(1).max(10),
  soundEffect: z.nativeEnum(SoundEffect),
  soundEffectVolume: z.number().min(0).max(1),
});

export type PomodoroSettingSchemaType = z.infer<typeof PomodoroSettingSchema>;
