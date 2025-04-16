import { CustomColors } from "@/constants/CustomColors";
import { SoundEffect } from "@/types/SoundEffects";
import { Tag } from "@/types/Tag";
import { UseCase } from "@/types/UseCase";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch, SetStateAction } from "react";

type initialState = {
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  longBreakInterval: number;
  rounds: number;
  soundEffect: SoundEffect;
  soundEffectVolume: number;
};

const initialState: initialState = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  longBreakInterval: 2,
  rounds: 3,
  soundEffect: SoundEffect.BELL,
  soundEffectVolume: 0.5,
};

export const pomodoroSlice = createSlice({
  name: "pomodoro",
  initialState,
  reducers: {
    setPomodoroSetting: (state, action) => {
      console.log("action", typeof action.payload.soundEffect);
      state.workDuration = action.payload.workDuration;
      state.shortBreakDuration = action.payload.shortBreakDuration;
      state.longBreakDuration = action.payload.longBreakDuration;
      state.longBreakInterval = action.payload.longBreakinterval;
      state.rounds = action.payload.rounds;
      state.soundEffect = action.payload.soundEffect;
      state.soundEffectVolume = action.payload.soundEffectVolume;
    },
  },
});

export const { setPomodoroSetting } = pomodoroSlice.actions;
export default pomodoroSlice.reducer;
