"use client";
import AddLabelDialog from "@/components/dashboard/labels/AddLabelDialog";
import LabelItem from "@/components/dashboard/labels/LabelItem";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";

type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const { workspaceTags, userRoleForWorkspace } = useSelector(
    (state: RootState) => state.workspace
  );

  return (
    <>
      <div className="flex flex-col gap-2 min-h-screen w-full  pb-20">
        <div className="flex flex-row items-center justify-between">
          <div className="w-full font-semibold tracking-tight capitalize text-5xl">
            Labels
          </div>
          {(userRoleForWorkspace === "ADMIN" ||
            userRoleForWorkspace === "OWNER") && (
            <Button onClick={() => setOpen(true)}>Add</Button>
          )}
        </div>
        {workspaceTags &&
          workspaceTags.map((tag, index) => (
            <LabelItem key={index} tag={tag} />
          ))}
      </div>
      <AddLabelDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default Page;
