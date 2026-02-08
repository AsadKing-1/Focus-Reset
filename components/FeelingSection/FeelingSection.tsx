"use client";

import { Feelings } from "@/type/types";

type FeelingSectionProps = {
    selectedFeeling: Feelings | null;
    onSelectFeeling: (feeling: Feelings) => void;
};

export default function FeelingSection({ selectedFeeling, onSelectFeeling }: FeelingSectionProps) {
    const feelings = ["Fatigued", "Overwhelmed", "Mind Wandering", "Sleepy"];
    const feelingIcons = ["battery_android_frame_1", "waves", "blur_on", "bedtime"];
    const feelingDescriptions = ["Low Energy, mental fog", "Too many Tasks at once", "Mind is wandering", "Need a quick wake up"];

    const noneActiveCard = "rounded-2xl border border-gray-200/50 bg-white/20 p-4 shadow-lg shadow-black/20 backdrop-blur-md dark:border-white/10 dark:bg-white/5";
    const noneActiveCardIcon = "border bg-gray-200/50 border-gray-200 rounded-md p-3 mb-2 dark:text-white dark:bg-white/5 dark:border-white/10";

    return (
        <div>
            <div className="flex items-center gap-2 px-4 py-2">
                <span className="material-symbols-outlined size-6 dark:text-primary">
                    mood
                </span>
                <span className="dark:text-white">How are you feeling?</span>
            </div>
            <div className="w-full grid grid-cols-1 gap-4 p-3.5 md:grid-cols-2">
                {feelings.slice(0).map((feeling, index) => (
                    <div onClick={() => onSelectFeeling(feeling as Feelings)} key={index} className={`transition-all duration-300 relative ${selectedFeeling === feeling ? "rounded-2xl bg-primary/5 border border-primary p-4 shadow-lg shadow-black/20 backdrop-blur-md" : noneActiveCard}`}>
                        <div>
                            <span className={`material-symbols-outlined ${selectedFeeling === feeling ? "border bg-primary/20 border-primary text-primary rounded-md p-3 mb-2" : noneActiveCardIcon}`}>
                                {feelingIcons[index]}
                            </span>
                            <h2 className="font-display font-extrabold dark:text-white mb-0.5">{feeling}</h2>
                            <p className="text-[12px] dark:text-white">{feelingDescriptions[index]}</p>
                        </div>
                        <div className={`w-3.5 h-3.5 ${selectedFeeling === feeling ? "bg-primary" : "bg-white/10"} rounded-full absolute top-5 right-4 -translate-y-1/2`}>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
