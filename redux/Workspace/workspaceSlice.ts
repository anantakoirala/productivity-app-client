import { CustomColors } from "@/components/tag/NewTag";
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

type WorkspaceTags = {
  id: number;
  name: string;
  isActive: boolean;
  color: CustomColors;
};

type initialState = {
  workspaces: WorkSpaceType[];
  activeWorkspaceId: number;
  activeWorkSpaceName: string;
  myWorkspaceAsAdmin: WorkSpaceType[];
  activeWorkspaceImage: string | null;
  settingWorkspace: { id: string; name: string; image: string | null };
  workspaceSubscribers: WorkspaceSubscribers[];
  workspaceTags: WorkspaceTags[];
  workspaceTasks: { id: number; title: string; emoji: string | null }[];
  userRoleForWorkspace: "ADMIN" | "CAN_EDIT" | "READ_ONLY";
  workspaceMindMaps: { id: number; title: string }[];
};

const initialState: initialState = {
  workspaces: [],
  activeWorkspaceId: 0,
  activeWorkSpaceName: "",
  myWorkspaceAsAdmin: [],
  activeWorkspaceImage: null,
  settingWorkspace: { id: "", name: "", image: null },
  workspaceSubscribers: [],
  workspaceTags: [],
  workspaceTasks: [],
  userRoleForWorkspace: "READ_ONLY",
  workspaceMindMaps: [],
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
    setWorkspaceTags: (state, action) => {
      state.workspaceTags = action.payload;
    },
    setWorkspaceTasks: (state, action) => {
      state.workspaceTasks = action.payload;
    },
    setUserRoleForWorkspace: (state, action) => {
      state.userRoleForWorkspace = action.payload;
    },
    setWorkspaceMindMaps: (state, action) => {
      state.workspaceMindMaps = action.payload;
    },
    setFullWorkspaceData: (
      state,
      action: PayloadAction<{
        id: number;
        name: string;
        tasks: { id: number; title: string; emoji: string | null }[];
        mindMaps: { id: number; title: string }[];
        userRole: "ADMIN" | "CAN_EDIT" | "READ_ONLY";
        tags: WorkspaceTags[];
      }>
    ) => {
      state.activeWorkspaceId = action.payload.id;
      state.activeWorkSpaceName = action.payload.name;
      state.workspaceTasks = action.payload.tasks;
      state.workspaceMindMaps = action.payload.mindMaps;
      state.userRoleForWorkspace = action.payload.userRole;
      state.workspaceTags = action.payload.tags;
    },
  },
});

export const {
  setWorkspaces,
  setActiveWorkspace,
  setMyWOrkSpaceAsAdmin,
  setSettingWorkspace,
  setWorkspaceSubscribers,
  setWorkspaceTags,
  setWorkspaceTasks,
  setUserRoleForWorkspace,
  setWorkspaceMindMaps,
  setFullWorkspaceData,
} = workspaceSlice.actions;
export default workspaceSlice.reducer;
