"use client";
import React from "react";
import { Button } from "./ui/button";
import { PanelLeftClose } from "lucide-react";
import { useToggleSidebar } from "@/contextProviders/ToogleSidebar";

type Props = {};

const CloseSideBar = (props: Props) => {
  const { isOpen, setIsOpen } = useToggleSidebar();
  return (
    <Button
      className={`absolute right-[-2.5rem] top-10 z-10 rounded-tl-none  lg:hidden ${
        !isOpen ? "hidden" : ""
      }`}
      size={"icon"}
      variant={"secondary"}
      onClick={() => {
        setIsOpen(false);
      }}
    >
      <PanelLeftClose />
    </Button>
  );
};

export default CloseSideBar;
