"use client";
import AddImage from "@/components/OnBoarding/AddImage";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RootState } from "@/redux/store";
import { useUpdateUserInfoMutation } from "@/redux/User/userApi";
import { accountInfoSchema, AccountInfoType } from "@/schema/AccountInfoSchema";
import {
  deleteAccountSchema,
  DeleteAccountType,
} from "@/schema/DeleteAccountSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

type Props = {};

const Page = (props: Props) => {
  const [updateUserInfo, { isLoading, isError }] = useUpdateUserInfoMutation();
  const { email, image, name, username } = useSelector(
    (state: RootState) => state.user
  );
  const form = useForm<AccountInfoType>({
    resolver: zodResolver(accountInfoSchema),
    defaultValues: {
      name: name ? name : "",
      username: username,
    },
  });

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = form;

  const deleteAccountForm = useForm<DeleteAccountType>({
    resolver: zodResolver(deleteAccountSchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    register: deleteAccountRegister,
    formState: { errors: deleteAccountErrors, isValid: deleteAccountIsValid },
    handleSubmit: deleteAcountHanldleSubmit,
  } = deleteAccountForm;

  const onSubmit = async (data: AccountInfoType) => {
    try {
      const response = await updateUserInfo({
        name: data.name,
        username: data.username,
      }).unwrap();

      toast.success("Info updated successfully");
    } catch (error: any) {
      toast.error(error.data.message);
      console.log("error", error);
    }
  };

  const onDeleteAccountSubmit = (data: DeleteAccountType) => {
    console.log("delete account", data);
  };
  return (
    <div>
      <Card className="bg-background border-none shadow-none">
        <CardHeader>
          <h1 className="text-2xl font-semibold leading-none tracking-tight">
            Account
          </h1>
          <CardDescription className="text-base">
            Manage your account
          </CardDescription>
        </CardHeader>
      </Card>
      {/* Account Info */}
      <Card className="bg-background border-none shadow-none">
        <CardContent>
          <div className="uppercase text-muted-foreground text-xs">
            <p>Profile Image</p>
            <AddImage />
          </div>
          <form className="space-y-4 mt-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col sm:flex-row items-center w-full sm:gap-10 gap-1">
              <Label className="text-muted-foreground uppercase text-xs w-full md:w-24 text-center md:text-left">
                Name
              </Label>
              <Input
                placeholder="name"
                {...register("name")}
                className="bg-muted"
              />
              {errors?.name?.message && (
                <span className="text-red-600 text-sm">
                  {errors.name.message as string}
                </span>
              )}
            </div>
            <div className="flex flex-col sm:flex-row items-center w-full sm:gap-10 gap-1">
              <Label className="text-muted-foreground uppercase text-xs w-full md:w-24 text-center md:text-left">
                Username
              </Label>
              <Input
                placeholder="username"
                {...register("username")}
                className="bg-muted"
              />
              {errors?.username?.message && (
                <span className="text-red-600 text-sm">
                  {errors.username.message as string}
                </span>
              )}
            </div>
            <Button
              disabled={!isValid || isLoading}
              type="submit"
              className=" dark:text-white font-semibold"
            >
              Update
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="p-4 sm:p-6">
        <Separator />
      </div>
      {/* Delete Account */}
      <Card>
        <CardHeader>
          <CardTitle>Delete Account</CardTitle>
          <CardDescription>
            Once your account and data are deleted,there is no way to recover
            them
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4 mt-2"
            onSubmit={deleteAcountHanldleSubmit(onDeleteAccountSubmit)}
          >
            <div className="flex flex-col sm:flex-row items-center w-full sm:gap-10 gap-1">
              <Label className="text-muted-foreground uppercase text-xs w-full md:w-24 text-center md:text-left">
                Email
              </Label>
              <Input
                placeholder="Confirm your email"
                {...deleteAccountRegister("email")}
                className="bg-muted"
              />
              {deleteAccountErrors?.email?.message && (
                <span className="text-red-600 text-sm">
                  {deleteAccountErrors.email.message as string}
                </span>
              )}
            </div>

            <Button
              disabled={!deleteAccountIsValid || isLoading}
              type="submit"
              className=" dark:text-white font-semibold"
            >
              Delete
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
