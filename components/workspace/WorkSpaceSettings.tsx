"use client";
import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { Brain, CalendarRange, Files, Map, PencilRuler } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { buttonVariants } from "../ui/button";

type Props = {};

const WorkSpaceSettings = (props: Props) => {
  const router = useRouter();
  const { workspace_id } = useParams();
  const { myWorkspaceAsAdmin } = useSelector(
    (state: RootState) => state.workspace
  );

  const workspaceOptionsFields = useMemo(
    () => [
      {
        href: `/dashboard/workspace/${workspace_id}/tasks`,
        icon: <PencilRuler size={15} />,
        title: "Tasks",
      },
      {
        href: `/dashboard/workspace/${workspace_id}/mind-maps`,
        icon: <Map size={15} />,
        title: "Mind Maps",
      },
      {
        href: `/dashboard/workspace/${workspace_id}/schedules`,
        icon: <CalendarRange size={15} />,
        title: "Schedules",
      },
      {
        href: `/dashboard/workspace/${workspace_id}/study`,
        icon: <Brain size={15} />,
        title: "Study",
      },
      {
        href: `/dashboard/workspace/${workspace_id}/files`,
        icon: <Files size={15} />,
        title: "Files",
      },
    ],
    [workspace_id]
  );
  return (
    <div>
      <p className="text-xs sm:text-sm uppercase text-muted-foreground">
        Shortcuts
      </p>
      <div className="flex flex-col gap-2 w-full mt-2  items-start">
        {workspaceOptionsFields.map((field, i) => (
          <Link
            href={field.href}
            className={cn(
              "flex flex-row gap-2 w-full  rounded-sm h-7 px-2 text-sm items-center hover:bg-muted transition-colors duration-100"
            )}
            key={i}
          >
            {field.icon}
            {field.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WorkSpaceSettings;
