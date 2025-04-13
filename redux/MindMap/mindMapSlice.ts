import { CustomColors } from "@/constants/CustomColors";
import { Tag } from "@/types/Tag";
import { UseCase } from "@/types/UseCase";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch, SetStateAction } from "react";

type MindMapTag = {
  id: number;
  name: string;
  isActive: boolean;
  color: CustomColors;
};

type initialState = {
  mindMap: {
    id: number | null;
    title: string | null;
    content?: JSON | null;
    workspaceId: number;
    emoji: string | null;
  };
  mindMapTags: MindMapTag[];
};

const initialState: initialState = {
  mindMap: {
    id: null,
    title: "",
    content: null,
    workspaceId: 0,
    emoji: null,
  },
  mindMapTags: [],
};

export const mindMapSlice = createSlice({
  name: "mindmap",
  initialState,
  reducers: {
    setMindMapInfo: (state, action) => {
      const { id, content, creatorId, title, workSpaceId, MindMapTag, emoji } =
        action.payload;

      state.mindMap.id = id;
      state.mindMap.content = content;
      state.mindMap.title = title;
      state.mindMap.emoji = emoji;
      state.mindMap.workspaceId = workSpaceId;
      state.mindMapTags = MindMapTag;
    },
  },
});

export const { setMindMapInfo } = mindMapSlice.actions;
export default mindMapSlice.reducer;
