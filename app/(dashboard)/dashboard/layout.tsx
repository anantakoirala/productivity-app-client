"use client";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  const router = useRouter();
  const { completeOnBoarding } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    console.log("complete", completeOnBoarding);
    if (completeOnBoarding === false) {
      router.push("/on-boarding");
    }
  }, [completeOnBoarding]);
  return <div>{children}</div>;
};

export default layout;
