import { CalendarItem } from "@/types/CalendarItem";
import Link from "next/link";
import React from "react";

type Props = {
  dayInfo: CalendarItem;
  showMore?: boolean;
};

const CalendarTask = ({ dayInfo, showMore }: Props) => {
  return (
    <Link
      href={`/dashboard/workspace/${dayInfo.workspaceId}/tasks/task/${dayInfo.taskId}`}
    >
      <div
        className={`shadow-sm rounded-md flex items-center dark:text-secondary-foreground light:text-muted-foreground bg-primary bg-opacity-80 dark:bg-opacity-60 transition-colors duration-200 cursor-pointer overflow-hidden ${
          showMore ? "py-1.5 px-4 h-10" : "py-5 h-7 px-2"
        }`}
      >
        {dayInfo.title}
      </div>
    </Link>
  );
};

export default CalendarTask;
