"use client";
import React, { useEffect, useState } from "react";
import EmojiSelector from "../EmojiSelector";
import TaskCalendar from "./TaskCalendar";
import TagSelector from "../tag/TagSelector";
import LinkTag from "../tag/LinkTag";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useLazyGetWorkspaceTagsQuery } from "@/redux/Workspace/workspaceApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema, TaskSchemaType } from "@/schema/TaskSchema";
import { Card, CardContent } from "../ui/card";
import TextareaAutosize from "react-textarea-autosize";
import { DateRange } from "react-day-picker";
import { Tag } from "@/types/Tag";
import { Button } from "../ui/button";
import { CustomColors } from "../tag/NewTag";

type Props = {};

const NewTask = (props: Props) => {
  const [content, setContent] = useState("");

  const [currentActiveTags, setCurrentActiveTags] = useState<Tag[]>([]);

  const onSelectActiveTags = (tag: Tag) => {
    setCurrentActiveTags((prev) => {
      const checkAvailability = prev.find((p) => p.id === tag.id);
      if (checkAvailability) {
        return prev;
      } else {
        return [...prev, tag];
      }
    });
  };

  const onUpdateActiveTags = (
    id: number,
    name: string,
    color: CustomColors
  ) => {
    setCurrentActiveTags((prev) => {
      return prev.map((pre) => (pre.id === id ? { ...pre, name, color } : pre));
    });
  };

  const onChangeHandle = (e: ContentEditableEvent) => {
    setContent(e.target.value);
  };

  const [trigger, { isLoading }] = useLazyGetWorkspaceTagsQuery();

  const { activeWorkspaceId, workspaceTags } = useSelector(
    (state: RootState) => state.workspace
  );

  const onPasteHandler = (event: React.ClipboardEvent) => {
    event.preventDefault();
    const plainText = event.clipboardData.getData("text/plain");
    setContent(plainText);
  };

  const form = useForm<TaskSchemaType>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      icon: "🧠",
      title: "",
      date: null,
      content: null,
    },
  });

  const { register, handleSubmit, setValue } = form;

  const onSubmit = (data: TaskSchemaType) => {
    console.log("data", data);
  };

  const setEmojiValue = (emoji: string) => {
    setValue("icon", emoji);
  };

  const setDateValue = (date: DateRange | undefined) => {
    setValue("date", date);
  };

  useEffect(() => {
    if (activeWorkspaceId) {
      trigger({ workspaceId: activeWorkspaceId });
    }
  }, [activeWorkspaceId]);

  return (
    // <div className="w-full flex items-start gap-2 sm:gap-4">
    //   Logo
    //   <div className="w-full flex flex-col gap-2">
    //     <div className="relative text-xl font-semibold">
    //       <ContentEditable
    //         tagName="span"
    //         className="outline-none inline-block min-h-0 relative z-20 w-full break-words break-all"
    //         html={content}
    //         onChange={onChangeHandle}
    //         onPaste={onPasteHandler}
    //         spellCheck={false}
    //       />
    //       {!content && (
    //         <span className="text-muted-foreground pointer-events-none absolute left-0 top-0 min-h-0">
    //           No Content
    //         </span>
    //       )}
    //     </div>
    //     <div className="w-full flex gap-1 flex-wrap flex-row">
    //       <TaskCalendar />
    //       <TagSelector />
    //       <LinkTag />
    //     </div>
    //   </div>
    //   {/* <EmojiSelector /> */}
    // </div>

    <Card>
      <form id="task-form" onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="py-4 sm:py-6">
          <div className="w-full flex items-start gap-2 sm:gap-4 mb-4">
            <EmojiSelector setEmojiValue={setEmojiValue} />
            <div className="w-full flex flex-col ">
              <TextareaAutosize
                {...register("title")}
                onKeyDown={(e) => {
                  if (e.key === "Enter") e.preventDefault();
                }}
                placeholder="Editor content"
                className="w-full resize-none appearance-none overflow-hidden bg-transparent placeholder:text-muted-foreground text-2xl font-semibold focus:outline-none"
              />
              <div className="w-full gap-1 flex flex-wrap  flex-row">
                <TaskCalendar setDateValue={setDateValue} />
                <TagSelector
                  onSelectActiveTags={onSelectActiveTags}
                  currentActiveTags={currentActiveTags}
                  onUpdateActiveTags={onUpdateActiveTags}
                />
                {currentActiveTags.map((activeTag) => (
                  <LinkTag key={activeTag.id} tag={activeTag} />
                ))}
              </div>
            </div>
          </div>
          <Button type="submit">Submit</Button>
        </CardContent>
      </form>
    </Card>
  );
};

export default NewTask;
