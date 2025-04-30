import React, { Dispatch, SetStateAction, useEffect } from "react";

import { useForm } from "react-hook-form";
import {
  EditProjectSchema,
  EditProjectSchemaType,
} from "@/schema/EditProjectSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useUpdateProjectMutation } from "@/redux/Project/ProjectApi";
import { handleApiError } from "@/lib/handleApiError";
import toast from "react-hot-toast";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Router } from "lucide-react";

type Props = {
  opendEditDialog: boolean;
  setOpenEditDialog: Dispatch<SetStateAction<boolean>>;
  project: { id: number; title: string; workSpaceId: number };
};

const EditProjectDialog = ({
  opendEditDialog,
  setOpenEditDialog,
  project,
}: Props) => {
  const [updateProject, { isLoading }] = useUpdateProjectMutation();
  const pathName = usePathname();
  const { workspace_id, projectId } = useParams();
  const router = useRouter();
  const form = useForm<EditProjectSchemaType>({
    resolver: zodResolver(EditProjectSchema),
    defaultValues: {
      name: project.title,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  const onSubmit = async (data: EditProjectSchemaType) => {
    console.log("data ananta", project);
    try {
      const finalData = { ...data, workspaceId: project.workSpaceId };

      await updateProject({ id: project.id, data: finalData }).unwrap();
      toast.success("Project updated successfully");
      setOpenEditDialog(false);
    } catch (error) {
      handleApiError(error);
    }
  };

  console.log("pathName", pathName);
  console.log("projectId", projectId);

  return (
    <Dialog open={opendEditDialog} onOpenChange={setOpenEditDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground tracking-tight"></DialogDescription>
        </DialogHeader>
        <div className="max-w-md w-full space-y-8">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-1">
              <Label className="text-muted-foreground">Project Name</Label>
              <Input
                placeholder="Name"
                {...register("name")}
                className="bg-muted"
              />
              {errors?.name?.message && (
                <span className="text-red-600 text-sm">
                  {errors.name.message as string}
                </span>
              )}
            </div>

            <Button
              disabled={!isValid || isLoading}
              type="submit"
              className="w-full max-w-md dark:text-white font-semibold"
            >
              Update
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProjectDialog;
