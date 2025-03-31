"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Moon, Sun } from "lucide-react";
import { Badge } from "../ui/badge";

type Props = {
  theme: "light" | "dark";
  activeTheme?: string;
  onTheme: (theme: string) => void;
};

const ThemeCard = ({ theme, activeTheme, onTheme }: Props) => {
  return (
    <Card
      tabIndex={1}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onTheme(theme);
        }
      }}
      onClick={() => {
        onTheme(theme);
      }}
      className={`${
        activeTheme === theme ? "border-primary/50" : ""
      } w-72 hover:bg-accent hover:text-accent-foreground duration-200 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-x-0 space-y-0">
        <div className="flex items-center gap-2">
          {theme === "light" && <Sun size={20} />}

          {theme === "dark" && <Moon size={20} />}
          <CardTitle className="text-2xl">
            {theme[0].toUpperCase() + theme.slice(1)} them
          </CardTitle>
        </div>
        {activeTheme === theme && <Badge variant={"default"}>Active</Badge>}
      </CardHeader>
      <CardContent className="h-44"></CardContent>
      <CardFooter>
        <p>Default {theme}</p>
      </CardFooter>
    </Card>
  );
};

export default ThemeCard;
