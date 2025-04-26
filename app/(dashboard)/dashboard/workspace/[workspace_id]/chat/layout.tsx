import SocketProvider from "@/contextProviders/SocketProvider";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <SocketProvider>
      <div>{children}</div>
    </SocketProvider>
  );
};

export default layout;
