"use client";
import { RootState } from "@/redux/store";
import { usePathname } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

type Props = {};

const Welcome = (props: Props) => {
  const { name, username } = useSelector((state: RootState) => state.user);
  const pathName = usePathname();

  if (pathName === "/dashboard") {
    return (
      <div className="space-y-1">
        <p className="font-bold sm:text-3xl text-2xl">
          Welcome Back{" "}
          <span>{name ? (name ? `${name} ` : name) : username}</span> 👋
        </p>
        <p className="text-muted-foreground max-w-sm sm:max-w-xl"></p>
      </div>
    );
  }
};

export default Welcome;
