import { UseCase } from "@/types/UseCase";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch, SetStateAction } from "react";

type initialState = {
  name: string;
  email: string;
  image: string | null;
  completeOnBoarding: boolean;
  username: string;
};

const initialState: initialState = {
  name: "",
  email: "",
  image: null,
  completeOnBoarding: false,
  username: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (
      state,
      action: PayloadAction<{
        email: string;
        name: string;
        image: string | null;
        completeOnBoarding: boolean;
        username: string;
      }>
    ) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.image = action.payload.image;
      state.completeOnBoarding = action.payload.completeOnBoarding;
      state.username = action.payload.username;
    },
    setImage: (state, action) => {
      state.image = action.payload;
    },
  },
});

export const { setUserData, setImage } = userSlice.actions;
export default userSlice.reducer;
