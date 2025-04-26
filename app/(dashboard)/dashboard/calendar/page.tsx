"use client";
import Calendar from "@/components/calendar/Calendar";
import { useLazyGetCalendarDetailsQuery } from "@/redux/Calendar/calendarApi";
import { CalendarItem } from "@/types/CalendarItem";

import React, { useEffect, useState } from "react";

type Props = {};

const Page = (props: Props) => {
  const [trigger, { isLoading }] = useLazyGetCalendarDetailsQuery();
  const [tasks, setAllTasks] = useState<CalendarItem[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  useEffect(() => {
    trigger({})
      .then((res) => {
        console.log("res", res.data.allTasks);
        setAllTasks(res.data?.allTasks || []);
        setIsDataLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setIsDataLoaded(true);
      });
  }, []);
  return (
    <main className="h-full">
      {isDataLoaded ? (
        <Calendar allTasks={tasks} />
      ) : (
        <p>Loading calendar...</p>
      )}
    </main>
  );
};

export default Page;
