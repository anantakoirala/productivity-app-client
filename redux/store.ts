"use client";
import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import { onBoardingSlice } from "./OnBoarding/onBoardingSlice";
import { userSlice } from "./User/userSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [onBoardingSlice.name]: onBoardingSlice.reducer,
    [userSlice.name]: userSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
