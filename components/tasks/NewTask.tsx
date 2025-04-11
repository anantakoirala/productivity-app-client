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

import {
  useLazyGetIndividualTaskQuery,
  useUpdateTaskMutation,
} from "@/redux/task/taskApi";
import { notFound, useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { handleApiError } from "@/lib/handleApiError";
import toast from "react-hot-toast";

type Props = {};

const Editor = dynamic(() => import("../editor/Editor"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>, // optional loading fallback
});

const NewTask = (props: Props) => {
  const [content, setContent] = useState("");

  const [pageNotFound, setPageNotFound] = useState(false);

  const { taskId, workspace_id } = useParams();

  const [currentActiveTags, setCurrentActiveTags] = useState<Tag[]>([]);

  const { activeWorkspaceId, workspaceTags } = useSelector(
    (state: RootState) => state.workspace
  );

  const { task } = useSelector((state: RootState) => state.task);

  const [trigger, { isLoading, data }] = useLazyGetWorkspaceTagsQuery();

  const [getTask, { isLoading: getTaskLoading }] =
    useLazyGetIndividualTaskQuery();

  const [updateTask, { isLoading: updateTaskLoading }] =
    useUpdateTaskMutation();

  // Add active tags
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

  // Update active tags while updating tags
  const onUpdateActiveTags = (
    id: number,
    name: string,
    color: CustomColors
  ) => {
    setCurrentActiveTags((prev) => {
      return prev.map((pre) => (pre.id === id ? { ...pre, name, color } : pre));
    });
  };

  // Delete active tags
  const onDeleteActiveTags = (tagId: number) => {
    setCurrentActiveTags((prevTags) => {
      return prevTags.filter((prev) => prev.id !== tagId);
    });
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

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  const onSubmit = async (data: TaskSchemaType) => {
    try {
      const activeTagIds = Array.isArray(currentActiveTags)
        ? currentActiveTags.map((active) => active.id)
        : [];

      const finalData = {
        ...data,
        activeTagIds,
        workspaceId: Number(workspace_id),
        date: {
          from: data.date?.from ? new Date(data.date.from) : undefined,
          to: data.date?.to ? new Date(data.date.to) : undefined,
        },
      };

      await updateTask({ taskId: taskId, data: finalData }).unwrap();
      toast.success("Task updated successfully");
    } catch (error) {
      handleApiError(error);
    }
  };

  const setEmojiValue = (emoji: string) => {
    setValue("icon", emoji);
  };

  const setDateValue = (date: DateRange | undefined) => {
    setValue("date", date);
  };

  const setEditorContent = (content: any) => {
    setValue("content", content);
  };

  useEffect(() => {
    if (activeWorkspaceId) {
      trigger({ workspaceId: activeWorkspaceId });
    }
  }, [activeWorkspaceId]);

  // Populate task details
  useEffect(() => {
    const fetchTask = async () => {
      if (taskId) {
        try {
          const response = await getTask({
            taskId,
            workspaceId: workspace_id,
          }).unwrap();

          setValue("title", response.task.title);
          setValue("content", response.task.content);
          setValue("icon", response.task.emoji);
          // Do something with response, e.g., setState
        } catch (error: any) {
          if (error?.status === 404) {
            setPageNotFound(true);
          }
          console.error("Error fetching task:", error);
          // Optionally handle rejected error
        }
      }
    };

    fetchTask();
  }, [taskId, workspace_id]);

  // Populate active tags
  useEffect(() => {
    if (task.taskTags.length > 0) {
      setCurrentActiveTags(task.taskTags);
    }
  }, [task.taskTags]);

  if (pageNotFound) {
    notFound();
  }

  return (
    <>
      {getTaskLoading ? (
        <div>Loading...</div>
      ) : (
        <Card>
          <form id="task-form" onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="py-4 sm:py-6 flex flex-col gap-10">
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
                      onDeleteActiveTags={onDeleteActiveTags}
                    />
                    {currentActiveTags.map((activeTag) => (
                      <LinkTag key={activeTag.id} tag={activeTag} />
                    ))}
                  </div>
                </div>
              </div>
              <Editor setEditorContent={setEditorContent} />
              {errors && errors.date && (
                <span className="text-red-600 text-sm">
                  {errors?.date.message}
                </span>
              )}
              <Button type="submit" disabled={updateTaskLoading}>
                Update
              </Button>
            </CardContent>
          </form>
        </Card>
      )}
    </>
  );
};

export default NewTask;
