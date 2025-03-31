"use client";
import React from "react";
import ShortCutSidebar from "./ShortCutSidebar";
import OptionsSidebar from "./OptionsSidebar";
import CloseSideBar from "../CloseSideBar";
import { useToggleSidebar } from "@/contextProviders/ToogleSidebar";

type Props = {};

const Sidebar = (props: Props) => {
  const { isOpen, setIsOpen } = useToggleSidebar();
  return (
    <>
      <aside
        className={`fixed z-50 top-0 h-full left-0 lg:static bg-background border-r flex lg:translate-x-0 transition-all duration-300 ${
          isOpen ? "translate-x-0 shadow-sm" : "translate-x-[-100%]"
        }`}
      >
        <ShortCutSidebar />

        <OptionsSidebar />
        <CloseSideBar />
      </aside>
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed h-screen w-full top-0 left-0 bg-black/80 z-40 lg:hidden ${
          isOpen ? "block" : "hidden"
        }`}
      ></div>
    </>
  );
};

export default Sidebar;
