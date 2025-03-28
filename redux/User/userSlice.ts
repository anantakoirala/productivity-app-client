import { UseCase } from "@/types/UseCase";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch, SetStateAction } from "react";

type initialState = {
  name: string;
  email: string;
  image: string | null;
};

const initialState: initialState = {
  name: "",
  email: "",
  image: null,
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
      }>
    ) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.image = action.payload.image;
    },
    setImage: (state, action) => {
      state.image = action.payload;
    },
  },
});

export const { setUserData, setImage } = userSlice.actions;
export default userSlice.reducer;
