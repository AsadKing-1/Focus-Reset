"use client";

/*
TODO(масштабируемость/читаемость):
- Исправить импорт типов на @/entities/breathing/model/types.(выполнено)
- Разделить компонент: таймер/фазовая математика в хуки, UI в отдельные подкомпоненты.
- Убрать дублирование логики getPhaseAt: использовать model-функцию из features/session/model.
- Уйти от selectedTime как строки и от split(" ") в пользу строгого TimeOption.
*/

import { useEffect, useMemo, useState } from "react";

// TODO(ts): путь устарел; использовать "@/entities/breathing/model/types".
import type { BreathingTechnique, SessionStatus, TimeOption } from "@/entities/breathing/model/types";

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
        badge: "border-primary/30 bg-primary/10 text-primary dark:border-primary/40 dark:bg-primary/20 dark:text-primary",
        timer: "text-primary",
        ring: "border-primary/40 dark:border-primary/50",
        track: "bg-primary/10 dark:bg-primary/20",
        bar: "bg-primary",
    },
    hold: {
        badge: "border-sky-300 bg-sky-50 text-sky-700 dark:border-sky-500/30 dark:bg-sky-500/15 dark:text-sky-200",
        timer: "text-sky-600 dark:text-sky-200",
        ring: "border-sky-300/70 dark:border-sky-500/35",
        track: "bg-sky-100 dark:bg-sky-500/20",
        bar: "bg-sky-500",
    },
    exhale: {
        badge: "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/15 dark:text-emerald-200",
        timer: "text-emerald-600 dark:text-emerald-200",
        ring: "border-emerald-300/80 dark:border-emerald-500/35",
        track: "bg-emerald-100 dark:bg-emerald-500/20",
        bar: "bg-emerald-500",
    },
};

function formatClock(total: number) {
    const safe = Math.max(0, total);
    const minutes = Math.floor(safe / 60);
    const seconds = safe % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function resolvePhaseType(type: string): VisualPhase {
    if (type === "inhale" || type === "hold" || type === "exhale") return type;
    return "hold";
}

interface BreathingSessionActiveProps {
    setBreathingSession: (value: SessionStatus) => void;
    // TODO(types): после рефактора времени перейти на TimeOption вместо string | null.
    selectedTime: TimeOption;
    technique: BreathingTechnique;
}

export default function BreathingSessionActive({ setBreathingSession, selectedTime, technique }: BreathingSessionActiveProps) {
    const totalSeconds = selectedTime * 60;

    const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
    const [isRunning, setIsRunning] = useState(totalSeconds > 0);

    useEffect(() => {
        setSecondsLeft(totalSeconds);
        setIsRunning(totalSeconds > 0);
    }, [totalSeconds]);

    useEffect(() => {
        if (!isRunning || totalSeconds === null) return;

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
        if (secondsLeft === null && totalSeconds > 0) {
            setBreathingSession("Finished");
        }
    }, [secondsLeft, totalSeconds, setBreathingSession]);

    const elapsedSeconds = totalSeconds - secondsLeft;
    const progress = totalSeconds === null ? 0 : ((totalSeconds - secondsLeft) / totalSeconds) * 100;
    const timeLabel = formatClock(secondsLeft);
    const elapsedLabel = formatClock(elapsedSeconds);

    const phaseSnapshot = useMemo(() => {
        if (!technique.phases?.length || totalSeconds === null) return null;

        // TODO(ts): после фикса импортов вернуть строгую типизацию reduce (сейчас поднимается implicit any).
        const cycleDuration = technique.phases.reduce((sum, phase) => sum + phase.seconds, 0);
        if (cycleDuration <= 0) return null;

        const elapsedInCycle = elapsedSeconds % cycleDuration;
        let acc = 0;

        for (let index = 0; index < technique.phases.length; index += 1) {
            const phase = technique.phases[index];
            const start = acc;
            acc += phase.seconds;

            if (elapsedInCycle < acc) {
                const phaseElapsed = Math.min(Math.max(elapsedInCycle - start, 0), phase.seconds);
                const phaseSecondsLeft = Math.max(0, Math.ceil(phase.seconds - phaseElapsed));
                const phaseProgress = phase.seconds > 0 ? phaseElapsed / phase.seconds : 1;
                return { phase, index, phaseSecondsLeft, phaseProgress };
            }
        }

        const fallbackPhase = technique.phases[technique.phases.length - 1];
        return {
            phase: fallbackPhase,
            index: technique.phases.length - 1,
            phaseSecondsLeft: 0,
            phaseProgress: 1,
        };
    }, [technique.phases, totalSeconds, elapsedSeconds]);

    const currentPhase = phaseSnapshot?.phase ?? null;
    const visualPhase = currentPhase ? resolvePhaseType(currentPhase.type) : "inhale";
    const phaseStyle = PHASE_STYLES[visualPhase];
    const phaseLabel = currentPhase ? (currentPhase.label ?? PHASE_LABELS[currentPhase.type] ?? "Breathe") : "Get Ready";
    const phaseTimerLabel = phaseSnapshot ? `${phaseSnapshot.phaseSecondsLeft}s` : "--";
    const phaseProgress = phaseSnapshot ? phaseSnapshot.phaseProgress * 100 : 0;
    const circleScale = currentPhase
        ? (visualPhase === "inhale" ? 1.06 : visualPhase === "hold" ? 1 : 0.94)
        : 1;
    const circleDuration = currentPhase ? Math.max(currentPhase.seconds, 0.4) : 0.4;

    return (
        <div className="w-full py-3 animate-fade-in fade-in-delay-1">
            <div className="mx-auto w-full max-w-5xl p-3">
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-black/10 dark:border-white/10 dark:bg-[#121820] dark:shadow-black/40">
                    <div className="border-b border-gray-200/70 p-5 dark:border-white/10 md:p-6">
                        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                            <div>
                                <p className="text-xs font-extrabold uppercase tracking-wide text-primary">Active Session</p>
                                <h2 className="mt-1 text-2xl font-extrabold text-slate-500 dark:text-white">{technique.name}</h2>
                                <p className="text-sm text-slate-400 dark:text-white/70">Keep the same pace and follow the current phase.</p>
                            </div>
                            <div className="grid w-full gap-3 sm:grid-cols-2 md:w-95">
                                <div className="rounded-xl border border-gray-200 bg-gray-50 p-3 dark:border-white/10 dark:bg-white/5">
                                    <p className="text-[11px] font-extrabold uppercase tracking-wide text-slate-400 dark:text-white/60">Session Timer</p>
                                    <p className="mt-1 text-3xl font-extrabold tabular-nums text-slate-500 dark:text-white">{timeLabel}</p>
                                    <p className="text-xs text-slate-400 dark:text-white/60">{elapsedLabel} elapsed</p>
                                </div>
                                <div className={`rounded-xl border p-3 ${phaseStyle.badge}`}>
                                    <p className="text-[11px] font-extrabold uppercase tracking-wide opacity-80">Phase Timer</p>
                                    <p className={`mt-1 text-3xl font-extrabold tabular-nums ${phaseStyle.timer}`}>{phaseTimerLabel}</p>
                                    <p className="text-xs opacity-80">{phaseLabel}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <div className="mb-1.5 flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wide text-slate-400 dark:text-white/60">
                                <p>Session Progress</p>
                                <p className="tabular-nums">{Math.round(progress)}%</p>
                            </div>
                            <div className="h-2.5 overflow-hidden rounded-full bg-gray-200 dark:bg-white/10">
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
                                className={`relative flex h-64 w-64 items-center justify-center rounded-full border-8 bg-gray-50 transition-transform dark:bg-[#151a1f] sm:h-72 sm:w-72 ${phaseStyle.ring}`}
                                style={{
                                    transform: `scale(${circleScale})`,
                                    transitionDuration: `${circleDuration}s`,
                                    transitionTimingFunction: "ease-in-out",
                                }}
                            >
                                <div className="absolute inset-5 rounded-full border border-gray-200 dark:border-white/10"></div>
                                <div className="absolute inset-12 rounded-full border border-gray-200/70 dark:border-white/10"></div>
                                <div className="relative z-10 text-center px-4">
                                    <p className="text-[11px] font-extrabold uppercase tracking-wide text-slate-400 dark:text-white/60">Current Phase</p>
                                    <p className="mt-1 text-4xl font-extrabold text-slate-500 dark:text-white">{phaseLabel}</p>
                                    <p className="mt-1 text-xs text-slate-400 dark:text-white/60">{isRunning ? "Steady breathing" : "Paused"}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-white/10 dark:bg-white/5">
                                <div className="mb-2 flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wide text-slate-400 dark:text-white/60">
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

                            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-white/10 dark:bg-white/5">
                                <p className="text-[11px] font-extrabold uppercase tracking-wide text-slate-400 dark:text-white/60">Cycle Rhythm</p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {/* TODO(ts): после фикса импортов implicit any на phase/index должен исчезнуть. */}
                                    {technique.phases.map((phase, index) => {
                                        const isActive = phaseSnapshot?.index === index;
                                        const phaseType = resolvePhaseType(phase.type);
                                        return (
                                            <span
                                                key={`${phase.type}-${index}`}
                                                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-extrabold ${isActive
                                                    ? PHASE_STYLES[phaseType].badge
                                                    : "border-gray-200 bg-white text-slate-500 dark:border-white/10 dark:bg-[#1c2127] dark:text-white/70"
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
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary p-4 font-extrabold text-white shadow-lg shadow-primary/20 transition-all duration-150 active:translate-y-1 active:shadow-none"
                        >
                            <span className="material-symbols-outlined">{isRunning ? "pause" : "play_arrow"}</span>
                            <span>{isRunning ? "Pause Session" : "Resume Session"}</span>
                        </button>
                        <button
                            onClick={() => setBreathingSession("Not Started")}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-500 p-4 font-extrabold text-white shadow-lg shadow-rose-500/20 transition-all duration-150 active:translate-y-1 active:shadow-none"
                        >
                            <span className="material-symbols-outlined">close</span>
                            <span>End Session</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
