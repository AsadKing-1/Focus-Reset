"use client";
import { breathingSets } from "@/entities/breathing/data/breathingSets";
import type { TimeOption, Feelings } from "@/entities/breathing/model/types";
import { useMemo } from "react";

import DialogContent from "./DialogContent";

interface FindBrigthingSystemProps {
    selectedFeeling: Feelings | null;
    selectedTime: TimeOption | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function FindBrigthingSystemDialog({ selectedFeeling, selectedTime, isOpen, onClose }: FindBrigthingSystemProps) {
    const recommendation = useMemo(() => {
        if (!selectedFeeling || !selectedTime) return null;
        return breathingSets.find((set) => set.feelings.includes(selectedFeeling) && set.times.includes(selectedTime)) ?? null;
    }, [selectedFeeling, selectedTime]);

    if (!isOpen) return null;

    return (
        <div
            role="dialog" aria-modal="true" aria-labelledby="dialog-title"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 backdrop-blur-sm animate-opacity sm:p-6"
            onClick={onClose}
        >
            <div
                className="w-full max-w-xl max-h-[92dvh] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl text-gray-900 dark:border-white/10 dark:bg-background-dark dark:text-white"
                onClick={(event) => event.stopPropagation()}
            >
                <DialogContent
                    selectedFeeling={selectedFeeling}
                    selectedTime={selectedTime}
                    recommendation={recommendation}
                    onClose={onClose}
                />
            </div>
        </div>
    );
}
