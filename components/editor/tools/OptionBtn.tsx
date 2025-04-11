"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  onClick?: () => void;
  icon: React.ReactNode;
  className?: string;
};

const OptionBtn = ({ onClick, icon, className }: Props) => {
  return (
    <Button
      type="button"
      size={"icon"}
      variant={"ghost"}
      onClick={onClick}
      className={cn(
        "w-7 h-7 flex justify-center items-center rounded-sm text-muted-foreground",
        className
      )}
    >
      {icon}
    </Button>
  );
};

export default OptionBtn;
