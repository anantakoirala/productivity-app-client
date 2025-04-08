import { CustomColors } from "@/components/tag/NewTag";

export type Tag = {
  id: number;
  name: string;
  isActive: boolean;
  color: CustomColors;
};
