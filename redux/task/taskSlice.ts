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
    date?: DateRange | undefined;
    taskTags: Tag[];
  };
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
  },
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
      if (action.payload.date?.from && action.payload.date?.to) {
        state.task.date = {
          from: new Date(action.payload.date.from),
          to: new Date(action.payload.date.to),
        };
      } else {
        state.task.date = undefined;
      }

      if (action.payload.taskTags.length > 0) {
        const taskTags = action.payload.taskTags;
        const activeTag = taskTags.map((tag: any) => tag.tag);

        state.task.taskTags = activeTag;
      }
    },
  },
});

export const { setTaskInfo } = taskSlice.actions;
export default taskSlice.reducer;
