"use client";
import { useSaveProfileImageMutation } from "@/redux/OnBoarding/onBoardingApi";
import { RootState } from "@/redux/store";
import { useLazyDeleteUserProfileImageQuery } from "@/redux/User/userApi";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Check, Pencil, Trash, User } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { useSaceWorkspaceImageMutation } from "@/redux/Workspace/workspaceApi";

type Props = {};

const MAX_FILE_SIZE = 500 * 1024; // 500KB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const ImageSchema = z.object({
  image: z
    .any()
    .refine((file) => file instanceof File, {
      message: "Please select an image file",
    })
    .refine((file) => file?.size <= MAX_FILE_SIZE, {
      message: "Image must be less than 500KB",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), {
      message: "Only .jpg, .jpeg, .png files are accepted",
    }),
});

const WorkspaceImageEditDialog = (props: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const inputRef = useRef<null | HTMLInputElement>(null);

  const { settingWorkspace } = useSelector(
    (state: RootState) => state.workspace
  );

  const [saveImage, { isLoading, isError }] = useSaceWorkspaceImageMutation();

  const [
    trigger,
    { isLoading: deleteUserImageLoading, isError: deleteUserImageError },
  ] = useLazyDeleteUserProfileImageQuery();

  const form = useForm<z.infer<typeof ImageSchema>>({
    resolver: zodResolver(ImageSchema),

    mode: "onChange",
  });

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      const result = ImageSchema.pick({ image: true }).safeParse({
        image: selectedFile,
      });
      if (result?.success) {
        form.clearErrors("image");
        form.setValue("image", selectedFile, { shouldValidate: true });
        setImagePreview(URL.createObjectURL(e.target.files[0]));
      } else {
        const errors = result.error.flatten().fieldErrors.image;
        errors?.forEach((error) => form.setError("image", { message: error }));
      }
    }
  };

  const {
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  const onSubmit = async (data: z.infer<typeof ImageSchema>) => {
    const file = data.image;
    console.log("data", data);
    if (!file) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("workspaceId", settingWorkspace.id);
    try {
      await saveImage(formData).unwrap();
      setIsDialogOpen(false);
    } catch (error) {
      console.log("error");
    }
  };

  const deleteUserImage = async () => {
    try {
      const response = await trigger({}).unwrap();
      console.log("response", response);
      setImagePreview("");
      setIsDialogOpen(false);

      toast.success("Image deleted successfully");
    } catch (error: any) {
      toast.error(error?.data?.message);
      console.log("error deleting image", error.data);
    }
  };

  useEffect(() => {
    if (settingWorkspace.image) {
      setImagePreview(
        `${process.env.NEXT_PUBLIC_IMAGE_PATH}/${settingWorkspace.image}`
      );
    }
  }, [settingWorkspace]);

  return (
    <div className="w-full flex flex-col justify-center items-start gap-2 ">
      <div className="flex flex-col items-center justify-center">
        <p className="text-sm text-muted-foreground">Add a photo</p>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <div
              className="relative  w-16 h-16 md:h-20 md:w-20 rounded-full flex justify-center items-center text-muted-foreground overflow-hidden group"
              onClick={() => setIsDialogOpen(true)}
            >
              {settingWorkspace.image ? (
                <span className="relative flex shrink-0 overflow-hidden rounded-full size-32 cursor-pointer ring-offset-2 ring-2 ring-slate-200">
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${settingWorkspace.image}`}
                    className="h-full w-full object-cover"
                    alt=""
                  />
                </span>
              ) : (
                <span className="w-16 h-16 md:h-20 md:w-20 bg-card" />
              )}
              <div className="absolute w-16 h-16 md:h-20 md:w-20 rounded-full flex items-center justify-center group">
                <div
                  className={`w-7 h-7 flex items-center justify-center rounded-full ${
                    settingWorkspace.image ? "bg-muted/50" : ""
                  }`}
                >
                  <Pencil className="text-primary" />
                </div>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center justify-center sm:max-w-[28rem] p-2">
            <DialogHeader className="text-center">
              <DialogTitle>Upload a photo</DialogTitle>
            </DialogHeader>
            {imagePreview ? (
              <div className="rounded-full w-52 h-52 relative overflow-hidden my-5">
                <Image
                  src={imagePreview}
                  alt="user image"
                  fill
                  className="object-cover w-full h-full"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            ) : (
              <div className=" h-16 w-16 bg-muted rounded-full flex justify-center items-center text-muted-foreground">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-2 justify-center items-center">
                <Button
                  type="button"
                  onClick={() => {
                    inputRef.current?.click();
                  }}
                  className="mb-1 cursor-pointer"
                >
                  Choose a file
                </Button>
                <Controller
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <Input
                      ref={inputRef}
                      value={undefined}
                      type="file"
                      id="image"
                      className="hidden"
                      onChange={onImageChange}
                    />
                  )}
                />
                {errors?.image?.message && (
                  <span className="text-red-600 text-sm">
                    {errors.image.message as string}
                  </span>
                )}
              </div>
              <div className="flex mt-5 w-full justify-center items-center gap-4">
                {settingWorkspace.image && (
                  <Button
                    disabled={deleteUserImageLoading}
                    type="button"
                    className="rounded-full w-12 h-12"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      deleteUserImage();
                    }}
                  >
                    <Trash size={18} />
                  </Button>
                )}
                <Button
                  className="rounded-full w-12 h-12"
                  type="submit"
                  disabled={!isValid || isLoading}
                >
                  <Check size={18} />
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default WorkspaceImageEditDialog;
