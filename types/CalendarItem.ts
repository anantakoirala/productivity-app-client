export type CalendarItem = {
  title: string;
  taskDate: {
    id: string;
    from: Date | undefined;
    to: Date | undefined;
  } | null;
  workspaceId: string;
  workspaceName: string;

  taskId: string;
};
