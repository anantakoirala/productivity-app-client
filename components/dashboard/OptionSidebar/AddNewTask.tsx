"use client";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useCreateTaskMutation } from "@/redux/task/taskApi";
import { handleApiError } from "@/lib/handleApiError";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Controller, useForm } from "react-hook-form";
import {
  addNewTaskSchema,
  AddNewTaskSchemaType,
} from "@/schema/AddNewTaskSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {};

const AddNewTask = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const { activeWorkspaceId, projects } = useSelector(
    (state: RootState) => state.workspace
  );

  const [createTask, { isLoading }] = useCreateTaskMutation();

  const onCreateTask = async () => {
    try {
    } catch (error) {
      handleApiError(error);
    }
  };

  const form = useForm<AddNewTaskSchemaType>({
    resolver: zodResolver(addNewTaskSchema),
    defaultValues: {
      name: "",
      projectId: undefined,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  const onSubmit = async (data: AddNewTaskSchemaType) => {
    console.log("data", data);
    const finalData = { ...data, workspaceId: activeWorkspaceId };
    const response = await createTask(finalData).unwrap();

    router.push(
      `/dashboard/workspace/${activeWorkspaceId}/tasks/task/${response.task.id}`
    );
    toast.success("Task created successfully");
    setOpen(false);
    try {
    } catch (error) {
      handleApiError(error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={isLoading}
          onClick={() => setOpen(true)}
          className="justify-start items-center gap-2 w-full"
          variant={"ghost"}
          size={"sm"}
        >
          <Plus size={16} /> Add Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new task</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="max-w-md w-full space-y-8">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-1">
              <Label className="text-muted-foreground">Task Name</Label>
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
            <div className="flex flex-col gap-1">
              <Label className="text-muted-foreground">Select Project</Label>

              <Controller
                control={form.control}
                name="projectId"
                render={({ field }) => (
                  <Select
                    onValueChange={(val) => field.onChange(Number(val))}
                    defaultValue={field.value ? String(field.value) : undefined}
                  >
                    <SelectTrigger className="bg-muted p-2 rounded border">
                      <SelectValue placeholder="Choose a project" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map((project) => (
                        <SelectItem
                          key={project.id}
                          value={project.id.toString()}
                        >
                          {project.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />

              {errors?.projectId && (
                <span className="text-red-600 text-sm">
                  {errors.projectId.message}
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
  );
};

export default AddNewTask;
