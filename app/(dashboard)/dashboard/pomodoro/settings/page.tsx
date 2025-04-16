"use client";
import PomodoroSetting from "@/components/Pomodoro/PomodoroSetting";
import { handleApiError } from "@/lib/handleApiError";
import { useLazyGetPomodoroSettingQuery } from "@/redux/Pomodoro/pomodoroApi";
import React, { useEffect } from "react";

type Props = {};

const Page = (props: Props) => {
  const [trigger, { isLoading, isSuccess }] = useLazyGetPomodoroSettingQuery();
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await trigger({}).unwrap();
      } catch (error) {
        handleApiError(error);
      }
    };

    fetchSettings();
  }, []);
  return (
    <main className="flex flex-col gap-2 h-full">
      {isSuccess && <PomodoroSetting />}
    </main>
  );
};

export default Page;
