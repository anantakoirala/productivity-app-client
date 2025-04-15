"use client";
import React, { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useDeleteMindMapMutation } from "@/redux/MindMap/mindMapApi";
import { handleApiError } from "@/lib/handleApiError";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = {
  openDeleteDialog: boolean;
  setOpenDeleteDialog: Dispatch<SetStateAction<boolean>>;
  mind_map_id: string;
  workspace_id: string;
};

const MindMapDeleteConfirmationDialog = ({
  openDeleteDialog,
  setOpenDeleteDialog,
  mind_map_id,
  workspace_id,
}: Props) => {
  const router = useRouter();
  const [deleteMindMap, { isLoading }] = useDeleteMindMapMutation();

  const onDeleteMindMap = async () => {
    try {
      await deleteMindMap({
        workspaceId: workspace_id,
        mindMapId: mind_map_id,
      }).unwrap();
      toast.success("MindMap deleted successfully");
      setOpenDeleteDialog(false);
      router.push(`/dashboard/workspace/${workspace_id}`);
    } catch (error) {
      handleApiError(error);
    }
  };
  return (
    <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <p className="text-sm text-muted-foreground tracking-tight">
            This action cannot be undone. This will permanently delete your
            mindmap and all data associated with it.
          </p>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpenDeleteDialog(false)}>
            Cancel
          </Button>
          <Button
            className="bg-red-700 text-white"
            onClick={onDeleteMindMap}
            disabled={isLoading}
          >
            Yes, Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MindMapDeleteConfirmationDialog;
