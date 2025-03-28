"use client";

import AdditionalInfoSection from "@/components/OnBoarding/AdditionalInfoSection";
import SummarySection from "@/components/OnBoarding/SummarySection";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="w-full flex flex-row">
      <AdditionalInfoSection />
      <SummarySection />
    </div>
  );
};

export default Page;
