"use client";
import { useToggleSidebar } from "@/contextProviders/ToogleSidebar";
import React from "react";
import { Button } from "./ui/button";
import { PanelLeftOpen } from "lucide-react";

type Props = {};

const OpenSidebar = (props: Props) => {
  const { isOpen, setIsOpen } = useToggleSidebar();
  return (
    <Button
      onClick={() => setIsOpen(true)}
      className="text-muted-foreground lg:hidden"
      variant={"ghost"}
      size={"icon"}
    >
      <PanelLeftOpen />
    </Button>
  );
};

export default OpenSidebar;
