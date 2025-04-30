import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { handleApiError } from "@/lib/handleApiError";
import { RootState } from "@/redux/store";
import { useDeleteTagMutation } from "@/redux/Tag/tagApi";
import { Tag } from "@/types/Tag";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { z } from "zod";

type Props = {
  openDeleteDialog: boolean;
  setOpenDeleteDialog: Dispatch<SetStateAction<boolean>>;
  tag: Tag;
};

const DeleteLabelDialog = ({
  openDeleteDialog,
  setOpenDeleteDialog,
  tag,
}: Props) => {
  const { activeWorkspaceId } = useSelector(
    (state: RootState) => state.workspace
  );

  const [deleteTag, { isLoading }] = useDeleteTagMutation();

  const onDeleteTag = async (tagId: number) => {
    try {
      await deleteTag({ id: tagId, workspaceId: activeWorkspaceId }).unwrap();
      setOpenDeleteDialog(false);
      toast.success("Tag deleted successfully");
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground tracking-tight">
            This action cannot be undone. This will permanently delete your
            label.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpenDeleteDialog(false)}>
            Cancel
          </Button>
          <Button
            className="bg-red-700 text-white"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteTag(tag.id);
            }}
            disabled={isLoading}
          >
            Yes, Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteLabelDialog;
