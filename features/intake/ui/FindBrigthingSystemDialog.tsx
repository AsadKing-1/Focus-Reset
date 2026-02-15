"use client";

import Link from "next/link";
import { breathingSets } from "@/data/breathingSets";
import type { Feelings, TimeOption, Phase } from "@/type/types";
import { useEffect, useMemo, useState } from "react";

interface FindBrigthingSystemProps {
    selectedFeeling: Feelings | null;
    selectedTime: TimeOption | null;
    findBreathingSystem: boolean;
    onClose: () => void;
}

type DialogPhase = "idle" | "loading" | "success" | "result";

const PHASE_LABELS: Record<Phase["type"], string> = {
    inhale: "Inhale",
    hold: "Hold",
    exhale: "Exhale",
    hold_empty: "Hold (empty)",
};

const formatPhases = (phases: Phase[]) => {
    if (phases.length === 0) return "Custom breathing";
    return phases
        .map((phase) => `${phase.label ?? PHASE_LABELS[phase.type]} ${phase.seconds}`)
        .join(" / ");
};

export default function FindBrigthingSystem({ selectedFeeling, selectedTime, findBreathingSystem, onClose }: FindBrigthingSystemProps) {
    const [phase, setPhase] = useState<DialogPhase>("idle");

    const recommendation = useMemo(() => {
        if (!selectedFeeling || !selectedTime) return null;
        return breathingSets.find((set) => set.feelings.includes(selectedFeeling) && set.times.includes(selectedTime)) ?? null;
    }, [selectedFeeling, selectedTime]);

    useEffect(() => {
        if (!findBreathingSystem) {
            setPhase("idle");
            return;
        }

        setPhase("loading");
        const timerSuccess = setTimeout(() => setPhase("success"), 900);
        const timerResult = setTimeout(() => setPhase("result"), 1600);

        return () => {
            clearTimeout(timerSuccess);
            clearTimeout(timerResult);
        };
    }, [findBreathingSystem, selectedFeeling, selectedTime]);

    if (!findBreathingSystem) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 backdrop-blur-sm animate-opacity sm:p-6"
            onClick={onClose}
        >
            <div
                className="w-full max-w-xl max-h-[92dvh] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl text-gray-900 dark:border-white/10 dark:bg-background-dark dark:text-white"
                onClick={(event) => event.stopPropagation()}
            >
                {phase === "loading" && (
                    <div className="flex flex-col items-center gap-4 p-6 text-center">
                        <div className="h-12 w-12 rounded-full border-4 border-gray-200 border-t-primary animate-spin dark:border-white/20" />
                        <div>
                            <p className="text-lg font-extrabold">Finding the best reset...</p>
                            <p className="text-sm text-gray-600 dark:text-white/60">Analyzing your mood and time</p>
                        </div>
                    </div>
                )}

                {phase === "success" && (
                    <div className="flex flex-col items-center gap-4 p-6 text-center">
                        <div className="h-12 w-12 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-3xl">check</span>
                        </div>
                        <div>
                            <p className="text-lg font-extrabold">Ready</p>
                            <p className="text-sm text-gray-600 dark:text-white/60">Personalized technique found</p>
                        </div>
                    </div>
                )}

                {phase === "result" && (
                    <div className="flex max-h-[92dvh] min-h-0 flex-col gap-4 p-4 sm:p-6">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <p className="text-lg font-extrabold">Your breathing set</p>
                                <p className="text-sm text-gray-600 dark:text-white/60">Based on your selections</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="shrink-0 rounded-md border border-primary/30 bg-primary px-2 py-2 text-xs font-extrabold uppercase tracking-wide text-white hover:text-white dark:border-primary/40"
                            >
                                <span className="material-symbols-outlined">
                                    close
                                </span>
                            </button>
                        </div>

                        <div className="min-h-0 flex-1 overflow-y-auto pr-1">
                            {!selectedFeeling || !selectedTime ? (
                                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
                                    Select how you feel and how much time you have, then try again.
                                </div>
                            ) : !recommendation ? (
                                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
                                    No exact match found. Try a different time or feeling.
                                </div>
                            ) : (
                                <div>
                                    <div className="mb-3">
                                        <p className="text-base font-extrabold">{recommendation.title}</p>
                                        <p className="text-sm text-gray-600 dark:text-white/60">{recommendation.summary}</p>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        {recommendation.techniques.map((technique) => (
                                            <Link key={technique.id} href={{ pathname: "/sessions", query: { tech: technique.id, time: selectedTime ?? "" } }} className="rounded-lg border border-gray-200 bg-gray-50 p-3 flex justify-between items-center transition-all shadow-md duration-300 hover:scale-[1.04] active:scale-100 active:shadow-none dark:border-white/10 dark:bg-black/10">
                                                <div>
                                                    <p className="text-sm font-extrabold">{technique.name}</p>
                                                    <p className="text-xs text-gray-600 dark:text-white/60">{formatPhases(technique.phases)}</p>
                                                    {technique.notes && (
                                                        <p className="text-[11px] text-gray-400 dark:text-white/40">{technique.notes}</p>
                                                    )}
                                                </div>
                                                <div>
                                                    <span className="material-symbols-outlined size-7">
                                                        arrow_right_alt
                                                    </span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
