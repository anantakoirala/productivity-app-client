"use client";

import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import EmojiSelector from "@/components/EmojiSelector";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "@/components/ui/button";
import { Send, Paperclip, X } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useSaveMessageMutation } from "@/redux/Chat/chatApi";
import { Message } from "@/types/Message";
import { Socket } from "socket.io-client";
import { setSingleMessage } from "@/redux/Chat/chatSlice";

const MAX_FILE_SIZE_MB = 1;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

type Props = {
  setFetchedMessages: Dispatch<SetStateAction<Message[]>>;
  socket?: Socket;
  initalScrollToDown: boolean;
  setInitialScrollToDown: Dispatch<SetStateAction<boolean>>;
};

const NewMessageContainer = ({
  setFetchedMessages,
  socket,
  initalScrollToDown,
  setInitialScrollToDown,
}: Props) => {
  const [message, setMessage] = useState("");

  const [files, setFiles] = useState<File[]>([]);
  const dispatch = useDispatch();
  const [fileErrors, setFileErrors] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { activeWorkspaceId, conversationId } = useSelector(
    (state: RootState) => state.workspace
  );

  const { messages } = useSelector((state: RootState) => state.chat);

  const [saveMessage, { isLoading }] = useSaveMessageMutation();
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
      socket.emit("send_message", {
        workspaceId: activeWorkspaceId,
        message: "new message",
      });
    }

    setMessage("");
    setInitialScrollToDown(true);
    setFiles([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const filesArray = Array.from(selectedFiles);
      const validFiles = validateFiles(filesArray);
      setFiles((prev) => [...prev, ...validFiles]);
    }
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = validateFiles(droppedFiles);
    setFiles((prev) => [...prev, ...validFiles]);
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (fileErrors.length > 0) {
      fileErrors.forEach((err) => toast.error(err));
      setFileErrors([]); // Optional: clear errors after showing
    }
  }, [fileErrors]);

  // Setting redux message in local state
  useEffect(() => {
    if (messages) {
      const sortedMessages = [...messages].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      setFetchedMessages(sortedMessages);
    }
  }, [messages]);

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
      setFetchedMessages((prevMessages) => [...prevMessages, data.message]);
    };

    socket.on("new_message", handleNewMessage);

    return () => {
      socket.off("new_message", handleNewMessage);
    };
  }, [socket, activeWorkspaceId]);

  return (
    <div
      className="p-2 w-full flex flex-col gap-2 bg-popover rounded-b-md px-4 py-2 shadow-sm border-t border-border"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
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
          disabled={isLoading || message.trim().length === 0}
          className="w-8 h-8 sm:w-10 sm:h-10"
          size="icon"
          variant="ghost"
          onClick={handleSend}
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>

      {/* File Previews */}
      {files.length > 0 && (
        <div className="flex gap-2 flex-wrap px-1">
          {files.map((file, idx) => (
            <div
              key={idx}
              className="relative w-20 h-20 border rounded overflow-hidden flex items-center justify-center text-xs text-muted-foreground"
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
  );
};

export default NewMessageContainer;
