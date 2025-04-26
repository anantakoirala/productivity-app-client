"use client";

import { RootState } from "@/redux/store";
import React, { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io, { Socket } from "socket.io-client";

export const SocketContext = createContext<Socket | undefined>(undefined);

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { activeWorkspaceId } = useSelector(
    (state: RootState) => state.workspace
  );

  const [socket, setSocket] = useState<Socket | undefined>(undefined);

  useEffect(() => {
    if (!activeWorkspaceId) return;

    const newSocket = io(`${process.env.NEXT_PUBLIC_SOCKETURL}`, {
      withCredentials: true,
      query: { organizationId: activeWorkspaceId },
      reconnection: false,
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [activeWorkspaceId]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
