import { UseCase } from "@/types/UseCase";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch, SetStateAction } from "react";

type initialState = {
  currentStep: 1 | 2 | 3 | 4;
  name?: string | null;
  surname?: string | null;
  profileImage?: string | null;
  useCase: "WORK" | "STUDY" | "PERSONAL_USE" | null;
  workspaceName: string | null;
  workspaceImage?: string | null;
};

const initialState: initialState = {
  currentStep: 1,
  name: null,
  surname: null,
  profileImage: null,
  useCase: null,
  workspaceName: "",
  workspaceImage: null,
};

export const onBoardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    increaseStep: (state) => {
      if (state.currentStep < 3) {
        state.currentStep = (state.currentStep + 1) as 1 | 2 | 3;
      }
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setUseCase: (state, action) => {
      state.useCase = action.payload;
    },
    setProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },
  },
});

export const { increaseStep, setName, setUseCase, setProfileImage } =
  onBoardingSlice.actions;
export default onBoardingSlice.reducer;
