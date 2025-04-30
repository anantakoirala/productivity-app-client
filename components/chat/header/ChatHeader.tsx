import { RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";

type Props = {
  socket?: Socket;
};

const ChatHeader = ({ socket }: Props) => {
  const [onlineUsers, setOnlineUsers] = useState<number>(0);
  const { activeWorkspaceId, conversationId, activeWorkSpaceName } =
    useSelector((state: RootState) => state.workspace);

  useEffect(() => {
    if (socket && activeWorkspaceId) {
      socket.emit("get_room_users", { workspaceId: activeWorkspaceId });

      socket.on("room_user_count", (data) => {
        console.log("Users in room:", data.count);
        setOnlineUsers(data.count);
      });
    }
  }, [socket, activeWorkspaceId]);
  return (
    <div className="w-full border-b border-border shadow-sm">
      <div className="px-4 py-1 flex flex-row items-center justify-between">
        <h3 className="text-primary text-lg font-semibold">
          {activeWorkSpaceName} chat
        </h3>
        <div className="flex items-center gap-1">
          <div className="w-3.5 h-3.5 rounded-full border-border shadow-sm border bg-primary"></div>
          <p className="text-sm">{onlineUsers} online</p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
