"use client";
import React, { useEffect, useState } from "react";
import EmojiSelector from "../EmojiSelector";
import TaskCalendar from "./TaskCalendar";
import TagSelector from "../tag/TagSelector";
import LinkTag from "../tag/LinkTag";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useLazyGetWorkspaceTagsQuery } from "@/redux/Workspace/workspaceApi";
import { Controller, useForm } from "react-hook-form";
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
import AssignUser from "./AssignUser/AssignUser";

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

  const { activeWorkspaceId, workspaceTags, userRoleForWorkspace, projects } =
    useSelector((state: RootState) => state.workspace);

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

      content: null,
      projectId: task.projectId,
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
      };
      console.log("data", data);
      await updateTask({ taskId: taskId, data: finalData }).unwrap();
      toast.success("Task updated successfully");
    } catch (error) {
      handleApiError(error);
    }
  };

  const setEmojiValue = (emoji: string) => {
    setValue("icon", emoji);
  };

  const setDateValue = (date: Date | undefined) => {
    if (!date) {
      setValue("date", undefined); // Update to use 'from' directly
      return;
    }

    setValue("date", date); // Set only 'from' (no 'to' anymore)
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
                    {userRoleForWorkspace !== "READ_ONLY" && <AssignUser />}

                    {/* Tag selector */}
                    {userRoleForWorkspace !== "READ_ONLY" && (
                      <TagSelector
                        onSelectActiveTags={onSelectActiveTags}
                        currentActiveTags={currentActiveTags}
                        onUpdateActiveTags={onUpdateActiveTags}
                        onDeleteActiveTags={onDeleteActiveTags}
                      />
                    )}
                    {currentActiveTags.map((activeTag) => (
                      <LinkTag key={activeTag.id} tag={activeTag} />
                    ))}
                  </div>
                </div>
              </div>
              <Editor setEditorContent={setEditorContent} />
              {errors?.date && (
                <span className="text-red-600 text-sm">
                  {errors.date.message}
                </span>
              )}

              {userRoleForWorkspace !== "READ_ONLY" && (
                <div className="flex flex-col md:flex-row gap-2 items-center justify-between w-full">
                  <div className="">
                    {/* select field */}
                    <Controller
                      control={form.control}
                      name="projectId"
                      render={({ field }) => (
                        <Select
                          onValueChange={(val) => field.onChange(Number(val))}
                          defaultValue={
                            field.value ? String(field.value) : undefined
                          }
                        >
                          <SelectTrigger className="bg-muted p-2 rounded border w-[250px]">
                            <SelectValue placeholder="Choose a project" />
                          </SelectTrigger>
                          <SelectContent>
                            {projects.map((project) => (
                              <SelectItem
                                key={project.id}
                                value={project.id.toString()}
                              >
                                {project.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>

                  <div className="flex flex-row gap-2">
                    {userRoleForWorkspace !== "CAN_EDIT" && (
                      <Button
                        type="submit"
                        disabled={updateTaskLoading}
                        className="bg-red-700 hover:bg-red-600"
                      >
                        Delete
                      </Button>
                    )}

                    <Button type="submit" disabled={updateTaskLoading}>
                      Update
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </form>
        </Card>
      )}
    </>
  );
};

export default NewTask;
