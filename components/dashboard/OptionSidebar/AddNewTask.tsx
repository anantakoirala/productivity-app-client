"use client";
import React from "react";
import { Plus } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useCreateTaskMutation } from "@/redux/task/taskApi";
import { handleApiError } from "@/lib/handleApiError";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type Props = {};

const AddNewTask = (props: Props) => {
  const router = useRouter();

  const { activeWorkspaceId } = useSelector(
    (state: RootState) => state.workspace
  );

  const [createTask, { isLoading }] = useCreateTaskMutation();

  const onCreateTask = async () => {
    try {
      const response = await createTask({
        workspaceId: activeWorkspaceId,
      }).unwrap();

      router.push(
        `/dashboard/workspace/${activeWorkspaceId}/tasks/task/${response.task.id}`
      );
      toast.success("Task created successfully");
    } catch (error) {
      handleApiError(error);
    }
  };
  return (
    <Button
      disabled={isLoading}
      onClick={onCreateTask}
      className="justify-start items-center gap-2 w-full"
      variant={"ghost"}
      size={"sm"}
    >
      <Plus size={16} /> Add Task
    </Button>
  );
};

export default AddNewTask;
