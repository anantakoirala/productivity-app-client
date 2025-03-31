"use client";
import { restApi } from "@/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { signUpSchema, SignUpSchema } from "@/schema/SignUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {};

const Page = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: SignUpSchema) => {
    console.log("signup data", data);
    try {
      setIsLoading(true);
      const response = await restApi.post("/api/auth/signup", data);

      toast.success(response?.data?.message);
      router.push("/signin");
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message);
      console.log("error", error.response.data.message);
    }
  };
  return (
    <div>
      <Card className="w-full min-w-[20rem] sm:min-w-[40rem] sm:w-auto ">
        <CardHeader>
          <Image
            src={"https://github.com/shadcn.png"}
            alt="image"
            className="rounded-full object-cover self-center"
            width={50}
            height={50}
          />
          <CardTitle className="pt-2">Sign Up</CardTitle>
          <CardDescription>Create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
            <div className="space-y-1.5 ">
              <div className="flex flex-col gap-1">
                <Input placeholder="name" {...register("name")} />
                {errors && errors.name && (
                  <span className="text-red-600 text-sm">
                    {errors?.name.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Input placeholder="email" {...register("email")} />
                {errors && errors.email && (
                  <span className="text-red-600 text-sm">
                    {errors?.email.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Input placeholder="username" {...register("username")} />
                {errors && errors.username && (
                  <span className="text-red-600 text-sm">
                    {errors?.username.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Input
                  placeholder="password"
                  {...register("password")}
                  type="password"
                />
                {errors && errors.password && (
                  <span className="text-red-600 text-sm">
                    {errors?.password.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Input
                  type="password"
                  placeholder="confirm password"
                  {...register("confirmPassword")}
                />
                {errors && errors.confirmPassword && (
                  <span className="text-red-600 text-sm">
                    {errors?.confirmPassword.message}
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Button
                disabled={isLoading}
                type="submit"
                variant={"secondary"}
                className="w-full font-bold text-primary-foreground bg-primary"
              >
                Sign Up
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <p className="text-sm text-center mt-2">
        Already have an account{" "}
        <Link href={"/signin"} className="text-primary">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default Page;
