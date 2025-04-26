"use client";
import { CalendarItem } from "@/types/CalendarItem";
import dayjs from "dayjs";
import React, { useMemo } from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import CalendarTask from "./CalendarTask";
import ShowMore from "./ShowMore";
import { useIsMobile } from "@/hooks/user-mobile";

type Props = {
  calendarItems: CalendarItem[];
};

const CalendarTasks = ({ calendarItems }: Props) => {
  const visibleItems = useMemo(() => {
    return calendarItems.slice(0, 2);
  }, [calendarItems]);

  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="relative flex flex-col items-center justify-center py-1 h-full overflow-y-clip">
        {calendarItems.length >= 1 && (
          <ShowMore
            small
            leftItemsAmount={calendarItems.length}
            calendarItems={calendarItems}
          />
        )}
      </div>
    );
  } else {
    return (
      <ScrollArea className="w-full h-full">
        <div className="relative flex flex-col gap-1.5 py-1 h-full overflow-y-clip">
          {visibleItems.map((calendarItem) => (
            <CalendarTask key={calendarItem.taskId} dayInfo={calendarItem} />
          ))}
          {calendarItems.length > 3 && (
            <ShowMore
              calendarItems={calendarItems}
              leftItemsAmount={calendarItems.length - visibleItems.length}
            />
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    );
  }
};

export default CalendarTasks;
