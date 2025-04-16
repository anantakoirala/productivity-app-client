"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { useForm, Controller } from "react-hook-form";
import {
  PomodoroSettingSchema,
  PomodoroSettingSchemaType,
} from "@/schema/PomodoroSettingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Clock, Play } from "lucide-react";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";
import {
  useLazyGetPomodoroSettingQuery,
  useUpdatePomodoroSettingMutation,
} from "@/redux/Pomodoro/pomodoroApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { handleApiError } from "@/lib/handleApiError";
import toast from "react-hot-toast";
import { Howl } from "howler";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "../ui/select";
import { SoundEffect } from "@/types/SoundEffects";

const pathsToSoundEffects = {
  ANALOG: "/music/analog.mp3",
  BELL: "/music/bell.mp3",
  BIRD: "/music/bird.mp3",
  CHURCH_BELL: "/music/churchBell.mp3",
  DIGITAL: "/music/digital.mp3",
  FANCY: "/music/fancy.mp3",
} as const;

const PomodoroSetting = () => {
  const [isFormReady, setIsFormReady] = useState(false);

  const [updatePomodoro, { isLoading: updatePomodoroLoading }] =
    useUpdatePomodoroSettingMutation();

  const {
    longBreakDuration,
    longBreakInterval,
    rounds,
    shortBreakDuration,
    workDuration,
    soundEffect,
    soundEffectVolume,
  } = useSelector((state: RootState) => state.pomodoro);

  const form = useForm<PomodoroSettingSchemaType>({
    resolver: zodResolver(PomodoroSettingSchema),
    defaultValues: {
      soundEffect: soundEffect,
      longBreakDuration: longBreakDuration,
      longBreakInterval: longBreakInterval,
      rounds: rounds,
      workDuration: workDuration,
      shortBreakDuration: shortBreakDuration,
      soundEffectVolume: soundEffectVolume,
    },
  });

  const {
    watch,
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = form;

  const onSubmit = async (data: PomodoroSettingSchemaType) => {
    try {
      console.log("data", data);
      await updatePomodoro(data).unwrap();
      toast.success("Setting updated successfully");
    } catch (error) {
      handleApiError(error);
    }
  };

  const handlePlaySound = () => {
    const selectedSound = watch("soundEffect");
    const volume = watch("soundEffectVolume") ?? 1;
    const src = pathsToSoundEffects[selectedSound];

    const sound = new Howl({
      src: [src],
      volume: volume,
    });

    sound.play();
  };

  return (
    <>
      <Card className="bg-background border-none shadow-none">
        <CardHeader>
          <h1>Pomodoro</h1>
          <CardDescription>
            Customize your focus and break durations for optimal productivity.
          </CardDescription>
        </CardHeader>
        <CardContent className="max-w-2xl">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="mb-5 flex items-center gap-2">
              <Clock />
              <p className="font-medium">Timer Settings</p>
            </div>

            <SliderWithLabel
              label="Work duration"
              name="workDuration"
              control={control}
              min={1}
              max={60}
            />

            <SliderWithLabel
              label="Short break duration"
              name="shortBreakDuration"
              control={control}
              min={1}
              max={15}
            />

            <SliderWithLabel
              label="Long break duration"
              name="longBreakDuration"
              control={control}
              min={1}
              max={45}
            />

            <SliderWithLabel
              label="Long break interval"
              name="longBreakInterval"
              control={control}
              min={1}
              max={10}
            />

            <SliderWithLabel
              label="Rounds"
              name="rounds"
              control={control}
              min={1}
              max={10}
            />

            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2 items-center justify-center">
                <div className="w-[90%]">
                  <Label className="text-muted-foreground">Sound</Label>
                  <Controller
                    name="soundEffect"
                    control={form.control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select sound" />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                          {Object.values(SoundEffect).map((value) => (
                            <SelectItem key={value} value={value}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="w-[10%]">
                  <Label>play</Label>
                  <Button type="button" onClick={handlePlaySound}>
                    <Play size={16} />
                  </Button>
                </div>
              </div>
            </div>

            <SliderWithLabel
              label="Volume"
              name="soundEffectVolume" // ✅ correct field name
              control={control}
              min={0}
              max={1}
              step={0.01}
            />

            <Button
              type="submit"
              className="mt-4"
              disabled={updatePomodoroLoading}
            >
              Save Settings
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default PomodoroSetting;

// Reusable slider component
type SliderWithLabelProps = {
  label: string;
  name: keyof PomodoroSettingSchemaType;
  control: any;
  min: number;
  max: number;
  step?: number;
};

const SliderWithLabel = ({
  label,
  name,
  control,
  min,
  max,
  step = 1,
}: SliderWithLabelProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-muted-foreground">
        {label}
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <div className="flex items-center gap-4">
              <Slider
                value={[field.value]}
                onValueChange={(val) => field.onChange(val[0])}
                min={min}
                max={max}
                step={step}
              />
              <span className="text-sm font-medium text-foreground w-6 text-right">
                {field.value}
              </span>
            </div>
          )}
        />
      </Label>
    </div>
  );
};
