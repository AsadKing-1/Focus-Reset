"use client";
import type { Feelings } from "@/entities/breathing/model/types";
import { Smile } from "lucide-react";
import { FeelingCardGroup } from "../model/FeelingCardGroup";

type FeelingSectionProps = {
    selectedFeeling: Feelings | null;
    onSelectFeeling: (feeling: Feelings) => void;
};

export default function FeelingSection({ selectedFeeling, onSelectFeeling }: FeelingSectionProps) {
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
                    const isActive = selectedFeeling === feeling.feeling;

                    return (
                        <button
                            key={feeling.feeling}
                            onClick={() => onSelectFeeling(feeling.feeling)}
                            className={`relative text-left ${isActive ? activeCard : noneActiveCard}`}
                        >
                            <div>
                                <span className={`inline-flex ${isActive ? activeCardIcon : noneActiveCardIcon}`}>
                                    <Icon className="size-5" />
                                </span>

                                <h2 className="font-display font-extrabold text-slate-500 mb-0.5">
                                    {feeling.feeling}
                                </h2>

                                <p className="text-[13px] text-slate-400">
                                    {feeling.description}
                                </p>
                            </div>

                            <div
                                className={`w-3.5 h-3.5 ${isActive ? "bg-primary" : "bg-white/10"
                                    } rounded-full absolute top-5 right-4 -translate-y-1/2`}
                            />
                        </button>
                    );
                })}
            </div>
        </div>
    )
}
