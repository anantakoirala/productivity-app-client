"use client";
import { Button } from "@/components/ui/button";
import { handleApiError } from "@/lib/handleApiError";
import { useCreateMindMapMutation } from "@/redux/MindMap/mindMapApi";
import { RootState } from "@/redux/store";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

type Props = {};

const AddNewMindMap = (props: Props) => {
  const router = useRouter();
  const [createMindMap, { isLoading }] = useCreateMindMapMutation();
  const { activeWorkspaceId } = useSelector(
    (state: RootState) => state.workspace
  );

  const onCreateMindMap = async () => {
    try {
      const response = await createMindMap({
        workspaceId: activeWorkspaceId,
      }).unwrap();
      router.push(
        `/dashboard/workspace/${activeWorkspaceId}/mind-maps/mind-map/${response.mindmap.id}`
      );
      toast.success("Mindmap created successfully");
    } catch (error) {
      handleApiError(error);
    }
  };
  return (
    <Button
      onClick={onCreateMindMap}
      disabled={isLoading}
      className="justify-start items-center gap-2 w-full"
      variant={"ghost"}
      size={"sm"}
    >
      <Plus size={16} /> Add Mindmap
    </Button>
  );
};

export default AddNewMindMap;
