import React from "react";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import WorkspaceImageEditDialog from "./WorkspaceImageEditDialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useUpdateWorkspaceMutation } from "@/redux/Workspace/workspaceApi";
import { handleApiError } from "@/lib/handleApiError";
import toast from "react-hot-toast";
import { Separator } from "../ui/separator";
import DeleteWorkspace from "./DeleteWorkspace";

type Props = {};

const workspaceNameSchema = z.object({
  name: z.string().min(2),
});

const WorkspaceSettingOverview = (props: Props) => {
  const { settingWorkspace } = useSelector(
    (state: RootState) => state.workspace
  );

  const [updateWorkspace, { isLoading, isError }] =
    useUpdateWorkspaceMutation();

  const form = useForm<z.infer<typeof workspaceNameSchema>>({
    resolver: zodResolver(workspaceNameSchema),
    defaultValues: {
      name: settingWorkspace.name,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  const onSubmit = async (data: z.infer<typeof workspaceNameSchema>) => {
    try {
      console.log("data", data);
      const newData = { data, id: settingWorkspace.id };
      const response = await updateWorkspace(newData).unwrap();

      toast.success(response.message);
    } catch (error) {
      handleApiError(error);
    }
  };
  return (
    <Card className="bg-background border-none shadow-none max-w-3xl">
      <CardHeader>
        <h1 className="text-2xl font-semibold leading-none tracking-tight">
          Edit Workspace
        </h1>
        <CardDescription className="text-base break-words">
          Some content to edit workspace details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <WorkspaceImageEditDialog />
        {/* Workspace name */}
        <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1">
            <Label className="text-muted-foreground">Name</Label>
            <Input
              placeholder="name"
              className="bg-muted"
              {...register("name")}
            />
          </div>
          <Button
            type="submit"
            disabled={!isValid}
            className="w-auto max-w-md dark:text-white font-semibold"
          >
            save
          </Button>
        </form>

        <div className="py-4 sm:py-6 ">
          <Separator />
        </div>
        <DeleteWorkspace />
      </CardContent>
    </Card>
  );
};

export default WorkspaceSettingOverview;
