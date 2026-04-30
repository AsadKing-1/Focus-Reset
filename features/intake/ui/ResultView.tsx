import Link from "next/link";
import { ArrowRight, Clock3, Sparkles, X } from "lucide-react";

import { formatPhases } from "@/features/session/model/formatPhase";

import type { BreathingSet, Feelings, TimeOption } from "@/entities/breathing/model/types";

interface ResultViewProps {
    onClose: () => void;
    selectedFeeling: Feelings | null;
    selectedTime: TimeOption | null;
    recommendation: BreathingSet | null;
}

export default function ResultView({ onClose, selectedFeeling, selectedTime, recommendation }: ResultViewProps) {
    const emptyStateClass = "rounded-2xl border border-(--calm-border) bg-(--calm-bg-soft) p-4 text-sm leading-relaxed calm-text-soft";

    return (
        <div className="flex max-h-[92dvh] min-h-0 flex-col gap-4 bg-(--calm-surface) p-4 sm:p-6">
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                        <Sparkles className="size-3.5" />
                        Personalized reset
                    </div>
                    <h2 id="dialog-title" className="font-display text-2xl font-semibold leading-tight calm-text">
                        Your breathing set
                    </h2>
                    <p className="mt-1 text-sm calm-text-soft">Based on your selections</p>
                </div>
                <button
                    type="button"
                    aria-label="Close dialog"
                    onClick={() => onClose()}
                    className="calm-focus flex size-10 shrink-0 items-center justify-center rounded-xl border border-(--calm-border) bg-(--calm-surface) text-primary shadow-sm transition-all duration-200 hover:border-primary/50 hover:bg-(--calm-primary-soft) active:translate-y-px"
                >
                    <X className="size-5" />
                </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto pr-1 [scrollbar-gutter:stable]">
                {!selectedFeeling || !selectedTime ? (
                    <div className={emptyStateClass}>
                        Select how you feel and how much time you have, then try again.
                    </div>
                ) : !recommendation ? (
                    <div className={emptyStateClass}>
                        No exact match found. Try a different time or feeling.
                    </div>
                ) : (
                    <div className="space-y-4">
                        <section className="rounded-2xl border border-(--calm-border) bg-(--calm-bg-soft) p-4">
                            <div className="flex flex-wrap gap-2">
                                <span className="calm-chip calm-chip-active capitalize">{recommendation.intent}</span>
                                <span className="calm-chip">{selectedFeeling}</span>
                                <span className="calm-chip">
                                    <Clock3 className="size-3.5" />
                                    <span className="tabular-nums">{selectedTime}</span> min
                                </span>
                            </div>
                            <div className="mt-4">
                                <h3 className="font-display text-xl font-semibold leading-tight calm-text">{recommendation.title}</h3>
                                <p className="mt-1 text-sm leading-relaxed calm-text-soft">{recommendation.summary}</p>
                            </div>
                        </section>

                        <div className="space-y-3">
                            <p className="px-1 text-xs font-extrabold uppercase tracking-[0.16em] text-primary/80">
                                Choose a technique
                            </p>
                            {recommendation.techniques.map((technique) => (
                                <Link
                                    key={technique.id}
                                    href={{ pathname: "/sessions", query: { tech: technique.id, time: String(selectedTime) } }}
                                    aria-label={`Start ${technique.name} for ${selectedTime} minutes`}
                                    className="calm-focus group flex items-start justify-between gap-3 rounded-2xl border border-(--calm-border) bg-(--calm-surface) p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-(--calm-primary-soft) hover:shadow-md active:translate-y-px"
                                >
                                    <div className="min-w-0">
                                        <div className="mb-2 flex flex-wrap items-center gap-2">
                                            <h4 className="font-display text-base font-semibold leading-tight calm-text">{technique.name}</h4>
                                            <span className="rounded-full border border-(--calm-border) bg-(--calm-bg-soft) px-2 py-0.5 text-xs font-bold text-primary">
                                                <span className="tabular-nums">{technique.durationMin}</span> min
                                            </span>
                                        </div>
                                        <p className="text-sm leading-relaxed calm-text-soft">{formatPhases(technique.phases)}</p>
                                        {technique.notes && (
                                            <p className="mt-2 text-xs leading-relaxed calm-text-muted">{technique.notes}</p>
                                        )}
                                    </div>
                                    <span className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-white">
                                        <ArrowRight className="size-5" />
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
