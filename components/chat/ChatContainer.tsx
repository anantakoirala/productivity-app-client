import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import NewMessageContainer from "./newMessage/NewMessageContainer";
import { Message } from "@/types/Message";
import MessageContainer from "./newMessage/MessageContainer";
import ChatHeader from "./header/ChatHeader";
import { SocketContext } from "@/contextProviders/SocketProvider";

type Props = {};

const ChatContainer = (props: Props) => {
  const socket = useContext(SocketContext);
  const [fetchedMessages, setFetchedMessages] = useState<Message[]>([]);
  return (
    <div className="w-full h-[95%] flex flex-col justify-between p-4 border border-border rounded-md shadow-sm">
      <ChatHeader socket={socket} />
      <div className="flex-grow ">Chat</div>
      <MessageContainer fetchedMessages={fetchedMessages} />
      <NewMessageContainer
        setFetchedMessages={setFetchedMessages}
        socket={socket}
      />
    </div>
  );
};

export default ChatContainer;
