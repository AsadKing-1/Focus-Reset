"use client";

import { useState } from "react";

export default function TimeSection() {
    const [time, setTime] = useState<"2 min" | "5 min" | "10 min" | null>(null);
    const times = ["2 min", "5 min", "10 min"];

    return (
        <div>
            <div className="flex gap-3 items-center">
                <span className="material-symbols-outlined px-4 py-2 dark:text-primary">
                    hourglass
                </span>
                <span className="dark:text-white font-bold">How much time do you have?</span>
            </div>
            <div className="p-3">
                {times.map((t) => (
                    <div className="bg-white/10 p-2">
                        <button onClick={() => setTime(t as "2 min" | "5 min" | "10 min")} key={t} className={`w-full rounded-2xl border  font-bold border-gray-200/50 bg-white/20 p-2 shadow-lg shadow-black/20 backdrop-blur-md dark:border-white/10 dark:bg-white/5 transition-all duration-300 ${time === t ? "border-primary bg-primary/5" : "hover:border-gray-200/70 hover:bg-white/30 dark:hover:border-white/20 dark:hover:bg-white/10"} dark:text-white`}>
                            {t}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}