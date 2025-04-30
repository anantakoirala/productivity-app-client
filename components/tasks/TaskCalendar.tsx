"use client";
import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { Calendar } from "../ui/calendar";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type Props = {
  setDateValue: (date: Date | undefined) => void;
};

const TaskCalendar = ({ setDateValue }: Props) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const onSelectDateChange = (date: Date | undefined) => {
    if (date) {
      setDate(date);
      setDateValue(date); // Pass the date to parent component
    } else {
      setDate(undefined); // Clear the date
      setDateValue(undefined); // Pass `undefined` to clear in parent
    }
  };

  const handleClearDate = () => {
    setDate(undefined);
    setDateValue(undefined); // Clear the selected date
  };

  const { task } = useSelector((state: RootState) => state.task);

  useEffect(() => {
    if (task.date) {
      const parsedDate = new Date(task.date); // Parse the string into a Date object
      setDate(parsedDate);
      setDateValue(parsedDate); // Now both are Date objects
    }
  }, [task.date]);

  return (
    <div className={cn("flex items-center gap-1 ")}>
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
            {date ? (
              format(date, "dd LLL y", {
                locale: enUS,
              })
            ) : (
              <span>pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onSelectDateChange}
            disabled={{ before: new Date() }}
            className="rounded-md border shadow"
          />
          <div className="mt-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full text-red-500"
              onClick={handleClearDate}
            >
              Clear Date
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TaskCalendar;
