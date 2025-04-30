import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from "@/types/Message";

import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import MessageBlock from "./MessageBlock";
import { useLazyGetConversationQuery } from "@/redux/Chat/chatApi";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { handleApiError } from "@/lib/handleApiError";

type Props = {
  fetchedMessages: Message[];
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
  setMessages: Dispatch<SetStateAction<Message[]>>;
  initalScrollToDown: boolean;
  setInitialScrollToDown: Dispatch<SetStateAction<boolean>>;
};

const MessageContainer = ({
  fetchedMessages,
  page,
  setPage,
  totalPages,
  setMessages,
  initalScrollToDown,
  setInitialScrollToDown,
}: Props) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const prevScrollHeight = useRef<number>(0);

  const { activeWorkspaceId, conversationId } = useSelector(
    (state: RootState) => state.workspace
  );
  const [trigger, { isLoading, isFetching }] = useLazyGetConversationQuery();

  const handleScroll = async (e: any) => {
    setInitialScrollToDown(false);
    const container = e.target;

    if (container.scrollTop === 0 && !isFetching && page < totalPages) {
      try {
        const nextPage = page + 1;

        const oldScrollHeight = container.scrollHeight;

        const response = await trigger({
          workspaceId: activeWorkspaceId,
          chatId: conversationId,
          page: nextPage,
        }).unwrap();

        const newMsgs = response.conversation.Messages;

        if (Array.isArray(newMsgs) && newMsgs.length > 0) {
          // Create a new array and reverse the messages
          const reversedMessages = [...newMsgs].reverse();

          // Prepend the reversed new messages to the existing ones
          setMessages((prev) => [...reversedMessages, ...prev]);

          // Update page
          setPage(nextPage);

          // Maintain scroll position after DOM updates
          requestAnimationFrame(() => {
            const newScrollHeight = container.scrollHeight;
            container.scrollTop = newScrollHeight - oldScrollHeight;
          });
        }
      } catch (error) {
        handleApiError(error);
      }
    }
  };

  useEffect(() => {
    console.log("fetched", fetchedMessages);
  }, [fetchedMessages]);

  // useEffect(() => {
  //   if (initalScrollToDown) {
  //     if (bottomRef.current) {
  //       bottomRef.current.scrollIntoView({ behavior: "smooth" });
  //     }
  //   }
  // }, [fetchedMessages, initalScrollToDown]);

  return (
    <div
      className="h-96 overflow-y-auto"
      ref={scrollRef}
      onScroll={handleScroll}
    >
      {fetchedMessages.length > 0 ? (
        <div className="flex flex-col gap-2 px-3 py-2">
          {fetchedMessages.map((msg, index) => (
            <MessageBlock key={index} message={msg} />
          ))}
          <div ref={bottomRef} />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default MessageContainer;
