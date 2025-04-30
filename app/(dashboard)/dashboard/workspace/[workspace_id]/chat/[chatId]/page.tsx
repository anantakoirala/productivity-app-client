"use client";
import ChatContainer from "@/components/chat/ChatContainer";
import ChatHeader from "@/components/chat/header/ChatHeader";
import MessageBlock from "@/components/chat/newMessage/MessageBlock";
import MessageContainer from "@/components/chat/newMessage/MessageContainer";
import NewMessageContainer from "@/components/chat/newMessage/NewMessageContainer";
import TextareaAutosize from "react-textarea-autosize";
import EmojiSelector from "@/components/EmojiSelector";
import { Button } from "@/components/ui/button";
import { SocketContext } from "@/contextProviders/SocketProvider";
import { handleApiError } from "@/lib/handleApiError";
import {
  useLazyGetConversationQuery,
  useSaveMessageMutation,
} from "@/redux/Chat/chatApi";
import { RootState } from "@/redux/store";
import { Message } from "@/types/Message";
import { Paperclip, Send, X } from "lucide-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "@/components/Loader";

const MAX_FILE_SIZE_MB = 1;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

type Props = {};

const Page = (props: Props) => {
  const [notFound, setNotFound] = useState<boolean>(false);
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [fileErrors, setFileErrors] = useState<string[]>([]);
  const [initialScrollToDown, setInitialScrollToDown] = useState<boolean>(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState<Message[]>([]);

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const { activeWorkspaceId, conversationId } = useSelector(
    (state: RootState) => state.workspace
  );
  const [trigger, { isLoading, isFetching }] = useLazyGetConversationQuery();

  const [saveMessage, { isLoading: sendMessageLoading }] =
    useSaveMessageMutation();

  useEffect(() => {
    const fetchConversation = async () => {
      if (conversationId !== null && activeWorkspaceId !== 0) {
        try {
          const response = await trigger({
            workspaceId: activeWorkspaceId,
            chatId: conversationId,
            page: 1,
          }).unwrap();
          const sortedMessages = [...response.conversation.Messages].sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );

          setMessages(sortedMessages);
          setTotalPages(response.totalPages);
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

  // Set emoji value
  const setEmojiValue = (emoji: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newText =
      message.substring(0, start) + emoji + message.substring(end);

    setMessage(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
    }, 0);
  };

  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const filesArray = Array.from(selectedFiles);
      const validFiles = validateFiles(filesArray);
      setFiles((prev) => [...prev, ...validFiles]);
    }
    e.target.value = "";
  };

  // File validation
  const validateFiles = (incomingFiles: File[]) => {
    const validFiles: File[] = [];
    const errors: string[] = [];

    incomingFiles.forEach((file) => {
      const isValidType = ALLOWED_TYPES.includes(file.type);
      const isValidSize = file.size <= MAX_FILE_SIZE_MB * 1024 * 1024;

      if (!isValidType) {
        errors.push(`"${file.name}" is not a supported file type.`);
      } else if (!isValidSize) {
        errors.push(
          `"${file.name}" exceeds the ${MAX_FILE_SIZE_MB}MB size limit.`
        );
      } else {
        validFiles.push(file);
      }
    });

    setFileErrors(errors);
    return validFiles;
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Send message
  const handleSend = async () => {
    if (!message.trim() && files.length === 0) return;

    const formData = new FormData();
    formData.append("message", message);
    formData.append("workspaceId", activeWorkspaceId as unknown as string);
    formData.append("chatId", conversationId as unknown as string);
    files.forEach((file) => formData.append("files", file));

    await saveMessage(formData).unwrap();

    // Send the message to the backend via socket
    if (socket && activeWorkspaceId) {
      console.log("hello");
      socket.emit("send_message", {
        workspaceId: activeWorkspaceId,
        message: "new message",
      });
    }

    setMessage("");

    setFiles([]);
  };

  const handleScroll = async (e: any) => {
    const scrollTop = e.target.scrollTop;

    if (scrollTop === 0 && !isFetching && page < totalPages) {
      const nextPage = page + 1;

      try {
        const response = await trigger({
          workspaceId: activeWorkspaceId,
          chatId: conversationId,
          page: nextPage,
        }).unwrap();

        const sortedMessages = [...response.conversation.Messages].sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );

        setMessages((prev) => [...sortedMessages, ...prev]);
        setPage(nextPage);
        setInitialScrollToDown(false);
        if (scrollRef.current) {
          setTimeout(() => {
            scrollRef?.current?.scrollTo({
              top: scrollRef.current.scrollTop + 100, // Adjust this value as needed
              behavior: "smooth", // 'auto' or 'smooth'
            });
          }, 1000);
        }
      } catch (error: any) {
        handleApiError(error);
      }
    }
  };

  useEffect(() => {
    if (initialScrollToDown) {
      if (bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [messages, initialScrollToDown]);

  // Join user to the workspace chat
  useEffect(() => {
    if (socket && activeWorkspaceId) {
      // Emit 'join_room' event with workspaceId
      socket.emit("join_room", { workspaceId: activeWorkspaceId });

      // Listen for 'room_joined' event from the server
      socket.on("room_joined", (data) => {
        if (data.success) {
          console.log(`Successfully joined room: ${data.workspaceId}`);
          // You can also set state here to update the UI
        } else {
          console.error(`Failed to join room: ${data.workspaceId}`);
        }
      });

      // Cleanup: remove listener when component unmounts or socket changes
      return () => {
        socket.off("room_joined");
      };
    }
  }, [socket, activeWorkspaceId]);

  // recive socket message sent from the server
  useEffect(() => {
    if (!socket || !activeWorkspaceId) return;

    const handleNewMessage = (data: any) => {
      console.log("New message received:", data.message);
      //dispatch(setSingleMessage(data.message));
      setMessages((prevMessages) => [...prevMessages, data.message]);
      setInitialScrollToDown(true);
    };

    socket.on("new_message", handleNewMessage);

    return () => {
      socket.off("new_message", handleNewMessage);
    };
  }, [socket, activeWorkspaceId]);

  return (
    <div className="h-full w-full min-h-screen">
      {notFound ? (
        <div>Not found</div>
      ) : !isLoading ? (
        <div className="w-full h-[100%] md:h-[90%] flex flex-col justify-between p-2 border border-border rounded-md shadow-sm mb-14">
          <ChatHeader socket={socket} />
          {/* Message container */}
          <div
            className={`h-[65%] ${
              files.length > 0 ? "md:h-[24rem]" : "md:h-[28rem]"
            } overflow-y-auto pb-2`}
            ref={scrollRef}
            onScroll={handleScroll}
          >
            {isFetching && (
              <div className="flex w-full items-center justify-center">
                <Loader />
              </div>
            )}
            {messages.length > 0 ? (
              <div className="flex flex-col gap-2 px-3 py-2">
                {messages.map((msg, index) => (
                  <MessageBlock key={index} message={msg} />
                ))}
                <div ref={bottomRef} />
              </div>
            ) : (
              <div>Loading...</div>
            )}
          </div>

          {/* <NewMessageContainer /> */}
          <div className="p-2 w-full flex flex-col gap-2 bg-popover rounded-b-md px-4 py-2 shadow-sm border-t border-border">
            <div className="w-full flex items-center gap-2">
              <EmojiSelector setEmojiValue={setEmojiValue} />
              <Button
                size="icon"
                variant="ghost"
                onClick={() => fileInputRef.current?.click()}
              >
                <Paperclip className="w-5 h-5" />
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                hidden
                onChange={handleFileChange}
              />
              <TextareaAutosize
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault(); // prevent newline
                    if (message.trim() !== "") {
                      handleSend();
                    }
                  }
                }}
                placeholder="New Message"
                className="w-full resize-none bg-transparent placeholder:text-muted-foreground text-base focus:outline-none"
              />
              <Button
                disabled={sendMessageLoading || message.trim().length === 0}
                className="w-8 h-8 sm:w-10 sm:h-10"
                size="icon"
                variant="ghost"
                onClick={handleSend}
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            {files.length > 0 && (
              <div className="flex gap-2 flex-wrap px-1">
                {files.map((file, idx) => (
                  <div
                    key={idx}
                    className="relative w-10 h-10 md:w-16 md:h-16 border rounded overflow-hidden flex items-center justify-center text-xs text-muted-foreground"
                  >
                    <button
                      onClick={() => handleRemoveFile(idx)}
                      className="absolute top-0 right-0 m-0.5 bg-black/70 text-white p-0.5 rounded-full hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    {file.type.startsWith("image/") ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="px-1 text-center">{file.name}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
            {fileErrors.length > 0 && (
              <div className="px-1 text-sm text-red-500 space-y-1">
                {fileErrors.map((error, idx) => (
                  <div key={idx}>⚠️ {error}</div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Page;
