"use client";
import dayjs from "dayjs";
import React, { Fragment } from "react";
import Day from "./Day";
import { CalendarItem } from "@/types/CalendarItem";

type Props = {
  currentMonth: dayjs.Dayjs[][];
  monthIndex: number;
  allTasks: CalendarItem[];
};

const CalendarGrid = ({ currentMonth, monthIndex, allTasks }: Props) => {
  const daysOfWeek = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  return (
    <>
      <div className="w-full h-full flex flex-col gap-3">
        <div className="w-full grid grid-cols-7 text-right">
          {daysOfWeek.map((day, i) => (
            <p className="mr-2 font-semibold text-sm" key={i}>
              {day.toLocaleUpperCase()}
            </p>
          ))}
        </div>
        <div className="w-full h-full grid grid-cols-7 grid-rows-5">
          {currentMonth.map((row, i) => (
            <Fragment key={i}>
              {row.map((day, index) => (
                <Day
                  day={day}
                  monthIndex={monthIndex}
                  key={index}
                  allTasks={allTasks}
                />
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default CalendarGrid;
