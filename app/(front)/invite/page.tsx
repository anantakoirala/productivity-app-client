"use client";
import { restApi } from "@/api";
import { handleApiError } from "@/lib/handleApiError";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

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
          { withCredentials: true }
        );

        // If user is logged in
        if (response.status === 200) {
          const inviteResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_API}/api/public/validate-invite-token`,
            { token, email: response.data.user.email }
          );

          // If there is an invitation
          if (inviteResponse.status === 201) {
            if (!inviteResponse.data.inviteData) {
              throw new Error("Invalid or expired invitation");
            } else {
              // Create subscription
              try {
                const createSubscriptionResponse = await axios.post(
                  `${process.env.NEXT_PUBLIC_API}/api/public/create-subscription-from-invitation`,
                  { token, email: response.data.user.email }
                );

                route.push("/dashboard");
              } catch (createError) {
                throw new Error("Error while creating subscription");
              }
            }
          }
        }
      } catch (error: any) {
        // Handle specific errors
        if (error.response?.status === 401) {
          route.push(`/signin?token=${token}`);
        } else if (
          error.message === "Invalid or expired invitation" ||
          error.message === "Error while creating subscription"
        ) {
          handleApiError(error);
        } else {
          console.log("Error", error);
        }
      }
    };

    checkAuthenticatedUser();
  }, [token]);

  return <div>Vefify</div>;
};

export default Page;
