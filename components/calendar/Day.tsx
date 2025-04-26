"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import dayjs, { Dayjs } from "dayjs";
import isSameOArfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { CalendarItem } from "@/types/CalendarItem";

import CalendarTasks from "./CalendarTasks";

dayjs.extend(isSameOArfter);
dayjs.extend(isSameOrBefore);

type Props = {
  day: Dayjs;
  monthIndex: number; // New prop to check if the day is from the previous month
  allTasks: CalendarItem[];
};

const Day = ({ day, monthIndex, allTasks }: Props) => {
  const isPreviousMonth = day.month() !== monthIndex;
  const [dayTask, setDayTask] = useState<CalendarItem[]>([]);

  useEffect(() => {
    const filterTasks = allTasks.filter((dayInfo, i) => {
      const startDate = dayjs(dayInfo.taskDate?.from);
      const endDate = dayInfo.taskDate?.to ? dayjs(dayInfo.taskDate?.to) : null;

      if (startDate.isSame(day) && !endDate) return dayInfo;
      else if (day.isSameOrAfter(startDate) && day.isSameOrBefore(endDate)) {
        return dayInfo;
      }
    });

    setDayTask(filterTasks);
  }, [day, allTasks]);

  return (
    <div
      className={cn(
        `border border-border flex flex-col  transition-opacity duration-200 bg-background py-1 px-1.5 ${
          day.format("ddd") === "Sat" || day.format("ddd") === "Sun"
            ? "bg-accent "
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
