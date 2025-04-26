export type Task = {
  id: number;
  title: string;
  emoji: string;
  from: Date;
  createdAt: Date;
  updatedAt: Date;
  creatorName: string | null;
  assignedTo: string[];
};
