"use client";

import { useEffect } from "react";
import { Pause, Play, X } from "lucide-react";
import type { BreathingTechnique, SessionStatus, TimeOption } from "@/entities/breathing/model/types";

import { useTime } from "@/hooks/useTimerSession";

type VisualPhase = "inhale" | "hold" | "exhale";

const PHASE_LABELS: Record<string, string> = {
    inhale: "Inhale",
    hold: "Hold",
    exhale: "Exhale",
    hold_empty: "Hold (empty)",
};

const PHASE_STYLES: Record<VisualPhase, {
    badge: string;
    timer: string;
    ring: string;
    track: string;
    bar: string;
}> = {
    inhale: {
        badge: "border-indigo-400/70 bg-indigo-500/10 text-indigo-300",
        timer: "text-indigo-500",
        ring: "border-indigo-400/60",
        track: "bg-indigo-950/50",
        bar: "bg-indigo-500",
    },

    hold: {
        badge: "border-sky-400/30 bg-sky-500/10 text-sky-300",
        timer: "text-sky-500",
        ring: "border-sky-400/60",
        track: "bg-sky-950/50",
        bar: "bg-sky-500",
    },

    exhale: {
        badge: "border-emerald-400/30 bg-emerald-500/10 text-emerald-300",
        timer: "text-emerald-500",
        ring: "border-emerald-400/60",
        track: "bg-emerald-950/50",
        bar: "bg-emerald-500",
    },
};

interface BreathingSessionActiveProps {
    setBreathingSession: (value: SessionStatus) => void;
    selectedTime: TimeOption;
    technique: BreathingTechnique;
}

export default function BreathingSessionActive({ setBreathingSession, selectedTime, technique }: BreathingSessionActiveProps) {
    const {
        totalSeconds,
        secondsLeft,
        isRunning,
        setIsRunning,
        setSecondsLeft,
        resolvePhaseType,
        progress,
        timeLabel,
        elapsedLabel,
        phaseSnapshot,
    } = useTime(selectedTime, technique);

    useEffect(() => {
        setSecondsLeft(totalSeconds);
        setIsRunning(totalSeconds > 0);
    }, [setIsRunning, setSecondsLeft, totalSeconds]);

    // TODO(timer): setInterval дрейфует, особенно когда вкладка скрыта.
    // Для точного дыхательного таймера считать secondsLeft от Date.now() и меток времени pause/resume.
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
    }, [isRunning, setIsRunning, setSecondsLeft, totalSeconds]);

    useEffect(() => {
        if (secondsLeft === 0 && totalSeconds > 0) {
            setBreathingSession("Finished");
        }
    }, [secondsLeft, totalSeconds, setBreathingSession]);

    const currentPhase = phaseSnapshot?.phase ?? null;
    const visualPhase = currentPhase ? resolvePhaseType(currentPhase.type) : "inhale";
    const phaseStyle = PHASE_STYLES[visualPhase];
    const phaseLabel = currentPhase ? (currentPhase.label ?? PHASE_LABELS[currentPhase.type] ?? "Breathe") : "Get Ready";
    const phaseTimerLabel = phaseSnapshot ? `${phaseSnapshot.phaseSecondsLeft}s` : "--";
    const phaseProgress = phaseSnapshot ? phaseSnapshot.phaseProgress * 100 : 0;
    const circleScale = currentPhase ? (visualPhase === "inhale" ? 1.06 : visualPhase === "hold" ? 1 : 0.94) : 1;
    const circleDuration = currentPhase ? Math.max(currentPhase.seconds, 0.4) : 0.4;

    return (
        <div className="w-full py-3 animate-fade-in fade-in-delay-1">
            <div className="mx-auto w-full max-w-5xl p-3">
                <div className="overflow-hidden rounded-2xl bg-(--bg-800)">
                    <div className="border-b border-gray-200/70 p-5 md:p-6">
                        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                            <div>
                                <p className="text-xs font-extrabold uppercase tracking-wide text-primary">Active Session</p>
                                <h2 className="mt-1 text-2xl font-extrabold text-slate-500">{technique.name}</h2>
                                <p className="text-sm text-slate-400">Keep the same pace and follow the current phase.</p>
                            </div>
                            <div className="grid w-full gap-3 sm:grid-cols-2 md:w-95">
                                <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                                    <p className="text-[11px] font-extrabold uppercase tracking-wide text-slate-400">Session Timer</p>
                                    <p className="mt-1 text-3xl font-extrabold tabular-nums text-slate-500">{timeLabel}</p>
                                    <p className="text-xs text-slate-400">{elapsedLabel} elapsed</p>
                                </div>
                                <div className={`rounded-xl border p-3 ${phaseStyle.badge}`}>
                                    <p className="text-[11px] font-extrabold uppercase tracking-wide opacity-80">Phase Timer</p>
                                    <p className={`mt-1 text-3xl font-extrabold tabular-nums ${phaseStyle.timer}`}>{phaseTimerLabel}</p>
                                    <p className="text-xs opacity-80">{phaseLabel}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <div className="mb-1.5 flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wide text-slate-400">
                                <p>Session Progress</p>
                                <p className="tabular-nums">{Math.round(progress)}%</p>
                            </div>
                            <div className="h-2.5 overflow-hidden rounded-full bg-gray-200">
                                <div
                                    className="h-full rounded-full bg-primary transition-[width] duration-500"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 p-5 md:p-6 lg:grid-cols-[1fr_1.1fr]">
                        <div className="flex items-center justify-center">
                            <div
                                className={`relative flex h-64 w-64 items-center justify-center rounded-full border-8 bg-gray-50 transition-transform sm:h-72 sm:w-72 ${phaseStyle.ring}`}
                                style={{
                                    transform: `scale(${circleScale})`,
                                    transitionDuration: `${circleDuration}s`,
                                    transitionTimingFunction: "ease-in-out",
                                }}
                            >
                                <div className="absolute inset-5 rounded-full border border-gray-200"></div>
                                <div className="absolute inset-12 rounded-full border border-gray-200/70"></div>
                                <div className="relative z-10 text-center px-4">
                                    <p className="text-[11px] font-extrabold uppercase tracking-wide text-slate-400">Current Phase</p>
                                    <p className="mt-1 text-4xl font-extrabold text-slate-500">{phaseLabel}</p>
                                    <p className="mt-1 text-xs text-slate-400">{isRunning ? "Steady breathing" : "Paused"}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                                <div className="mb-2 flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wide text-slate-400">
                                    <p>Phase Progress</p>
                                    <p className="tabular-nums">{Math.round(phaseProgress)}%</p>
                                </div>
                                <div className={`h-2.5 overflow-hidden rounded-full ${phaseStyle.track}`}>
                                    <div
                                        className={`h-full rounded-full transition-[width] duration-300 ${phaseStyle.bar}`}
                                        style={{ width: `${phaseProgress}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                                <p className="text-[11px] font-extrabold uppercase tracking-wide text-slate-400">Cycle Rhythm</p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {technique.phases.map((phase, index) => {
                                        const isActive = phaseSnapshot?.index === index;
                                        const phaseType = resolvePhaseType(phase.type);
                                        return (
                                            <span
                                                key={`${phase.type}-${index}`}
                                                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-extrabold ${isActive
                                                    ? PHASE_STYLES[phaseType].badge
                                                    : "border-gray-200 bg-white text-slate-500"
                                                    }`}
                                            >
                                                <span>{phase.label ?? PHASE_LABELS[phase.type] ?? "Phase"}</span>
                                                <span className="tabular-nums">{phase.seconds}s</span>
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 px-5 pb-6 md:flex-row md:px-6">
                        <button
                            onClick={() => setIsRunning((prev) => !prev)}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-(--bg-800) p-4 font-extrabold calm-text border-gradient transition-all duration-150 active:translate-y-1 active:shadow-none"
                        >
                            {isRunning ? <Pause className="size-5" /> : <Play className="size-5" />}
                            <span>{isRunning ? "Pause Session" : "Resume Session"}</span>
                        </button>
                        <button
                            onClick={() => setBreathingSession("Not Started")}
                            // TODO(ux): "End Session" сейчас молча сбрасывает прогресс.
                            // Лучше спросить подтверждение или вести на Finished с пометкой "завершено раньше".
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-500 p-4 font-extrabold text-white shadow-lg shadow-rose-500/20 transition-all duration-150 active:translate-y-1 active:shadow-none"
                        >
                            <X className="size-5" />
                            <span>End Session</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
