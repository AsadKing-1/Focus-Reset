import type { BreathingTechnique, TimeOption } from "@/entities/breathing/model/types";

import { useState } from "react";
import type { AfterSessionFeeling } from "@/entities/breathing/model/types";

import FeelingAfterSession from "./FeelingAfterSession";
import InputFeelings from "./InputFeelings";

interface BreathingSessionFinishedProps {
    technique: BreathingTechnique;
    selectedTime: TimeOption;
}

/*
TODO(следующий-шаг: история):
- Поднять состояние feeling/notes из дочерних компонентов в этого родителя.
- Сделать FeelingAfterSession/InputFeelings контролируемыми через value/onChange.
- На "Save and Finish":
  1) Собрать payload типа SessionHistoryItem
  2) Сохранить в localStorage (ключ истории)
  3) Опционально выполнить переход на /history
*/

export default function BreathingSessionFinished({ technique, selectedTime }: BreathingSessionFinishedProps) {

    const [notes, setNotes] = useState<string>("");
    const [feelingAfter, setFeelingAfter] = useState<AfterSessionFeeling>("Neutral")

    return (
        <div className="w-full py-3 flex flex-col gap-2">
            <div className="w-full flex justify-center animate-fade-in fade-in-delay-1">
                <div className="w-full max-w-5xl p-3">
                    <h1 className="text-[35px] font-extrabold text-slate-500 dark:text-white">Session Complete</h1>
                    <p className="text-gray-400">Great Job taking time for yourself</p>
                </div>
            </div>
            <div className="w-full flex justify-center animate-fade-in fade-in-delay-2">
                <div className="w-full max-w-5xl p-3">
                    <div className="w-full mb-10 group">
                        <div className="flex flex-col md:flex-row items-stretch gap-3 rounded-xl overflow-hidden bg-white dark:bg-[#1c2127] border border-slate-200 dark:border-slate-800 shadow-sm transition-shadow hover:shadow-md">
                            <div className="md:w-1/3 relative overflow-hidden">
                                <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-9xl text-primary opacity-20">air</span>
                                </div>
                                <div className="w-full h-48 md:h-full bg-center bg-no-repeat bg-cover" data-alt="Calming abstract waves in shades of blue" style={{ backgroundImage: "url(https://lh3.googleusercontent.com/aida-public/AB6AXuCcH2tsS7rt_ZNJtW5Hg81IzkfNX2OOgCyj9dpFqMwW5F5CSFgEo8hQA6YgEbiBDC3Zq4fcS1tNUIdPXdNRy-dX_U4Wnkt67KzYHfYirZ2HWyzcsSyp_H5_PoTvFcdyE7IzuK3ox4TQiYoDUmL2tOTwE--hozsDvfwsIlSGltdDrtYW_Fb19PV5day08Rx7gRIFCYDtdNwMkZemqD42Ro4lub55Jl5EucY1iELNYeOITsefpif3si6DtegA2adyjb7wheWRIEDrfGYc" }}>
                                </div>
                            </div>
                            <div className="flex-1 p-6 flex flex-col justify-center gap-1">
                                <div className="flex flex-col gap-1.5">
                                    <div>
                                        <div className="bg-primary/10 text-md font-extrabold text-primary dark:bg-primary/20 dark:text-primary-400 px-3 py-1 rounded-full inline-block">Summary</div>
                                    </div>
                                    <div>
                                        <p className="text-slate-500 font-extrabold text-[30px] ml-1.5 dark:text-white">{technique.name}</p>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-200 dark:text-white">
                                        <div>
                                            <span className="material-symbols-outlined bg-primary/10 p-2 rounded-full text-primary">
                                                schedule
                                            </span>
                                        </div>
                                        <div>
                                            <div className="dark:text-slate-400 text-slate-500 font-extrabold">Duration</div>
                                            <div className="text-md text-slate-400  font-bold">{selectedTime || `${Math.round(technique.durationMin)}`} min</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center animate-fade-in fade-in-delay-3">
                <div className="w-full max-w-5xl">
                    <FeelingAfterSession
                        value={feelingAfter}
                        onChange={setFeelingAfter}
                    />
                </div>
            </div>
            <div className="w-full flex justify-center animate-fade-in fade-in-delay-4">
                <div className="w-full max-w-5xl p-3">
                    <InputFeelings 
                        value={notes} 
                        onChange={setNotes} 
                    />
                </div>
            </div>
            <div className="w-full p-3 flex justify-center flex-col items-center animate-fade-in fade-in-delay-5">
                {/* TODO(feature): кнопка пока без onClick — сохранить feeling/notes и завершать сценарий явно. */}
                <button className="flex justify-center transition-all active:translate-y-1 active:shadow-none items-center gap-2 hover:bg-primary/80 bg-primary shadow-lg font-extrabold rounded-2xl p-5 max-w-120 w-full text-white">
                    Save and Finish
                    <span className="material-symbols-outlined">
                        arrow_right_alt
                    </span>
                </button>
                <div className="text-center text-slate-500 dark:text-slate-400 mt-2">
                    Taking a breath is the first step to productive hour
                </div>
            </div>
        </div>
    )
}
