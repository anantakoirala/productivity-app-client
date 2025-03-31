"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useEffect } from "react";
import {
  Check,
  Link,
  LogOut,
  Moon,
  Settings,
  Sun,
  User as UserIcon,
} from "lucide-react";
import { useTheme } from "next-themes";

type Props = {};

const User = (props: Props) => {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    console.log("theme", theme);
  }, [theme]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background">
        <div className="h-10 w-10 bg-muted rounded-full flex justify-center items-center text-muted-foreground relative overflow-hidden">
          <UserIcon />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={10} className="">
        <div className="flex items-center gap-1 px-2">
          <div className="h-8 w-8 bg-muted rounded-full flex justify-center items-center text-muted-foreground relative overflow-hidden">
            <UserIcon />
          </div>
          <div className="">
            <DropdownMenuLabel>Ananta</DropdownMenuLabel>
            <DropdownMenuLabel>ananta@gmail.com</DropdownMenuLabel>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="cursor-pointer gap-2">
              <Moon size={16} className="hidden dark:inline-block" />
              <Sun size={16} className="dark:hidden" />
              <span>Theme</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent sideOffset={10}>
                <DropdownMenuItem
                  onClick={() => {
                    console.log("clicked");
                    setTheme("dark");
                  }}
                  className="flex justify-between items-center cursor-pointer"
                >
                  <span>Dark</span>
                  {theme === "dark" && <Check size={14} />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    console.log("clicked");
                    setTheme("light");
                  }}
                  className="flex justify-between items-center cursor-pointer"
                >
                  <span>Light</span>
                  {theme === "light" && <Check size={14} />}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Settings size={16} /> Settings
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogOut size={16} /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default User;
