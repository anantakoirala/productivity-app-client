"use client";
import { Button } from "@/components/ui/button";
import { CommandItem } from "@/components/ui/command";
import { handleApiError } from "@/lib/handleApiError";
import {
  useAsignUserToMindmapMutation,
  useRemoveUserFromMindmapMutation,
} from "@/redux/MindMap/mindMapApi";
import { removeUserFromMindmapAssignee } from "@/redux/MindMap/mindMapSlice";
import { RootState } from "@/redux/store";
import { Subscriber } from "@/types/Subscriber";
import { Check, Trash } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  subscriber: Subscriber;
};

const AssignUserToMindMapCommandItem = ({ subscriber }: Props) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  const { mindMap, mindmapAsignee } = useSelector(
    (state: RootState) => state.mindmap
  );

  const [assignUser, { isLoading }] = useAsignUserToMindmapMutation();
  const [removeUser, { isLoading: removeUserisLoading }] =
    useRemoveUserFromMindmapMutation();

  // Add user to mind map
  const onAssignUser = async () => {
    try {
      await assignUser({
        userId: subscriber.userId,
        workspaceId: subscriber.workspaceId,
        mindmapId: mindMap.id,
      }).unwrap();
      toast.success("Added to mindmap successfully");
    } catch (error) {
      handleApiError(error);
    }
  };

  // Remove user from mindmap
  const onRemoveAssignee = async () => {
    try {
      await removeUser({
        userId: subscriber.userId,
        workspaceId: subscriber.workspaceId,
        mindmapId: mindMap.id,
      }).unwrap();
      dispatch(removeUserFromMindmapAssignee(subscriber.userId));
      toast.success("Removed from mindmap successfully");
    } catch (error) {
      handleApiError(error);
    }
  };

  const isAssigned = mindmapAsignee.some(
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
          disabled={removeUserisLoading}
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

export default AssignUserToMindMapCommandItem;
