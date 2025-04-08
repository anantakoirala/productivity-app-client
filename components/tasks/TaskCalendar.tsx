"use client";
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { te, enUS } from "date-fns/locale";
import { Calendar } from "../ui/calendar";

type Props = {
  setDateValue: (date: DateRange | undefined) => void;
};

const TaskCalendar = ({ setDateValue }: Props) => {
  const [date, setDate] = useState<DateRange | undefined>(undefined);

  const onSelectDateChange = (date: DateRange | undefined) => {
    setDate(date);
    setDateValue(date);
  };

  return (
    <div className={cn("grid gap-2 ")}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            size={"sm"}
            variant={"outline"}
            className={cn(
              "w-fit h-fit text-xs justify-start text-left font-normal px-2.5 py-0.5"
            )}
          >
            <CalendarIcon size={16} className="mr-2 w-3 h-3" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd LLL y", {
                    locale: enUS,
                  })}{" "}
                  -{" "}
                  {format(date.to, "dd LLL y", {
                    locale: enUS,
                  })}
                </>
              ) : (
                format(date.from, "dd LLL y", {
                  locale: enUS,
                })
              )
            ) : (
              <span>pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onSelectDateChange}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TaskCalendar;
