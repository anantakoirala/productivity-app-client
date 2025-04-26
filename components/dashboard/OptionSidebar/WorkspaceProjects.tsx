"use client";
import { RootState } from "@/redux/store";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

type Props = {};

const WorkspaceProjects = (props: Props) => {
  const { projects, activeWorkspaceId } = useSelector(
    (state: RootState) => state.workspace
  );

  return (
    <div className="flex flex-col gap-2 w-full mt-2">
      {projects &&
        projects.map((project) => (
          <Link
            href={`/dashboard/workspace/${activeWorkspaceId}/projects/project/${project.id}`}
            className="flex flex-row gap-3  px-3 w-full h-8 items-center hover:bg-accent rounded-sm cursor-pointer text-sm"
            key={project.id}
          >
            <span className="text-muted-foreground">#</span>
            <span className="truncate">{project.title}</span>
          </Link>
        ))}
    </div>
  );
};

export default WorkspaceProjects;
