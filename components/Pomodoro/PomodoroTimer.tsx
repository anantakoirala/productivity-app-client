"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { SoundEffect } from "@/types/SoundEffects";
import { Howl } from "howler";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

type Phase = "work" | "shortBreak" | "longBreak" | "done";

type Props = {
  workDuration: number; // in minutes
  shortBreakDuration: number;
  longBreakDuration: number;
  longBreakInterval: number;
  rounds: number;
  soundEffect: SoundEffect;
  soundEffectVolume: number;
};

const pathsToSoundEffects = {
  ANALOG: "/music/analog.mp3",
  BELL: "/music/bell.mp3",
  BIRD: "/music/bird.mp3",
  CHURCH_BELL: "/music/churchBell.mp3",
  DIGITAL: "/music/digital.mp3",
  FANCY: "/music/fancy.mp3",
} as const;

const PomodoroTimer = ({
  workDuration,
  shortBreakDuration,
  longBreakDuration,
  longBreakInterval,
  rounds,

  soundEffect,
  soundEffectVolume,
}: Props) => {
  const [timeLeft, setTimeLeft] = useState(workDuration * 60); // in seconds
  const [currentPhase, setCurrentPhase] = useState<Phase>("work");
  const [shortBreakCount, setShortBreakCount] = useState(0);
  const [longBreakCount, setLongBreakCount] = useState(0);
  const [round, setRound] = useState(1);
  const [isRunning, setIsRunning] = useState(false);

  // Countdown effect
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  // Handle phase switch when time hits 0
  useEffect(() => {
    if (!isRunning || timeLeft > 0) return;

    handlePhaseSwitch();
  }, [timeLeft, isRunning]);

  const handlePhaseSwitch = () => {
    setIsRunning(false);
    if (currentPhase === "work") {
      const nextShortBreakCount = shortBreakCount + 1;

      if (nextShortBreakCount === longBreakInterval) {
        setCurrentPhase("longBreak");
        setTimeLeft(longBreakDuration * 60);
        setShortBreakCount(0);
        setLongBreakCount((prev) => prev + 1);
      } else {
        setCurrentPhase("shortBreak");
        setTimeLeft(shortBreakDuration * 60);
        setShortBreakCount(nextShortBreakCount);
      }
    } else if (currentPhase === "shortBreak") {
      setCurrentPhase("work");
      setTimeLeft(workDuration * 60);
    } else if (currentPhase === "longBreak") {
      if (round >= rounds) {
        setCurrentPhase("done");
        setIsRunning(false);
      } else {
        setRound((prev) => prev + 1);
        setCurrentPhase("work");
        setTimeLeft(workDuration * 60);
      }
    }

    const currentPath = pathsToSoundEffects[soundEffect];

    const sound = new Howl({
      src: currentPath,
      html5: true,
      volume: soundEffectVolume,
    });
    sound.play();
  };

  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const reset = () => {
    setIsRunning(false);
    setCurrentPhase("work");
    setShortBreakCount(0);
    setLongBreakCount(0);
    setRound(1);
    setTimeLeft(workDuration * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const bgColor = useMemo(() => {
    switch (currentPhase) {
      case "work":
        return "bg-orange-600";
      case "shortBreak":
        return "bg-emerald-600";
      case "longBreak":
        return "bg-lime-600";
      case "done":
        return "bg-teal-600";
      default:
        return "bg-white";
    }
  }, [currentPhase]);

  return (
    <Card
      className={`mt-6 w-full sm:w-auto bg- sm:min-w-[40rem] py-10 ${bgColor} `}
    >
      <CardHeader className="justify-center items-center">
        <CardTitle className={`text-5xl font-bold capitalize `}>
          <span>{currentPhase}</span>
        </CardTitle>
        <CardDescription
          className={`font-bold w-full text-center ${
            round <= rounds
              ? "text-7xl sm:text-9xl text-white"
              : "text-4xl sm:text-7xl text-white"
          }`}
        >
          <span>{formatTime(timeLeft)}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 items-center justify-center">
          <div className="flex justify-center gap-4 mt-4">
            <Button
              onClick={toggleTimer}
              size={"lg"}
              className="text-white text-2xl uppercase"
            >
              {isRunning ? "Pause" : "Start"}
            </Button>
            <Button
              onClick={reset}
              variant="outline"
              size={"lg"}
              className="dark:text-white text-2xl uppercase"
            >
              Reset
            </Button>
          </div>
          {currentPhase !== "done" && (
            <p className="text-sm dark:text-white">
              Round {round} of {rounds}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center items-center">
        {currentPhase === "done" && (
          <p className="text-green-600 text-sm font-medium">
            🎉 All rounds complete!
          </p>
        )}
      </CardFooter>
    </Card>
    // <div className={`px-6 py-1 rounded-xl   text-center space-y-4`}>
    //   <h2 className="text-5xl font-semibold capitalize mb-4">{currentPhase}</h2>
    //   <div className="text-8xl ">{formatTime(timeLeft)}</div>
    //   <div className="flex justify-center gap-4 mt-4">
    //     <Button onClick={toggleTimer}>{isRunning ? "Pause" : "Start"}</Button>
    //     <Button onClick={reset} variant="outline">
    //       Reset
    //     </Button>
    //   </div>
    //   {currentPhase !== "done" && (
    //     <p className="text-sm text-black">
    //       Round {round} of {rounds}
    //     </p>
    //   )}
    //   {currentPhase === "done" && (
    //     <p className="text-green-600 text-sm font-medium">
    //       🎉 All rounds complete!
    //     </p>
    //   )}
    // </div>
  );
};

export default PomodoroTimer;
