"use client";
import { RootState } from "@/redux/store";

import React from "react";
import { useSelector } from "react-redux";

import OptionMenuProjectList from "./OptionMenuProjectList";

type Props = {};

const WorkspaceProjects = (props: Props) => {
  const { projects, activeWorkspaceId } = useSelector(
    (state: RootState) => state.workspace
  );

  return (
    <div className="flex flex-col gap-2 w-full mt-2">
      {projects &&
        projects.map((project) => (
          <OptionMenuProjectList
            project={project}
            key={`${project.id}-${project.title}`}
            workspaceId={activeWorkspaceId}
          />
        ))}
    </div>
  );
};

export default WorkspaceProjects;
