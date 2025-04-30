import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import NewMessageContainer from "./newMessage/NewMessageContainer";
import { Message } from "@/types/Message";
import MessageContainer from "./newMessage/MessageContainer";
import ChatHeader from "./header/ChatHeader";
import { SocketContext } from "@/contextProviders/SocketProvider";

type Props = {
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
};

const ChatContainer = ({
  messages,
  setMessages,
  page,
  setPage,
  totalPages,
}: Props) => {
  const socket = useContext(SocketContext);
  const [fetchedMessages, setFetchedMessages] = useState<Message[]>([]);
  const [initalScrollToDown, setInitialScrollToDown] = useState<boolean>(true);
  return (
    <div className="w-full h-[95%] flex flex-col justify-between p-4 border border-border rounded-md shadow-sm">
      <ChatHeader socket={socket} />

      <MessageContainer
        fetchedMessages={messages}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        setMessages={setMessages}
        initalScrollToDown={initalScrollToDown}
        setInitialScrollToDown={setInitialScrollToDown}
      />
      <NewMessageContainer
        setFetchedMessages={setMessages}
        socket={socket}
        setInitialScrollToDown={setInitialScrollToDown}
        initalScrollToDown={initalScrollToDown}
      />
    </div>
  );
};

export default ChatContainer;
