import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <main className="flex flex-col gap-3  justify-center items-center min-h-screen p-4 md:p-6">
      {children}
    </main>
  );
};

export default layout;
