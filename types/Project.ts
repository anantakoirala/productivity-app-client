export type Project = {
  id: number | undefined;
  title: string;
  tasks: { title: string; emoji: string; from: Date; to: Date }[];
};
