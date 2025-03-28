"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type Props = {};

const SummarySection = (props: Props) => {
  const { name, useCase } = useSelector((state: RootState) => state.onboarding);
  const { image } = useSelector((state: RootState) => state.user);
  return (
    <section className="hidden lg:w-1/2 bg-primary lg:flex justify-center items-center">
      <div className="bg-card rounded-2xl w-96 min-h-[10rem] shadow-sm flex flex-col items-center p-4 py-8 gap-5">
        {/* <div className="w-32 h-32 rounded-full shadow-sm bg-muted mt-[-5rem]"></div> */}
        {image && (
          <span className="relative flex shrink-0 overflow-hidden rounded-full size-32 cursor-pointer ring-offset-2 ring-2 ring-slate-200">
            <img
              src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${image}`}
              className="h-full w-full object-cover"
              alt=""
            />
          </span>
        )}
        <div className="text-center space-y-1.5 text-3xl break-words max-w-xs font-semibold">
          {name && <p>{name}</p>}
        </div>
        {!useCase && <span className="bg-muted rounded-md w-24 h-8"></span>}
        {useCase && (
          <>
            <p>{useCase === "WORK" && "For Work"}</p>
            <p>{useCase === "STUDY" && "For Study"}</p>
            <p>{useCase === "PERSONAL_USE" && "For Personal Use"}</p>
          </>
        )}
      </div>
    </section>
  );
};

export default SummarySection;
