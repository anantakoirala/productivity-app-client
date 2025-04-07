import { UseCase } from "@/types/UseCase";
import { WorkSpaceType } from "@/types/Workspace";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch, SetStateAction } from "react";

type WorkspaceSubscribers = {
  userId: number;
  userRole: string;
  name: string;
  userName: string;
  userImage: string | null;
  workspaceId: number;
};

type initialState = {
  workspaces: WorkSpaceType[];
  activeWorkspaceId: number;
  activeWorkSpaceName: string;
  myWorkspaceAsAdmin: WorkSpaceType[];
  activeWorkspaceImage: string | null;
  settingWorkspace: { id: string; name: string; image: string | null };
  workspaceSubscribers: WorkspaceSubscribers[];
};

const initialState: initialState = {
  workspaces: [],
  activeWorkspaceId: 0,
  activeWorkSpaceName: "",
  myWorkspaceAsAdmin: [],
  activeWorkspaceImage: null,
  settingWorkspace: { id: "", name: "", image: null },
  workspaceSubscribers: [],
};

export const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setWorkspaces: (state, action: PayloadAction<WorkSpaceType[]>) => {
      //console.log("action", action.payload);
      state.workspaces = action.payload;
    },
    setActiveWorkspace: (state, action) => {
      state.activeWorkspaceId = action.payload.id;
      state.activeWorkSpaceName = action.payload.name;
    },
    setMyWOrkSpaceAsAdmin: (state, action) => {
      state.myWorkspaceAsAdmin = action.payload;
    },
    setSettingWorkspace: (state, action) => {
      state.settingWorkspace = action.payload;
    },
    setWorkspaceSubscribers: (state, action) => {
      state.workspaceSubscribers = action.payload;
    },
  },
});

export const {
  setWorkspaces,
  setActiveWorkspace,
  setMyWOrkSpaceAsAdmin,
  setSettingWorkspace,
  setWorkspaceSubscribers,
} = workspaceSlice.actions;
export default workspaceSlice.reducer;
