import { useState } from "react";

import { AfterSessionFeeling } from "@/entities/breathing/model/types";

const feelings = [
    { icon: "sentiment_stressed", label: "Stressed" },
    { icon: "sentiment_neutral", label: "Neutral" },
    { icon: "sentiment_calm", label: "Calm" },
    { icon: "bolt", label: "Energized" }
];

export default function FeelingAfterSession() {

    const [selectedFeeling, setSelectedFeeling] = useState<AfterSessionFeeling>(null);

    return (
        <div className="w-full max-w-300">
            <div className="px-3">
                <div className="flex items-center gap-2 w-full text-left py-1">
                    <span className="material-symbols-outlined text-2xl text-primary">
                        sentiment_satisfied
                    </span>
                    <span className="font-extrabold text-slate-500  dark:text-white">
                        How do you feel now?
                    </span>
                </div>
            </div>
            <div className="p-3">
                <div className="bg-gray-100 shadow-sm border dark:bg-[#1c2127] border-slate-200 dark:border-slate-800 rounded-2xl flex justify-around items-center p-3">
                    {feelings.map((f) => (
                        <button key={f.label} onClick={() => setSelectedFeeling(f.label as AfterSessionFeeling)} className={`w-full transition-all duration-300 flex flex-col justify-center items-center px-3 py-5 ${selectedFeeling === f.label ? 'bg-primary/20 dark:bg-primary/20 rounded-sm' : ''}`}>
                            <span className="material-symbols-outlined text-2xl text-primary">
                                {f.icon}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
