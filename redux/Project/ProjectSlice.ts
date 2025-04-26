import { CustomColors } from "@/constants/CustomColors";
import { Project } from "@/types/Project";
import { Tag } from "@/types/Tag";
import { UseCase } from "@/types/UseCase";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch, SetStateAction } from "react";

type initialState = {
  project: Project;
  page: number;
  totalPages: number;
};

const initialState: initialState = {
  project: {
    id: undefined,
    title: "",
    tasks: [],
  },
  page: 1,
  totalPages: 1,
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProject: (state, action) => {
      console.log("action", action.payload);
      state.project = action.payload.projects;
      state.page = action.payload.pagination.page;
    },
  },
});

export const { setProject } = projectSlice.actions;
export default projectSlice.reducer;
