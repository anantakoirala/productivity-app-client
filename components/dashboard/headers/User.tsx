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
import React, { useContext, useEffect } from "react";
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
import { AuthContext } from "@/contextProviders/AuthProvider";
import { useRouter } from "next/navigation";
import { restApi } from "@/api";

type Props = {};

const User = (props: Props) => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const auth = useContext(AuthContext);
  if (!auth) {
    return <div>Loading..</div>;
  }

  const { name, email } = auth;

  const logOut = async () => {
    try {
      const response = await restApi.get("/api/auth/logout");
      router.push("/signin");
    } catch (error) {}
  };

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
            <DropdownMenuLabel>{name}</DropdownMenuLabel>
            <DropdownMenuLabel>{email}</DropdownMenuLabel>
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
        <DropdownMenuItem
          onClick={() => {
            router.push("/dashboard/settings");
          }}
        >
          <Settings size={16} /> Settings
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            logOut();
          }}
        >
          <LogOut size={16} /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default User;
