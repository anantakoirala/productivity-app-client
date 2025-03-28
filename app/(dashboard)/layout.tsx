"use client";
import AuthProvider from "@/contextProviders/AuthProvider";
import { store } from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";

type Props = { children: React.ReactNode };

const layout = ({ children }: Props) => {
  return (
    <div>
      <Provider store={store}>
        <AuthProvider>{children}</AuthProvider>
      </Provider>
    </div>
  );
};

export default layout;
