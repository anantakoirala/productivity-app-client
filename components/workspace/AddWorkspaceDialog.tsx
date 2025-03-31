"use client";
import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import {
  AddWorkSpaceSchema,
  AddWorkSpaceType,
} from "@/schema/AddWorkspaceSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useCreateWorkspaceMutation } from "@/redux/Workspace/workspaceApi";

type Props = {};

const AddWorkspaceDialog = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const inputRef = useRef<null | HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState("");

  const [createWorkspace, { isLoading }] = useCreateWorkspaceMutation();

  const form = useForm<AddWorkSpaceType>({
    resolver: zodResolver(AddWorkSpaceSchema),
    defaultValues: {
      workspacename: "",
    },
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      const result = AddWorkSpaceSchema.pick({
        workspaceImage: true,
      }).safeParse({
        workspaceImage: selectedFile,
      });

      if (result?.success) {
        form.clearErrors("workspaceImage");
        form.setValue("workspaceImage", selectedFile, { shouldValidate: true });
        setImagePreview(URL.createObjectURL(e.target.files[0]));
      } else {
        const errors = result.error.flatten().fieldErrors.workspaceImage;
        errors?.forEach((error) =>
          form.setError("workspaceImage", { message: error })
        );
      }
    } else {
      setImagePreview("");
      form.clearErrors("workspaceImage");
      form.setValue("workspaceImage", null);
    }
  };

  const onSubmit = async (data: AddWorkSpaceType) => {
    console.log("data", data);

    try {
      const formData = new FormData();

      formData.append("workspacename", data.workspacename);
      formData.append("workspaceImage", data.workspaceImage);

      const response = await createWorkspace(formData).unwrap();

      // dispatch(
      //   setUserData({
      //     email: response.user.email,
      //     name: response.user.name,
      //     image: response.user.image || null,
      //     completeOnBoarding: response.user.completeOnBoarding,
      //     username: response.user.username,
      //   })
      // );
      toast.success("Workspace created successfully");
      setOpen(false);
    } catch (error: any) {
      toast.error(error.data.message);
      console.log("error", error.data);
    }
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setOpen(true)} variant={"ghost"} size={"icon"}>
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new workspace</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="max-w-md w-full space-y-8">
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-1">
                <Label className="text-muted-foreground">Workspace Name</Label>
                <Input
                  placeholder="Workspace name"
                  {...register("workspacename")}
                  className="bg-muted"
                />
                {errors?.workspacename?.message && (
                  <span className="text-red-600 text-sm">
                    {errors.workspacename.message as string}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-muted-foreground">
                  Workspace Image(optional)
                </Label>
                <Controller
                  control={form.control}
                  name="workspaceImage"
                  render={({ field }) => (
                    <Input
                      {...field}
                      ref={inputRef}
                      value={undefined}
                      type="file"
                      id="image"
                      className="hidden"
                      onChange={onImageChange}
                    />
                  )}
                />
                {imagePreview ? (
                  <div className="w-full h-24 flex flex-row items-center justify-center border border-primary rounded-md">
                    <span className="relative flex shrink-0 overflow-hidden rounded-full size-20 cursor-pointer ring-offset-2 ring-2 ring-slate-200">
                      <img
                        src={imagePreview ? imagePreview : "/unnamed.png"}
                        className="h-full w-full object-cover"
                        alt=""
                      />
                    </span>
                  </div>
                ) : (
                  <>
                    <div
                      className="w-full h-24 flex flex-row items-center justify-center border border-primary rounded-md"
                      role="button"
                      onClick={() => {
                        inputRef.current?.click();
                      }}
                    >
                      <div>Upload Image</div>
                    </div>
                  </>
                )}
                {errors?.workspaceImage?.message && (
                  <span className="text-red-600 text-sm">
                    {errors.workspaceImage.message as string}
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
    </div>
  );
};

export default AddWorkspaceDialog;
