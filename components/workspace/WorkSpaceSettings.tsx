"use client";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

type Props = {};

const WorkSpaceSettings = (props: Props) => {
  const router = useRouter();
  const { myWorkspaceAsAdmin } = useSelector(
    (state: RootState) => state.workspace
  );
  return (
    <div className="w-full h-full flex flex-col p-2 gap-2">
      <span className="text-muted-foreground">Workspace Settings</span>
      <div className="flex flex-col p-2 gap-1">
        {myWorkspaceAsAdmin.map((myWorkspace) => (
          <div
            className="w-full h-10 flex flex-row gap-2 items-center hover:bg-primary/20 rounded-sm transition-colors duration-200 cursor-pointer"
            onClick={() =>
              router.push(`/dashboard/workspace/settings/${myWorkspace.id}`)
            }
          >
            {/* Image div */}
            <div className="w-12 h-full bg-muted rounded-l-sm">
              {myWorkspace.image ? (
                <>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${myWorkspace.image}`} // Adjust the path based on your setup
                    alt={myWorkspace.name}
                    width={40}
                    height={40}
                    className="rounded-sm object-cover w-full h-full"
                  />
                </>
              ) : (
                <>
                  <span className="text-lg font-semibold w-full h-full flex items-center justify-center ">
                    {myWorkspace.name[0].toUpperCase()}
                  </span>
                </>
              )}
            </div>
            {/* Name div */}
            <div className="w-full h-full truncate text-sm  flex flex-row items-center tracking-tight text-muted-foreground">
              {myWorkspace.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkSpaceSettings;
