import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { increaseStep, setUseCase } from "@/redux/OnBoarding/onBoardingSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";

const SecondStepSchema = z.object({
  useCase: z.enum(["WORK", "STUDY", "PERSONAL_USE"], {
    required_error: "You need to select a notification type",
  }),
});

const useCases = [
  { case: "WORK", title: "For Work" },
  { case: "STUDY", title: "For Study" },
  { case: "PERSONAL_USE", title: "For Personal Use" },
];

const SecondStep = () => {
  const dispatch = useDispatch();
  const form = useForm<z.infer<typeof SecondStepSchema>>({
    resolver: zodResolver(SecondStepSchema),
    mode: "onChange", // ✅ keep this to make isValid live update
  });

  const { control, handleSubmit, formState } = form;

  const onSubmit = (data: z.infer<typeof SecondStepSchema>) => {
    dispatch(increaseStep());
    dispatch(setUseCase(data.useCase));
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4 w-full mt-10 text-center">
        <h2 className="font-bold text-4xl md:text-5xl flex flex-col items-center max-w-xs">
          How will you use this
        </h2>
        <p className="max-w-lg text-muted-foreground">
          We will use this info to personalize the experience for you
        </p>
      </div>
      <div className="max-w-md flex items-center justify-center w-full space-y-8 mt-14">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* ✅ Properly controlled RadioGroup */}
          <Controller
            control={control}
            name="useCase"
            render={({ field }) => (
              <RadioGroup
                className="flex flex-col space-y-1"
                value={field.value}
                onValueChange={field.onChange}
              >
                {useCases.map((useCase) => (
                  <div
                    key={useCase.case}
                    className="flex items-center space-x-2 rounded-md"
                  >
                    <RadioGroupItem value={useCase.case} id={useCase.case} />
                    <Label
                      htmlFor={useCase.case}
                      className="font-normal lg:text-lg h-full left-9 flex items-center w-full cursor-pointer"
                    >
                      {useCase.title}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          />

          {/* ✅ Now this will work */}
          <Button
            disabled={!formState.isValid}
            type="submit"
            className="mt-10 w-full max-w-md font-semibold"
          >
            Continue
            <ArrowRight width={18} height={18} />
          </Button>
        </form>
      </div>
    </>
  );
};

export default SecondStep;
