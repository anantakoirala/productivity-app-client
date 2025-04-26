"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleApiError } from "@/lib/handleApiError";
import { useCreateProjectMutation } from "@/redux/Project/ProjectApi";
import { RootState } from "@/redux/store";
import { ProjectSchema, ProjectSchemaType } from "@/schema/ProjectSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

type Props = {};

const AddNewProject = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const { activeWorkspaceId } = useSelector(
    (state: RootState) => state.workspace
  );

  const [createProject, { isLoading }] = useCreateProjectMutation();

  const form = useForm<ProjectSchemaType>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      name: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  const onSubmit = async (data: ProjectSchemaType) => {
    try {
      const newData = { ...data, workspaceId: activeWorkspaceId };
      console.log("newData", newData);

      await createProject(newData).unwrap();

      toast.success("Project created successfully");
      setOpen(false);
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setOpen(true)}
            className="justify-start items-center gap-2 w-full"
            variant={"ghost"}
            size={"sm"}
          >
            <Plus size={16} /> Add Project
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new project</DialogTitle>
            <DialogDescription></DialogDescription>
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
                disabled={!isValid}
                type="submit"
                className="w-full max-w-md dark:text-white font-semibold"
              >
                Save
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
    // <Button
    //   className="justify-start items-center gap-2 w-full"
    //   variant={"ghost"}
    //   size={"sm"}
    // >
    //   <Plus size={16} /> Add Project
    // </Button>
  );
};

export default AddNewProject;
