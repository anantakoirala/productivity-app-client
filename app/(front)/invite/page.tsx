"use client";
import { handleApiError } from "@/lib/handleApiError";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import Head from "next/head";

type Props = {};

const Page = (props: Props) => {
  const route = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    const checkAuthenticatedUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/api/auth/me`,
          {
            withCredentials: true,
            headers: {
              "Cache-Control": "no-cache",
              Pragma: "no-cache",
            },
            params: {
              _: new Date().getTime(), // cache buster
            },
          }
        );

        if (response.status !== 200 || !response.data?.user?.email) {
          throw new Error("User not authenticated");
        }

        const inviteResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/api/public/validate-invite-token`,
          {
            token,
            email: response.data.user.email,
          },
          {
            headers: {
              "Cache-Control": "no-cache",
              Pragma: "no-cache",
            },
          }
        );

        if (inviteResponse.status !== 201 || !inviteResponse.data.inviteData) {
          throw new Error("Invalid or expired invitation");
        }

        await axios.post(
          `${process.env.NEXT_PUBLIC_API}/api/public/create-subscription-from-invitation`,
          {
            token,
            email: response.data.user.email,
          },
          {
            headers: {
              "Cache-Control": "no-cache",
              Pragma: "no-cache",
            },
          }
        );

        route.push("/dashboard");
      } catch (error: any) {
        if (error.response?.status === 401) {
          route.push(`/signin?token=${token}`);
        } else if (
          error.message === "Invalid or expired invitation" ||
          error.message === "Error while creating subscription" ||
          error.message === "User not authenticated"
        ) {
          handleApiError(error);
        } else {
          console.log("Unexpected error", error);
        }
      }
    };

    if (token) {
      checkAuthenticatedUser();
    }
  }, [token]);

  return (
    <>
      <Head>
        <meta httpEquiv="Cache-Control" content="no-store" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </Head>
      <div>Verify</div>
    </>
  );
};

export default Page;
