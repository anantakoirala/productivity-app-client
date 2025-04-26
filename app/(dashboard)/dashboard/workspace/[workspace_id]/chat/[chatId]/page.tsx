"use client";
import ChatContainer from "@/components/chat/ChatContainer";
import { handleApiError } from "@/lib/handleApiError";
import { useLazyGetConversationQuery } from "@/redux/Chat/chatApi";
import { RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = {};

const Page = (props: Props) => {
  const [notFound, setNotFound] = useState<boolean>(false);

  const { activeWorkspaceId, conversationId } = useSelector(
    (state: RootState) => state.workspace
  );
  const [trigger, { isLoading }] = useLazyGetConversationQuery();

  useEffect(() => {
    const fetchConversation = async () => {
      console.log("conversationid", conversationId);
      if (conversationId !== null && activeWorkspaceId !== 0) {
        try {
          const response = await trigger({
            workspaceId: activeWorkspaceId,
            chatId: conversationId,
            page: 1,
          }).unwrap();

          console.log("response", response);
        } catch (error: any) {
          if (error.status === 404) {
            setNotFound(true);
          } else {
            handleApiError(error);
          }
        }
      } else {
        setNotFound(true);
      }
    };

    fetchConversation();
  }, [activeWorkspaceId, conversationId]);
  return (
    <div className="h-full w-full max-h-fit">
      {notFound ? <div>Not found</div> : !isLoading && <ChatContainer />}
    </div>
  );
};

export default Page;
