"use client";
import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import { onBoardingSlice } from "./OnBoarding/onBoardingSlice";
import { userSlice } from "./User/userSlice";
import { workspaceSlice } from "./Workspace/workspaceSlice";
import { tagSlice } from "./Tag/tagSlice";
import { taskSlice } from "./task/taskSlice";
import { mindMapSlice } from "./MindMap/mindMapSlice";
import { pomodoroSlice } from "./Pomodoro/pomodoroSlice";
import { chatSlice } from "./Chat/chatSlice";
import { projectSlice } from "./Project/ProjectSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [onBoardingSlice.name]: onBoardingSlice.reducer,
    [userSlice.name]: userSlice.reducer,
    [workspaceSlice.name]: workspaceSlice.reducer,
    [tagSlice.name]: tagSlice.reducer,
    [taskSlice.name]: taskSlice.reducer,
    [mindMapSlice.name]: mindMapSlice.reducer,
    [pomodoroSlice.name]: pomodoroSlice.reducer,
    [chatSlice.name]: chatSlice.reducer,
    [projectSlice.name]: projectSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
