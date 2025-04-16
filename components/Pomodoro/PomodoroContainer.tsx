import React, { useMemo, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import PomodoroTimer from "./PomodoroTimer";

const PomodoroContainer = () => {
  const {
    longBreakDuration,
    longBreakInterval,
    rounds,
    shortBreakDuration,
    workDuration,
    soundEffect,
    soundEffectVolume,
  } = useSelector((state: RootState) => state.pomodoro);

  const isReady =
    workDuration &&
    shortBreakDuration &&
    longBreakDuration &&
    longBreakInterval &&
    rounds;

  return (
    <div className="">
      {isReady ? (
        <PomodoroTimer
          workDuration={workDuration}
          shortBreakDuration={shortBreakDuration}
          longBreakDuration={longBreakDuration}
          longBreakInterval={longBreakInterval}
          rounds={rounds}
          soundEffect={soundEffect}
          soundEffectVolume={soundEffectVolume}
        />
      ) : (
        <p className="text-center text-muted-foreground">
          Please configure your Pomodoro settings first.
        </p>
      )}
    </div>
  );
};

export default PomodoroContainer;
