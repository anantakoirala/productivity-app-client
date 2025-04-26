"use client";
import { getMonth } from "@/lib/getMonths";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import { CalendarItem } from "@/types/CalendarItem";
import { date } from "zod";

type Props = {
  allTasks: CalendarItem[];
};

const Calendar = ({ allTasks }: Props) => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const [monthIndex, setMonthIndex] = useState(dayjs().month());

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  const changeMonthHandler = useCallback((change: "next" | "prev") => {
    if (change === "next") {
      setMonthIndex((prev) => prev + 1);
    } else {
      setMonthIndex((prev) => prev - 1);
    }
  }, []);

  const resetMonthHandler = useCallback(() => {
    if (monthIndex === dayjs().month()) return;
    setMonthIndex(dayjs().month());
  }, [monthIndex]);
  return (
    <div className="w-full h-full flex flex-col gap-8 items-center">
      <CalendarHeader
        monthIndex={monthIndex}
        onChangeMonthHandler={changeMonthHandler}
        onResetMonthHandler={resetMonthHandler}
      />
      <CalendarGrid
        currentMonth={currentMonth}
        monthIndex={monthIndex}
        allTasks={allTasks}
      />
    </div>
  );
};

export default Calendar;
