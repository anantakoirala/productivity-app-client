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
import { handleApiError } from "@/lib/handleApiError";
import { signInSchema, SignInSchema } from "@/schema/SignInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {};

const Page = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: SignInSchema) => {
    try {
      const response = await restApi.post("/api/auth/signin", {
        ...data,
        token: token ? token : "",
      });
      console.log("data", response);
      toast.success(response?.data?.message);
      router.push("/dashboard");
    } catch (error) {
      handleApiError(error);
      console.log("error", error);
    }
  };

  const redirectToSignUp = () => {
    if (token) {
      router.push(`/register?token=${token}`);
    } else {
      router.push("/register");
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
          <CardTitle className="pt-2">Sign In</CardTitle>
          <CardDescription>Create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
            <div className="space-y-1.5 ">
              <div className="flex flex-col gap-1">
                <Input placeholder="email" {...register("email")} />
                {errors && errors.email && (
                  <span className="text-red-600 text-sm">
                    {errors?.email.message}
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
            </div>
            <div className="space-y-2">
              <Button
                type="submit"
                variant={"secondary"}
                className="w-full font-bold text-primary-foreground bg-primary"
              >
                Sign In
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-sm text-center mt-2 flex flex-row gap-1 items-center justify-center">
        Dont have an account{" "}
        <div className="text-primary cursor-pointer" onClick={redirectToSignUp}>
          Sign up
        </div>
      </div>
    </div>
  );
};

export default Page;
