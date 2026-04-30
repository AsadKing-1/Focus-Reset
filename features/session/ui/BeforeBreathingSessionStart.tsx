"use client";
import { Clock, Flower2, Info, Play, Zap } from "lucide-react";
import StarBreatingPreview from "./StartBreatingPreview";
import { TimeOption } from "@/entities/breathing/model/types";
import type { BreathingTechnique } from "@/entities/breathing/model/types";

interface BeforeBreathingSessionStartProps {
    technique: BreathingTechnique;
    selectedTime: TimeOption;
    setBreathingSession: (value: "Not Started" | "Active" | "Finished") => void
}

export default function BeforeBreathingSessionStart({ technique, selectedTime, setBreathingSession }: BeforeBreathingSessionStartProps) {
    return (
        <div>
            <div className="p-3 pt-20 animate-fade-in fade-in-delay-1">
                <h1 className="text-[25px] md:text-[35px] text-slate-500 font-extrabold text-center">Based on your current state, we recommend...</h1>
                <p className="text-gray-400 text-center">This technique is tailored to lower your heart rate and improve focus.</p>
            </div>
            <div className="p-3 pb-10 animate-fade-in fade-in-delay-2">
                <div className="mx-auto w-full max-w-5xl">
                    <div className="overflow-hidden rounded-2xl bg-(--bg-800) shadow-2xl shadow-black/10">
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr]">
                            <div className="border-r border-r-[#e5e3e5]">
                                <StarBreatingPreview />
                            </div>
                            <div className="p-6 md:p-8">
                                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide text-primary/80">
                                    <Clock className="size-4" />
                                    {selectedTime ? `${selectedTime} min session` : "session"}
                                </div>
                                <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-slate-500">
                                    {technique.name}
                                </h2>
                                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                                    Follow the rhythm below to reset your focus and lower stress. Breathe smoothly and keep a steady pace.
                                </p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    <span className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-extrabold text-gray-600">
                                        <Flower2 className="size-3.5 text-primary" />
                                        Reduces Stress
                                    </span>
                                    <span className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-extrabold text-gray-600">
                                        <Zap className="size-3.5 text-primary" />
                                        Sharpens Focus
                                    </span>
                                </div>
                                <button onClick={() => setBreathingSession("Active")} className="flex justify-center items-center mt-6 w-full rounded-xl bg-(--bg-800) border-gradient px-5 py-3 text-sm font-extrabold calm-text shadow-lg transition duration-200 hover:-translate-y-0.5 active:translate-y-0">
                                    <Play className="size-4" />
                                    <span className="ml-2">Start Session</span>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center gap-2 text-[10px] text-gray-400 uppercase tracking-widest pb-10 animate-fade-in fade-in-delay-3">
                <Info className="size-3.5" />
                <span>Based on your Feelings assessment</span>
            </div>
        </div>
    )
}
