"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { CalendarItem } from "@/types/CalendarItem";
import CalendarTasks from "./CalendarTasks";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

type Props = {
  day: dayjs.Dayjs;
  monthIndex: number;
  allTasks: CalendarItem[];
};

const Day = ({ day, monthIndex, allTasks }: Props) => {
  const isPreviousMonth = day.month() !== monthIndex;
  const [dayTask, setDayTask] = useState<CalendarItem[]>([]);

  useEffect(() => {
    const filterTasks = allTasks.filter((dayInfo) => {
      if (!dayInfo.taskDate) return false; // No task date, skip
      const taskDate = dayjs(dayInfo.taskDate); // Convert task.date to Dayjs object

      // Convert the UTC task date to the local time zone
      const localTaskDate = dayjs(taskDate.toDate()); // `toDate()` converts to JavaScript Date object
      const localDay = dayjs(day.toDate()); // Convert current day to a JavaScript Date object

      // Match the same day (in local time)
      return localTaskDate.isSame(localDay, "day");
    });

    setDayTask(filterTasks);
  }, [day, allTasks]);

  return (
    <div
      className={cn(
        `border border-border flex flex-col transition-opacity duration-200 bg-background py-1 px-1.5 ${
          day.format("ddd") === "Sat" || day.format("ddd") === "Sun"
            ? "bg-accent"
            : ""
        } ${isPreviousMonth ? "opacity-50 dark:opacity-25" : ""}`
      )}
    >
      <div className="flex flex-col items-end mb-2">
        <p
          className={`text-sm p-1 mt-1 text-center ${
            day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
              ? "transition-colors duration-200 bg-primary text-white w-7 rounded-full"
              : ""
          }`}
        >
          {day.format("DD")}
        </p>
      </div>

      <CalendarTasks calendarItems={dayTask} />
    </div>
  );
};

export default Day;
