"use client";

import { TimeOption } from "@/type/types";

type TimeSectionProps = {
    selectedTime: TimeOption | null;
    onSelectTime: (time: TimeOption) => void;
    findBreathingSystem: (find: boolean) => void;
};

export default function TimeSection({ selectedTime, onSelectTime, findBreathingSystem }: TimeSectionProps) {
    const times: TimeOption[] = ["2 min", "5 min", "10 min"];

    const noneActiveButton = "w-full shadow-lg shadow-black/20 text-slate-500 dark:text-white rounded-md border font-bold border-gray-200/50 bg-white/20 p-4 shadow-lg shadow-black/20 backdrop-blur-md dark:border-white/10 dark:bg-white/5";

    return (
        <div className="w-full">
            <div className="flex items-center gap-2 px-4 py-2">
                <span className="material-symbols-outlined size-6 text-primary">
                    hourglass
                </span>
                <span className="text-slate-500 font-extrabold dark:text-white">How much time do you have?</span>
            </div>
            <div className="p-3 w-full">
                <div className="grid grid-cols-3 gap-2 rounded-md bg-gray-200/10 border border-gray-200 dark:bg-[#1c2127] dark:border-white/10 p-3">
                    {times.map((t) => (
                        <button onClick={() => onSelectTime(t)} key={t} className={`transition-all duration-300 ${selectedTime === t ? "border border-primary text-white font-extrabold rounded-md bg-primary" : noneActiveButton}`}>
                            {t}
                        </button>
                    ))}
                </div>
            </div>
            <div className="p-3">
                <div className="mt-2 p-6 bg-gray-200/10 border border-gray-200 shadow-lg shadow-black/20 dark:bg-[#1c2127] dark:border-white/10 rounded-md flex items-start gap-4">
                    <span className="material-symbols-outlined text-primary mt-1">info</span>
                    <p className="text-slate-500 dark:text-white text-sm leading-relaxed">
                        Research suggests that even a 5-minute focused reset can reduce cortical arousal and improve cognitive performance by up to 20% in high-stress environments.
                    </p>
                </div>
            </div>
            <div className="p-3">
                <button onClick={() => findBreathingSystem(true)} className="w-full flex justify-center items-center gap-4 p-7 rounded-md text-[20px] bg-primary text-white font-extrabold shadow-2xl shadow-primary/20 active:translate-y-1 transition-all duration-100">
                    Find Technique
                    <span className="material-symbols-outlined text-2xl">arrow_forward</span>
                </button>
                <p className="dark:text-white/50 text-[12px] font-extrabold w-full text-center mt-4">PERSONALIZED SESSION READY IN SECONDS</p>
            </div>
        </div>
    )
}
