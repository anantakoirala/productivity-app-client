"use client";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { RootState } from "@/redux/store";
import { redirect, usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  const pathName = usePathname();
  const router = useRouter();
  const { completeOnBoarding } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (pathName) {
      // if user onboarding is true and current pathname is '/on-boarding' redirect to dashboard
      if (completeOnBoarding && pathName === "/on-boarding") {
        router.push("/dashboard");
      }

      // If user onboarding is false and current pathname is also not '/on-boarding' redirect to '/on-boarding'
      if (!completeOnBoarding && pathName !== "/on-boarding") {
        router.push("/on-boarding");
      }
    }
  }, [pathName, completeOnBoarding]);
  return (
    <main className="flex min-h-screen w-full ">
      <div className="absolute top-0 left-0 w-full flex justify-end">
        <div className="flex items-center gap-2 max-w-7xl p-4 md:p-6">
          <ThemeSwitcher />
        </div>
      </div>
      {children}
    </main>
  );
};

export default layout;
