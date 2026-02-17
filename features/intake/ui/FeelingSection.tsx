"use client";
/*
TODO(доступность/поддержка):
- Исправить импорт типов на новую доменную модель: @/entities/breathing/model/types. (выполнено)
- Заменить кликабельный div на button (keyboard support + корректная семантика). (выполнено)
- Не использовать index как key; лучше key={feeling}. (выполнено)
- Объединить feelings/icons/descriptions в один типизированный массив объектов.(выполнено)
*/
import type { Feelings } from "@/entities/breathing/model/types";

type FeelingSectionProps = {
    selectedFeeling: Feelings | null;
    onSelectFeeling: (feeling: Feelings) => void;
};

interface FeelingsCardProps {
    feeling: Feelings;
    icon: string;
    description: string;
    isActive: boolean;
}

export default function FeelingSection({ selectedFeeling, onSelectFeeling }: FeelingSectionProps) {

    const FeelingCardGroup: FeelingsCardProps[] = [
        {
            feeling: "Fatigued",
            icon: "battery_android_frame_1",
            description: "Low Energy, mental fog",
            isActive: selectedFeeling === "Fatigued",
        },
        {
            feeling: "Overwhelmed",
            icon: "waves",
            description: "Too many Tasks at once",
            isActive: selectedFeeling === "Overwhelmed",
        },
        {
            feeling: "Mind Wandering",
            icon: "blur_on",
            description: "Mind is wandering",
            isActive: selectedFeeling === "Mind Wandering",
        },
        {
            feeling: "Sleepy",
            icon: "bedtime",
            description: "Need a quick wake up",
            isActive: selectedFeeling === "Sleepy",
        }
    ];

    const noneActiveCard = "rounded-2xl border border-gray-200/50 bg-white/20 p-4 shadow-lg shadow-black/20 backdrop-blur-md dark:border-white/10 dark:bg-[#1c2127]";
    const noneActiveCardIcon = "border bg-gray-200/50 border-gray-200 rounded-md p-3 mb-2 text-slate-500 dark:text-white dark:bg-white/5 dark:border-white/10";

    const activeCard = "rounded-2xl bg-primary/5 border border-primary p-4 shadow-lg shadow-black/20 backdrop-blur-md";
    const activeCardIcon = "border bg-primary/20 border-primary text-primary rounded-md p-3 mb-2";

    return (
        <div>
            <div className="flex items-center gap-2 px-4 py-2">
                <span className="material-symbols-outlined size-6 text-primary">
                    mood
                </span>
                <span className="text-slate-500 font-extrabold dark:text-white">How are you feeling?</span>
            </div>
            <div className="w-full grid grid-cols-1 gap-4 p-3.5 md:grid-cols-2">
                {FeelingCardGroup.map((feeling, _) => (
                    <button onClick={() => onSelectFeeling(feeling.feeling)} key={feeling.feeling} className={`transition-all duration-300 relative text-left ${selectedFeeling === feeling.feeling ? activeCard : noneActiveCard}`}>
                        <div>
                            <span className={`material-symbols-outlined ${selectedFeeling === feeling.feeling ? activeCardIcon : noneActiveCardIcon}`}>
                                {feeling.icon}
                            </span>
                            <h2 className="font-display font-extrabold text-slate-500 dark:text-white mb-0.5">{feeling.feeling}</h2>
                            <p className="text-[13px] text-slate-400 dark:text-white">{feeling.description}</p>
                        </div>
                        <div className={`w-3.5 h-3.5 ${selectedFeeling === feeling.feeling ? "bg-primary" : "bg-white/10"} rounded-full absolute top-5 right-4 -translate-y-1/2`}>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}
