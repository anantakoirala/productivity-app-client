import { CustomColors } from "@/constants/CustomColors";
import { Tag } from "@/types/Tag";
import { UseCase } from "@/types/UseCase";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch, SetStateAction } from "react";
import { DateRange } from "react-day-picker";

type initialState = {
  task: {
    id: number;
    title: string | null;
    emoji: string | null;
    content?: JSON | null;
    creatorId: number;
    workspaceId: number;
    date?: Date;

    taskTags: Tag[];
    projectId: number | undefined;
  };
  taskAsignee: { id: number; name: string; username: string }[];
};

const initialState: initialState = {
  task: {
    id: 0,
    title: "",
    emoji: null,
    creatorId: 0,
    workspaceId: 0,
    content: null,
    date: undefined,

    taskTags: [],
    projectId: undefined,
  },
  taskAsignee: [],
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTaskInfo: (state, action) => {
      state.task.id = action.payload.id;
      state.task.title = action.payload.title;
      state.task.workspaceId = action.payload.workspaceId;
      state.task.creatorId = action.payload.creatorId;
      state.task.content = action.payload.content;
      state.task.emoji = action.payload.emoji;
      state.task.projectId = action.payload.projectId;
      state.task.date = action.payload.date ? action.payload.date : undefined;

      if (action.payload.taskTags.length > 0) {
        const taskTags = action.payload.taskTags;
        const activeTag = taskTags.map((tag: any) => tag.tag);

        state.task.taskTags = activeTag;
      }

      if (action.payload.AssignedToTask.length > 0) {
        const taskAsignee = action.payload.AssignedToTask;
        const Asignee = taskAsignee.map((assignee: any) => assignee.user);
        state.taskAsignee = Asignee;
      }
    },
    setUserToTaskAssignee: (state, action) => {
      state.taskAsignee.push(action.payload.user);
    },
    removeUserFromTaskAssignee: (state, action: PayloadAction<number>) => {
      state.taskAsignee = state.taskAsignee.filter(
        (user) => user.id !== action.payload
      );
    },
  },
});

export const {
  setTaskInfo,
  setUserToTaskAssignee,
  removeUserFromTaskAssignee,
} = taskSlice.actions;
export default taskSlice.reducer;
