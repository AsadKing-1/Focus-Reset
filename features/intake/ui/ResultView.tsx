import Link from "next/link";

import { formatPhases } from "@/features/session/model/lib/formatPhase";

import type { BreathingSet, Feelings, TimeOption } from "@/entities/breathing/model/types";

interface ResultViewProps {
    onClose: () => void;
    selectedFeeling: Feelings | null;
    selectedTime: TimeOption | null;
    recommendation: BreathingSet | null;
}

export default function ResultView({ onClose, selectedFeeling, selectedTime, recommendation }: ResultViewProps) {
    return (
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
    )
}
