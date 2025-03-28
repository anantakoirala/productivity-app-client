import ThemeSwitcher from "@/components/ThemeSwitcher";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <main className="flex flex-col gap-3  justify-center items-center min-h-screen p-4 md:p-6">
      <div className="w-full absolute top-0 left-0 flex justify-end">
        <div className="flex items-center gap-2 max-w-7xl p-4 md:p-6">
          <ThemeSwitcher />
        </div>
      </div>
      {children}
    </main>
  );
};

export default layout;
