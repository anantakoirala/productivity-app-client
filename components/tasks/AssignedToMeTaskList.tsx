import { Task } from "@/types/Task";
import React from "react";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "../ui/button";

type Props = {
  task: Task;
  workspace_id: number;
};

const AssignedToMeTaskList = ({ task, workspace_id }: Props) => {
  return (
    <Link
      href={`/dashboard/workspace/${workspace_id}/tasks/task/${task.id}`}
      className="w-full h-auto min-h-20 bg-card border border-primary flex flex-row  px-2 py-2 rounded-sm gap-2"
    >
      <div className="">
        <Button
          variant="outline"
          className="text-lg w-14 h-20 p-2"
          disabled={true}
        >
          {task.emoji}
        </Button>
      </div>
      <div className="h-full w-full flex flex-col">
        <div className="tracking-tight text-lg capitalize font-normal">
          {task.title}
        </div>
        <div className="text-xs">Created by: {task.creatorName}</div>
        <div className="text-xs">
          From: {task.from ? format(new Date(task.from), "yyyy-MM-dd") : ""}
        </div>
        {task.assignedTo.length > 0 && (
          <div className="flex flex-row gap-1">
            <span className="text-xs">Assigned to:</span>
            <div className="flex flex-wrap gap-1">
              {task.assignedTo.map((assignee, index) => (
                <div
                  className="w-fit h-5 text-xs p-1 bg-accent flex items-center justify-center rounded-sm"
                  key={index}
                >
                  {assignee}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default AssignedToMeTaskList;
