import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";

type Props = {};

const steps = [1, 2, 3, 4];

const FormsStepInfo = (props: Props) => {
  const { currentStep } = useSelector((state: RootState) => state.onboarding);
  return (
    <div className="flex justify-center items-center gap-2 w-full">
      {steps.map((step) => (
        <span
          key={step}
          className={`h-2.5 w-8 border px-6 py-1 rounded-md  shadow-sm ${
            currentStep >= step ? "bg-primary" : "bg-muted"
          }`}
        ></span>
      ))}
    </div>
  );
};

export default FormsStepInfo;
