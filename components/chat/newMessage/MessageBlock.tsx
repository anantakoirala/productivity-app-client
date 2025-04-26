import { Message } from "@/types/Message";
import { formatDistanceToNow } from "date-fns";
import { MoreHorizontal, UserIcon } from "lucide-react";
import React from "react";

type Props = {
  message: Message;
};

const MessageBlock = ({ message }: Props) => {
  return (
    <div className="flex justify-between items-start">
      <div className="flex flex-col gap-1">
        <div className="flex gap-2 items-start">
          <div className="h-10 w-10 bg-muted rounded-full flex justify-center items-center text-muted-foreground relative overflow-hidden">
            <UserIcon />
          </div>
          <div className="flex flex-col w-fit">
            <div className="flex gap-1 items-center ">
              <p className="text-primary">{message.sender.username}</p>
              <p className="text-muted-foreground text-xs">
                {formatDistanceToNow(new Date(message.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
            <p className="break-words">{message.content}</p>
            {message.AdditionalResource &&
              message.AdditionalResource.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-3">
                  {message.AdditionalResource.map((res) => (
                    <div
                      key={res.id}
                      className="border rounded p-2 max-w-xs w-fit text-sm text-muted-foreground"
                    >
                      {res.type === "Image" ? (
                        <img
                          src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${res.name}`}
                          alt={res.name}
                          className="w-32 h-32 object-cover rounded"
                        />
                      ) : (
                        <a
                          href={""}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          📄 {res.name}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
          </div>
        </div>
        <div className=""></div>
      </div>
      {/* <div className="">
        <MoreHorizontal />
      </div> */}
    </div>
  );
};

export default MessageBlock;
