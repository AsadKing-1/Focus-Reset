"use client";

import type { TimeOption } from "@/entities/breathing/model/types";

import { ArrowRight, Hourglass } from "lucide-react";
import Research from "./Research";

type TimeSectionProps = {
    selectedTime: TimeOption | null;
    onSelectTime: (time: TimeOption) => void;
    onFindTechnique: (find: boolean) => void;
};

export default function TimeSection({ selectedTime, onSelectTime, onFindTechnique }: TimeSectionProps) {
    const times: TimeOption[] = [2, 5, 10];

    const timeButtonBase = "w-full rounded-xl border px-4 py-4 text-sm font-semibold calm-focus transition-all duration-300 hover:-translate-y-0.5 active:translate-y-px active:scale-[0.98]";
    const timeButtonIdle = "border-(--calm-border) bg-(--calm-surface) calm-text-soft shadow-sm hover:border-primary hover:bg-(--calm-primary-soft)";
    const timeButtonActive = "border-primary bg-(--calm-primary-soft) calm-text shadow-[0_0_0_3px_var(--calm-primary-ring)]";

    return (
        <div className="w-full">
            <div className="flex items-center gap-2 px-4 py-2">
                <Hourglass className="size-6 text-primary" />
                <span className="calm-text font-display font-semibold">How much time do you have?</span>
            </div>
            <div className="w-full p-3">
                <div className="grid grid-cols-3 gap-2 rounded-2xl border border-(--calm-border) bg-(--calm-bg-soft) p-2">
                    {times.map((t) => {
                        const isSelected = selectedTime === t;
                        return (
                            <button
                                type="button"
                                aria-pressed={isSelected}
                                onClick={() => onSelectTime(t)}
                                key={t}
                                className={`${timeButtonBase} ${isSelected ? timeButtonActive : timeButtonIdle}`}
                            >
                                <span className="tabular-nums">{t} </span>
                                <span className="text-xs font-medium calm-text-muted">min</span>
                            </button>
                        );
                    })}
                </div>
            </div>
            <Research/>
            <div className="p-3">
                <button onClick={() => onFindTechnique(true)} className="w-full flex justify-center items-center gap-4 p-7 rounded-4xl text-[20px] bg-(--bg-800)  border border-(--calm-border) text-primary font-ui font-bold shadow-2xl shadow-primary/20 hover:-translate-y-1 active:translate-y-2 active:scale-[0.98] transition-all duration-300">
                    Find Technique
                    <ArrowRight className="size-6" />
                </button>
            </div>
        </div>
    )
}
