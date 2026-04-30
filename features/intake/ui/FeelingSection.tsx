"use client";
import type { Feelings } from "@/entities/breathing/model/types";
import { BatteryLow, Bed, Brain, Smile, Waves } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type FeelingSectionProps = {
    selectedFeeling: Feelings | null;
    onSelectFeeling: (feeling: Feelings) => void;
};

interface FeelingsCardProps {
    feeling: Feelings;
    icon: LucideIcon;
    description: string;
    isActive: boolean;
}

export default function FeelingSection({ selectedFeeling, onSelectFeeling }: FeelingSectionProps) {

    // TODO(качество-кода): Вынести статичную конфигурацию карточек из компонента, а активное состояние вычислять при рендере.
    const FeelingCardGroup: FeelingsCardProps[] = [
        {
            feeling: "Fatigued",
            icon: BatteryLow,
            description: "Low Energy, mental fog",
            isActive: selectedFeeling === "Fatigued",
        },
        {
            feeling: "Overwhelmed",
            icon: Waves,
            description: "Too many Tasks at once",
            isActive: selectedFeeling === "Overwhelmed",
        },
        {
            feeling: "Mind Wandering",
            icon: Brain,
            description: "Mind is wandering",
            isActive: selectedFeeling === "Mind Wandering",
        },
        {
            feeling: "Sleepy",
            icon: Bed,
            description: "Need a quick wake up",
            isActive: selectedFeeling === "Sleepy",
        }
    ];

    const noneActiveCard = "rounded-2xl bg-(--bg-800) border border-white/10 p-4 shadow-lg shadow-black/20 hover:-translate-y-1 active:translate-y-2 active:scale-[0.98] transition-all duration-300";
    const noneActiveCardIcon = "border bg-gray-200/50 border-gray-200 rounded-md p-3 mb-2 text-slate-500";

    const activeCard = "rounded-2xl bg-(--bg-800) border-gradient p-4 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 active:translate-y-2 active:scale-[0.98]";
    const activeCardIcon = "border bg-primary/20 border-primary text-primary rounded-md p-3 mb-2";

    return (    
        <div>
            <div className="flex items-center gap-2 px-4 py-2">
                <Smile className="size-6 text-primary" />
                <span className="calm-text font-display font-semibold">How are you feeling?</span>
            </div>
            <div className="w-full grid grid-cols-1 gap-4 p-3.5 md:grid-cols-2">
                {FeelingCardGroup.map((feeling) => {
                    const Icon = feeling.icon;

                    return (
                        <button onClick={() => onSelectFeeling(feeling.feeling)} key={feeling.feeling} className={`relative text-left ${selectedFeeling === feeling.feeling ? activeCard : noneActiveCard}`}>
                            <div>
                                <span className={`inline-flex ${selectedFeeling === feeling.feeling ? activeCardIcon : noneActiveCardIcon}`}>
                                    <Icon className="size-5" />
                                </span>
                                <h2 className="font-display font-extrabold text-slate-500 mb-0.5">{feeling.feeling}</h2>
                                <p className="text-[13px] text-slate-400">{feeling.description}</p>
                            </div>
                            <div className={`w-3.5 h-3.5 ${selectedFeeling === feeling.feeling ? "bg-primary" : "bg-white/10"} rounded-full absolute top-5 right-4 -translate-y-1/2`}>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    )
}
