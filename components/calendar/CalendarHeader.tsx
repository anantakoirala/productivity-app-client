"use client";
import dayjs from "dayjs";
import React from "react";
import { Button } from "../ui/button";

type Props = {
  monthIndex: number;
  onResetMonthHandler: () => void;
  onChangeMonthHandler: (change: "next" | "prev") => void;
};

const CalendarHeader = ({
  monthIndex,
  onChangeMonthHandler,
  onResetMonthHandler,
}: Props) => {
  const dateTime = dayjs(new Date(dayjs().year(), monthIndex));

  return (
    <div className="w-full flex flex-col sm:flex-row justify-between items-center">
      <h1 className="text-xl sm:text-2xl md:text-3xl mb-4 md:mb-0">
        <span className="font-bold">{dateTime.format("MMMM YYYY")}</span>
      </h1>
      <div className="">
        <Button
          onClick={() => {
            onChangeMonthHandler("prev");
          }}
          className="rounded-e-none px-2 py-1 h-8 sm:h-10 sm:px-4 sm:py-2"
          variant={"outline"}
        >
          Prev
        </Button>
        <Button
          onClick={onResetMonthHandler}
          className="rounded-none px-2 py-1 h-8 sm:h-10 sm:px-4 sm:py-2"
          variant={"outline"}
        >
          Reset
        </Button>
        <Button
          onClick={() => {
            onChangeMonthHandler("next");
          }}
          className="rounded-s-none px-2 py-1 h-8 sm:h-10 sm:px-4 sm:py-2"
          variant={"outline"}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default CalendarHeader;
