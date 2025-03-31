"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import ThemeCard from "./ThemeCard";

type Props = {};

const Theme = (props: Props) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, [setIsMounted]);

  if (!isMounted) {
    return <div>Loading</div>;
  }
  return (
    <Card className="bg-background border-none shadow-none">
      <CardHeader>
        <CardTitle>Theme</CardTitle>
        <CardDescription className="text-base">
          Select how you like your interface
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row gap-6">
        <ThemeCard onTheme={setTheme} theme="light" activeTheme={theme} />
        <ThemeCard onTheme={setTheme} theme="dark" activeTheme={theme} />
      </CardContent>
    </Card>
  );
};

export default Theme;
