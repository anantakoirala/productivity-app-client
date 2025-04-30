import { CustomColors } from "@/constants/CustomColors";
import { Project } from "@/types/Project";
import { Tag } from "@/types/Tag";
import { Task } from "@/types/Task";
import { UseCase } from "@/types/UseCase";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch, SetStateAction } from "react";

type initialState = {
  project: Project;

  totalPages: number;
  tasks: Task[];
};

const initialState: initialState = {
  project: {
    id: undefined,
    title: "",
    tasks: [],
  },

  totalPages: 1,
  tasks: [],
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProject: (state, action) => {
      console.log("action", action.payload);
      state.project = action.payload.projects;
    },

    setTotalPages(state, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
    setTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
    addTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = [...state.tasks, ...action.payload];
    },
  },
});

export const {
  setProject,

  setTotalPages,
  setTasks,
  addTasks,
} = projectSlice.actions;
export default projectSlice.reducer;
