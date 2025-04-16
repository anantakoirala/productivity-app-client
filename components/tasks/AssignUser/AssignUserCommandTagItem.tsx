import { Button } from "@/components/ui/button";
import { CommandItem } from "@/components/ui/command";
import { handleApiError } from "@/lib/handleApiError";
import { RootState } from "@/redux/store";
import {
  useAsignUserMutation,
  useRemoveUserFromTaskMutation,
} from "@/redux/task/taskApi";
import { removeUserFromTaskAssignee } from "@/redux/task/taskSlice";
import { Subscriber } from "@/types/Subscriber";
import { Check, Pencil, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  subscriber: Subscriber;
};

const AssignUserCommandTagItem = ({ subscriber }: Props) => {
  const { taskId } = useParams();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  const { task, taskAsignee } = useSelector((state: RootState) => state.task);

  const [assignUser, { isLoading }] = useAsignUserMutation();
  const [removeUser, { isLoading: removeUserLoading }] =
    useRemoveUserFromTaskMutation();

  const onAssignUser = async () => {
    try {
      await assignUser({
        userId: subscriber.userId,
        workspaceId: subscriber.workspaceId,
        taskId: task.id,
      }).unwrap();
      toast.success("Added to task successfully");
    } catch (error) {
      handleApiError(error);
    }
  };

  const onRemoveAssignee = async () => {
    try {
      await removeUser({
        userId: subscriber.userId,
        workspaceId: subscriber.workspaceId,
        taskId: task.id,
      }).unwrap();
      dispatch(removeUserFromTaskAssignee(subscriber.userId));
      toast.success("Removed from task successfully");
    } catch (error) {
      handleApiError(error);
    }
  };

  const isAssigned = taskAsignee.some(
    (assignee) => assignee.id === subscriber.userId
  );
  return (
    <CommandItem
      className="p-0 relative"
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <Button
        onClick={onAssignUser}
        disabled={isLoading}
        size={"sm"}
        variant={"ghost"}
        className={`w-full h-fit justify-between px-2 py-1.5 text-xs `}
      >
        {subscriber.name}
        {isAssigned && <Check className="w-4 h-4 text-green-500 ml-2" />}
      </Button>
      {isHovered && isAssigned && (
        <Button
          disabled={removeUserLoading}
          className="absolute top-1/2 right-6 translate-y-[-50%] h-fit rounded-none z-20 bg-transparent hover:bg-transparent text-muted-foreground"
          onClick={(e) => {
            e.stopPropagation();
            onRemoveAssignee();
          }}
        >
          <Trash size={16} />
        </Button>
      )}
    </CommandItem>
  );
};

export default AssignUserCommandTagItem;
