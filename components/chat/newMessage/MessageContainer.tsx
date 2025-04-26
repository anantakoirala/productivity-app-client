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
};

const MessageContainer = ({ fetchedMessages }: Props) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [userScrolled, setUserScrolled] = useState(false);

  const [page, setPage] = useState(1);
  const pageRef = useRef(1);
  const [notification, setNotification] = useState<number>(0);

  const prevScrollHeight = useRef<number>(0);

  const { activeWorkspaceId, conversationId } = useSelector(
    (state: RootState) => state.workspace
  );
  const [trigger, { isLoading }] = useLazyGetConversationQuery();

  const handleScroll = useCallback(async () => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const isNearBottom =
      scrollContainer.scrollTop >=
      scrollContainer.scrollHeight - scrollContainer.clientHeight - 10;

    setUserScrolled(true);
    if (isNearBottom) {
      setNotification(0);
    }

    // ⬆️ If at top, fetch older messages
    if (scrollContainer.scrollTop === 0) {
      prevScrollHeight.current = scrollContainer.scrollHeight;

      try {
        const response = await trigger({
          workspaceId: activeWorkspaceId,
          chatId: conversationId,
          page,
        }).unwrap();
        console.log("scrooll response", response);
        pageRef.current += 1; // increment manually
        setPage(pageRef.current); // update state if needed
      } catch (error: any) {
        handleApiError(error);
      }

      // await fetchOlderMessages();

      // 🧷 Maintain scroll position after older messages are prepended
      requestAnimationFrame(() => {
        const newScrollHeight = scrollContainer.scrollHeight;
        scrollContainer.scrollTop = newScrollHeight - prevScrollHeight.current;
      });
    }
  }, []);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer && !userScrolled) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [userScrolled]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [fetchedMessages]);

  return (
    <div
      className="h-96 overflow-y-auto"
      ref={scrollRef}
      onScroll={handleScroll}
    >
      <div className="flex flex-col gap-2 px-3 py-2">
        {fetchedMessages.map((msg, index) => (
          <MessageBlock key={index} message={msg} />
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default MessageContainer;
