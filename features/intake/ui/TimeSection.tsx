"use client";

import type { TimeOption } from "@/entities/breathing/model/types";

import Research from "./Research";

type TimeSectionProps = {
    selectedTime: TimeOption | null;
    onSelectTime: (time: TimeOption) => void;
    onFindTechnique: (find: boolean) => void;
};

export default function TimeSection({ selectedTime, onSelectTime, onFindTechnique }: TimeSectionProps) {
    const times: TimeOption[] = [2, 5, 10];

    const noneActiveButton = "w-full text-white rounded-md border border-white/10 bg-(--bg-800) p-4 font-bold shadow-lg shadow-black/20";

    return (
        <div className="w-full">
            <div className="flex items-center gap-2 px-4 py-2">
                <span className="material-symbols-outlined size-6 text-primary">
                    hourglass
                </span>
                <span className="text-slate-500 font-extrabold dark:text-white">How much time do you have?</span>
            </div>
            <div className="p-3 w-full">
                <div className="grid grid-cols-3 gap-2 rounded-md gradient-bg dark:bg-[#1c2127] p-3">
                    {times.map((t) => (
                        <button onClick={() => onSelectTime(t)} key={t} className={`transition-colors duration-200 ${selectedTime === t ? "border-gradient font-extrabold rounded-md bg-(--bg-800)" : noneActiveButton}`}>
                            {t} min
                        </button>
                    ))}
                </div>
            </div>
            <Research/>
            <div className="p-3">
                <button onClick={() => onFindTechnique(true)} className="w-full flex justify-center items-center gap-4 p-7 rounded-4xl text-[20px] bg-(--bg-800) border-gradient text-white font-extrabold shadow-2xl shadow-primary/20 active:translate-y-1 transition-all duration-100">
                    Find Technique
                    <span className="material-symbols-outlined text-2xl">arrow_forward</span>
                </button>
                <p className="dark:text-white/50 text-[12px] font-extrabold w-full text-center mt-4">PERSONALIZED SESSION READY IN SECONDS</p>
            </div>
        </div>
    )
}
