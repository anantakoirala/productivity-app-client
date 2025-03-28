import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import FirstStep from "./Steps/FirstStep";
import SecondStep from "./Steps/SecondStep";
import ThirdStep from "./Steps/ThirdStep";
import FormsStepInfo from "./FormsStepInfo";

type Props = {};

const AdditionalInfoSection = (props: Props) => {
  const { currentStep } = useSelector((state: RootState) => state.onboarding);
  return (
    <section className="w-full lg:w-1/2 bg-card min-h-full flex flex-col justify-between items-center p-4 md:p-6">
      <div className="mt-16 w-full mb-8 flex flex-col items-center">
        <div className="flex justify-center items-center gap-2">
          <h1 className="text-2xl">
            My <span className="text-primary font-semibold">App</span>
          </h1>
        </div>
        <h2 className="font-bold text-4xl md:text-5xl flex flex-col items-center my-10">
          Let&apos;s prepare you
        </h2>
        {currentStep === 1 && <FirstStep />}
        {currentStep === 2 && <SecondStep />}
        {currentStep === 3 && <ThirdStep />}
      </div>
      <FormsStepInfo />
    </section>
  );
};

export default AdditionalInfoSection;
