"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSaveWorkspaceMutation } from "@/redux/OnBoarding/onBoardingApi";
import { RootState } from "@/redux/store";
import { setUserData } from "@/redux/User/userSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";

type Props = {};

const MAX_FILE_SIZE = 500 * 1024; // 500KB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const ThirdStepSchema = z.object({
  workspacename: z.string().min(2),
  workspaceImage: z
    .any()
    .optional()
    .refine(
      (file) => {
        if (file) {
          // Only validate if file is present
          return file instanceof File;
        }
        return true; // skip validation if no file
      },
      {
        message: "Please select an image file",
      }
    )
    .refine(
      (file) => {
        if (file) {
          return file.size <= MAX_FILE_SIZE;
        }
        return true;
      },
      {
        message: "Image must be less than 500KB",
      }
    )
    .refine(
      (file) => {
        if (file) {
          return ACCEPTED_IMAGE_TYPES.includes(file.type);
        }
        return true;
      },
      {
        message: "Only .jpg, .jpeg, .png files are accepted",
      }
    ),
});

const ThirdStep = (props: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const inputRef = useRef<null | HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState("");

  const { useCase, workspaceName, name } = useSelector(
    (state: RootState) => state.onboarding
  );

  const [saveWorkspace, { isLoading, isError }] = useSaveWorkspaceMutation();
  const form = useForm<z.infer<typeof ThirdStepSchema>>({
    resolver: zodResolver(ThirdStepSchema),
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

      const result = ThirdStepSchema.pick({ workspaceImage: true }).safeParse({
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

  const onSubmit = async (data: z.infer<typeof ThirdStepSchema>) => {
    console.log("data", data);

    try {
      const formData = new FormData();
      formData.append("name", name as string);
      formData.append("useCase", useCase as string);
      formData.append("workspacename", data.workspacename);
      if (data.workspaceImage) {
        formData.append("workspaceImage", data.workspaceImage);
      }

      const response = await saveWorkspace(formData).unwrap();

      dispatch(
        setUserData({
          email: response.user.email,
          name: response.user.name,
          image: response.user.image || null,
          completeOnBoarding: response.user.completeOnBoarding,
          username: response.user.username,
        })
      );
      toast.success("Onboarding completed");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.data.message);
      console.log("error", error.data);
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4 w-full my-10 text-center">
        <h2 className="font-bold text-4xl md:text-5xl max-w-md">
          Create a workspace
        </h2>
      </div>
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
            disabled={!isValid || isLoading}
            type="submit"
            className="w-full max-w-md dark:text-white font-semibold"
          >
            Continue
            <ArrowRight width={18} height={18} />
          </Button>
        </form>
      </div>
    </>
  );
};

export default ThirdStep;
