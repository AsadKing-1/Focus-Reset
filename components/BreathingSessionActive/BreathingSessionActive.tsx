"use client";

import { useEffect, useMemo, useState } from "react";

import { getPhaseAt } from "@/components/GetPhaseAt/GetPhaseAt";
import type { BreathingTechnique, Phase, SessionStatus } from "@/type/types";

const PHASE_LABELS: Record<Phase["type"], string> = {
    inhale: "Inhale",
    hold: "Hold",
    exhale: "Exhale",
    hold_empty: "Hold (empty)",
};

interface BreathingSessionActiveProps {
    setBreathingSession: (value: SessionStatus) => void;
    selectedTime: string | null;
    technique: BreathingTechnique;
}

export default function BreathingSessionActive({ setBreathingSession, selectedTime, technique }: BreathingSessionActiveProps) {
    const totalSeconds = useMemo(() => {
        if (!selectedTime) return 0;
        const minutes = Number.parseInt(selectedTime.split(" ")[0], 10);
        return Number.isFinite(minutes) ? minutes * 60 : 0;
    }, [selectedTime]);

    const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
    const [isRunning, setIsRunning] = useState(false);

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
    const currentPhase = useMemo(() => {
        if (!technique.phases?.length || totalSeconds === 0) return null;
        const elapsed = totalSeconds - secondsLeft;
        return getPhaseAt(technique.phases, elapsed);
    }, [technique.phases, totalSeconds, secondsLeft]);
    const phaseLabel = currentPhase ? (currentPhase.label ?? PHASE_LABELS[currentPhase.type]) : "Get Ready";
    const circleScale = currentPhase
        ? (currentPhase.type === "inhale" || currentPhase.type === "hold" ? 1.10 : 0.94)
        : 1;
    const circleDuration = currentPhase ? currentPhase.seconds : 0.4;


    return (
        <div className="flex flex-col items-center justify-center w-full h-full px-4">
            <div className="w-full max-w-md p-4 sm:p-6 rounded-2xl bg-slate-100/80 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 text-sm font-medium">
                    <p>Session Progress</p>
                    <p className="tabular-nums">{timeLabel}</p>
                </div>
                <div className="w-full h-3 mt-4 bg-slate-200/80 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                        className="h-full rounded-full bg-linear-to-r from-blue-500 via-sky-400 to-cyan-400 transition-[width] duration-500"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>
            <div
                className="relative w-64 h-64 sm:w-72 sm:h-72 mt-6 rounded-full bg-slate-50 dark:bg-slate-900/60 border-10 border-slate-200 dark:border-slate-700 shadow-[0_10px_30px_rgba(15,23,42,0.15)] dark:shadow-[0_10px_30px_rgba(2,6,23,0.6)] transition-transform"
                style={{
                    transform: `scale(${circleScale})`,
                    transitionDuration: `${circleDuration}s`,
                    transitionTimingFunction: "ease-in-out",
                }}
            >
                <div className="absolute inset-3 rounded-full border border-slate-200/70 dark:border-slate-700/70"></div>
                <div className="relative flex items-center justify-center h-full text-slate-900 dark:text-white text-5xl font-semibold tracking-tight tabular-nums">
                    {phaseLabel}
                </div>
            </div>
            <div className="w-full max-w-md flex items-center gap-3 mt-8 p-2">
                <button
                    onClick={() => setIsRunning(!isRunning)}
                    className="flex items-center justify-center bg-slate-900 text-white dark:bg-white dark:text-slate-900 p-4 w-full rounded-xl shadow-sm hover:shadow-md transition active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-900"
                >
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
                <button
                    onClick={() => setBreathingSession("Not Started")}
                    className="flex items-center justify-center bg-rose-500 text-white dark:bg-rose-500/90 p-4 rounded-xl w-full shadow-sm hover:shadow-md transition active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-900"
                >
                    <span className="material-symbols-outlined">
                        close
                    </span>
                </button>
            </div>
        </div>
    )
}
