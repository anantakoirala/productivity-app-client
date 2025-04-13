import NewTask from "@/components/tasks/NewTask";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="flex flex-col gap-2 min-h-[40rem]">
      <NewTask />
    </div>
  );
};

export default Page;
