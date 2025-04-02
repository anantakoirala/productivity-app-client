"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleApiError } from "@/lib/handleApiError";
import { useChangePasswordMutation } from "@/redux/User/userApi";
import {
  changePasswordSchema,
  ChangePasswordType,
} from "@/schema/ChangePasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {};

const Page = (props: Props) => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const form = useForm<ChangePasswordType>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      repeat_password: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  const onSubmit = async (data: ChangePasswordType) => {
    try {
      await changePassword(data).unwrap();
      toast.success("Password changed successfully");
    } catch (error) {
      handleApiError(error);
    }
  };
  return (
    <>
      <Card className="bg-background border-none shadow-none">
        <CardHeader>
          <h1 className="text-2xl font-semibold leading-none tracking-tight">
            Security
          </h1>
          <CardDescription className="text-base max-w-3xl break-words">
            You can change your password here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4 mt-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row items-center w-full sm:gap-10 gap-1">
                <Label className="text-muted-foreground uppercase text-xs w-full md:w-24 text-center md:text-left">
                  Current Password
                </Label>
                <Input
                  type="password"
                  placeholder="Current password"
                  {...register("current_password")}
                  className="bg-muted"
                />
              </div>
              {errors?.current_password?.message && (
                <span className="text-red-600 text-sm">
                  {errors.current_password.message as string}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row items-center w-full sm:gap-10 gap-1">
                <Label className="text-muted-foreground uppercase text-xs w-full md:w-24 text-center md:text-left">
                  New Password
                </Label>
                <Input
                  type="password"
                  placeholder="New password"
                  {...register("new_password")}
                  className="bg-muted"
                />
              </div>
              {errors?.new_password?.message && (
                <span className="text-red-600 text-sm">
                  {errors.new_password.message as string}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row items-center w-full sm:gap-10 gap-1">
                <Label className="text-muted-foreground uppercase text-xs w-full md:w-24 text-center md:text-left">
                  Repeat Password
                </Label>
                <Input
                  type="password"
                  placeholder="Repeat password"
                  {...register("repeat_password")}
                  className="bg-muted"
                />
              </div>
              {errors?.repeat_password?.message && (
                <span className="text-red-600 text-sm">
                  {errors.repeat_password.message as string}
                </span>
              )}
            </div>
            <Button
              disabled={!isValid || isLoading}
              type="submit"
              className=" dark:text-white font-semibold"
            >
              Change password
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default Page;
