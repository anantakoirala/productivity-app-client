import { CalendarItem } from "@/types/CalendarItem";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";

import { ScrollArea } from "../ui/scroll-area";
import CalendarTask from "./CalendarTask";

type Props = {
  calendarItems: CalendarItem[];
  leftItemsAmount: number;
  small?: boolean;
};

const ShowMore = ({ calendarItems, leftItemsAmount, small }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {small ? (
          <Button
            className="mb-1 text-muted-foreground relative z-10 bg-secondary w-6 h-6 flex shadow-sm rounded-full text-[0.70rem]"
            size={"icon"}
            variant={"ghost"}
          >
            {leftItemsAmount > 10 ? "+9" : leftItemsAmount}
          </Button>
        ) : (
          <Button
            className="w-fit py-0.5 px-2 h-7 text-muted-foreground"
            size={"sm"}
            variant={"ghost"}
          >
            {leftItemsAmount > 10 ? "+9" : leftItemsAmount} {t("MORE")}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>All Events</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
            quaerat enim commodi?
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-64">
          <div className="h-full flex flex-col gap-3 p-1">
            {calendarItems.map((item, index) => (
              <CalendarTask key={index} dayInfo={item} showMore />
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ShowMore;
