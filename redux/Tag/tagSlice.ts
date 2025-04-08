import { CustomColors } from "@/constants/CustomColors";
import { Tag } from "@/types/Tag";
import { UseCase } from "@/types/UseCase";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch, SetStateAction } from "react";

type initialState = {
  editTagInfo: {
    id: number;
    name: string;
    color: CustomColors;
    isActive: boolean;
    workspaceId: number;
  };
};

const initialState: initialState = {
  editTagInfo: {
    id: 0,
    name: "",
    color: CustomColors.RED,
    isActive: false,
    workspaceId: 0,
  },
};

export const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    setEditTagInfo: (state, action) => {
      console.log("action", action.payload);
      state.editTagInfo = action.payload;
    },
  },
});

export const { setEditTagInfo } = tagSlice.actions;
export default tagSlice.reducer;
