"use client";
import PomodoroContainer from "@/components/Pomodoro/PomodoroContainer";
import { handleApiError } from "@/lib/handleApiError";
import { useLazyGetPomodoroSettingQuery } from "@/redux/Pomodoro/pomodoroApi";

import React, { useEffect, useState } from "react";

type Props = {};

const Page = (props: Props) => {
  const [trigger, { isLoading }] = useLazyGetPomodoroSettingQuery();
  const [isReady, setIsReady] = useState<boolean>(false);

  // Fetting settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await trigger({}).unwrap();
        setIsReady(true);
      } catch (error) {
        handleApiError(error);
      }
    };

    fetchSettings();
  }, []);
  return (
    <div className="flex flex-col gap-2 h-full items-center">
      {isReady ? <PomodoroContainer /> : <div>Loading</div>}
    </div>
  );
};

export default Page;
