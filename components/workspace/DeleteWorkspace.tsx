"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { handleApiError } from "@/lib/handleApiError";
import { useDeleteWorkspaceMutation } from "@/redux/Workspace/workspaceApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = {};

const DeleteWorkspace = (props: Props) => {
  const router = useRouter();
  const { settingWorkspace } = useSelector(
    (state: RootState) => state.workspace
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const deleteWorkspaceSchema = z.object({
    workspaceName: z
      .string()
      .refine(
        (workspaceName) => workspaceName === settingWorkspace.name,
        "Workspace name doesnot match"
      ),
  });

  const [deleteWorkspace, { isLoading, isError }] =
    useDeleteWorkspaceMutation();

  const form = useForm<z.infer<typeof deleteWorkspaceSchema>>({
    resolver: zodResolver(deleteWorkspaceSchema),
    defaultValues: {
      workspaceName: "",
    },
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  const onSubmit = async (data: z.infer<typeof deleteWorkspaceSchema>) => {
    try {
      console.log("data", data);
      setIsDialogOpen(false);
      reset({ workspaceName: "" });
      const newData = { ...data, workspaceId: settingWorkspace.id };
      const response = await deleteWorkspace(newData).unwrap();
      toast.success(response.message);
      router.push("/dashboard/settings");
    } catch (error) {
      handleApiError(error);
    }
  };
  return (
    <div className="w-full h-auto bg-card px-4 py-2 rounded-md flex flex-col text-card-foreground border border-primary">
      <div className="mb-4">
        <h3 className="text-2xl font-semibold leading-none tracking-tight mb-1">
          Delete Workspace
        </h3>
        <p className="text-sm text-muted-foreground tracking-tight">
          Once a workspace and the data belonging to it are deleted, there is no
          way to recover them
        </p>
      </div>
      <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col gap-1">
          <Label className="text-muted-foreground">Workspace Name</Label>
          <Input
            placeholder="Workspace name"
            className="bg-muted"
            {...register("workspaceName")}
          />
          {errors.workspaceName && (
            <p className="text-red-600 text-sm">
              {errors.workspaceName.message}
            </p>
          )}
        </div>
        <Button
          type="button"
          className="w-auto max-w-md dark:text-white font-semibold bg-red-700"
          onClick={() => setIsDialogOpen(true)}
          disabled={!isValid || isLoading}
        >
          Delete
        </Button>
      </form>
      {/* Confirmation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <p className="text-sm text-muted-foreground tracking-tight">
              This action cannot be undone. This will permanently delete your
              workspace and all data associated with it.
            </p>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-red-700 text-white"
              onClick={handleSubmit(onSubmit)}
            >
              Yes, Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteWorkspace;
