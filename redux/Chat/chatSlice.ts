import { CustomColors } from "@/constants/CustomColors";
import { Message } from "@/types/Message";
import { SoundEffect } from "@/types/SoundEffects";
import { Tag } from "@/types/Tag";
import { UseCase } from "@/types/UseCase";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch, SetStateAction } from "react";

type initialState = {
  messages: Message[];
};

const initialState: initialState = {
  messages: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      console.log("action", action.payload);
      state.messages = action.payload;
    },
    setSingleMessage: (state, action) => {
      console.log("action payload", action.payload);
      state.messages.push(action.payload);
    },
  },
});

export const { setMessages, setSingleMessage } = chatSlice.actions;
export default chatSlice.reducer;
