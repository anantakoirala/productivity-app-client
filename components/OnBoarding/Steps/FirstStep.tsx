import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { increaseStep, setName } from "@/redux/OnBoarding/onBoardingSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, User } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";
import AddImage from "../AddImage";

type Props = {};
const FirstStepSchema = z.object({
  name: z.string().min(2),
});

const FirstStep = (props: Props) => {
  const dispatch = useDispatch();
  const form = useForm<z.infer<typeof FirstStepSchema>>({
    resolver: zodResolver(FirstStepSchema),
    defaultValues: {
      name: "",
    },
  });

  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  const onSubmit = (data: z.infer<typeof FirstStepSchema>) => {
    dispatch(increaseStep());
    dispatch(setName(data.name));
  };
  return (
    <div className="max-w-md w-full space-y-8">
      {/* <div className="flex flex-col justify-center items-center gap-2">
        <p className="text-sm text-muted-foreground">Add a photo</p>
        <div className="bg-muted w-16 md:h-20 md:w-20 h-16 rounded-full flex justify-center items-center text-foreground">
          <User />
        </div>
      </div> */}
      <AddImage />
      <form className="space-y-1" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1">
          <Label className="text-muted-foreground">Name</Label>
          <Input
            placeholder="name"
            {...register("name")}
            className="bg-muted"
          />
        </div>
        <Button
          disabled={!isValid}
          type="submit"
          className="w-full max-w-md dark:text-white font-semibold"
        >
          Continue
          <ArrowRight width={18} height={18} />
        </Button>
      </form>
    </div>
  );
};

export default FirstStep;
