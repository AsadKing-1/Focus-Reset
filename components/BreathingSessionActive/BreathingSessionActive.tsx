"use client";

import { useEffect, useMemo, useState } from "react";

import type { SessionStatus } from "@/type/types";

interface BreathingSessionActiveProps {
    setBreathingSession: (value: SessionStatus) => void;
    selectedTime: string | null;
}

export default function BreathingSessionActive({ setBreathingSession, selectedTime }: BreathingSessionActiveProps) {
    const totalSeconds = useMemo(() => {
        if (!selectedTime) return 0;
        const minutes = Number.parseInt(selectedTime.split(" ")[0], 10);
        return Number.isFinite(minutes) ? minutes * 60 : 0;
    }, [selectedTime]);

    const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
    const [isRunning, setIsRunning] = useState(true);

    useEffect(() => {
        setSecondsLeft(totalSeconds);
        setIsRunning(true);
    }, [totalSeconds]);

    useEffect(() => {
        if (!isRunning || totalSeconds === 0) return;

        const interval = window.setInterval(() => {
            setSecondsLeft((prev) => {
                if (prev <= 1) {
                    setIsRunning(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => window.clearInterval(interval);
    }, [isRunning, totalSeconds]);

    useEffect(() => {
        if (secondsLeft === 0 && totalSeconds > 0) {
            setBreathingSession("Finished");
        }
    }, [secondsLeft, totalSeconds, setBreathingSession]);

    const progress = totalSeconds === 0 ? 0 : ((totalSeconds - secondsLeft) / totalSeconds) * 100;
    const minutesLeft = Math.floor(secondsLeft / 60);
    const secondsOnly = secondsLeft % 60;
    const timeLabel = `${minutesLeft}:${secondsOnly.toString().padStart(2, "0")}`;


    return (
        <div className=" flex flex-col items-center justify-center w-full h-full">
            <div className="w-full max-w-md p-6">
                <div className="flex justify-between dark:text-white">
                    <p>Session Progress</p>
                    <p>{timeLabel}</p>
                </div>
                <div className="w-full h-4 mt-4 bg-white rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
            </div>
            <div className="w-60 h-60 rounded-full bg-transparent border-15 border-primary">
                <div className="flex items-center justify-center h-full dark:text-white text-[45px] font-extrabold">
                    {timeLabel}
                </div>
            </div>
            <div className="w-full max-w-md flex items-center gap-4 mt-6 p-3">
                <button onClick={() => setIsRunning(!isRunning)} className="bg-slate-900 p-4 w-full text-white rounded-md transition-all duration-200">
                    {isRunning ?
                        (
                            <span className="material-symbols-outlined">
                                pause
                            </span>
                        ) : (
                            <span className="material-symbols-outlined">
                                play_arrow
                            </span>
                        )}
                </button>
                <button onClick={() => setBreathingSession("Not Started")} className="bg-red-500 p-4 rounded-md w-full text-white">
                    <span className="material-symbols-outlined">
                        close
                    </span>
                </button>
            </div>
        </div>
    )
}
