"use client";

/*
TODO(читаемость/консистентность):
- Переименовать FindBrigthingSystem -> FindBreathingSystemDialog (опечатка в файле и в символе).(выполнено)
- Экранировать апострофы в JSX-тексте, чтобы закрыть react/no-unescaped-entities.
- Исправить сломанный символ в футере ("В©" -> корректный символ копирайта).
- Рассмотреть условный mount модалки (рендерить только когда открыта), чтобы упростить поток состояния.
*/

import FeelingSection from "@/features/intake/ui/FeelingSection";
import TimeSection from "@/features/intake/ui/TimeSection";

import FindBreathingSystem from "@/features/intake/ui/FindBreathingSystemDialog";

import { Feelings, TimeOption } from "@/entities/breathing/model/types";
import { useState } from "react";

export default function Home() {
  const [selectedFeeling, setSelectedFeeling] = useState<Feelings | null>(null);
  const [selectedTime, setSelectedTime] = useState<TimeOption | null>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <div className="gradient-bg">
      <div className="animate-fade-in fade-in-delay-1 py-18 px-4.5 m-auto flex justify-center flex-col items-center">
        <h1 className="text-[40px] text-center md:text-[45px] font-extrabold text-slate-500 dark:text-white">Take a breath. Lets reset</h1>
        <p className="text-[16px] md:text-[18px] font-medium text-slate-400 dark:text-slate-400 text-center">
          Choose how you feel and how much time you have. Well handle the reset
        </p>
      </div>
      <div className="max-w-300 mx-auto grid grid-cols-1 gap-4 p-1 md:grid-cols-2">
        <div className="animate-fade-in fade-in-delay-2">
          <FeelingSection selectedFeeling={selectedFeeling} onSelectFeeling={setSelectedFeeling} />
        </div>
        <div className="animate-fade-in fade-in-delay-3">
          <TimeSection selectedTime={selectedTime} onSelectTime={setSelectedTime} onFindTechnique={setOpen} />
        </div>
      </div>
      <div className="mt-20 w-full max-w-4xl opacity-20 pointer-events-none mx-auto">
      <div className="h-px w-full bg-linear-to-r from-transparent via-primary to-transparent"></div>
        <div className="flex justify-around py-8">
          <span className="material-symbols-outlined text-4xl dark:text-white">air</span>
          <span className="material-symbols-outlined text-4xl dark:text-white">self_improvement</span>
          <span className="material-symbols-outlined text-4xl dark:text-white">spa</span>
          <span className="material-symbols-outlined text-4xl dark:text-white">quiet_time</span>
        </div>
      </div>
        <FindBreathingSystem
          selectedFeeling={selectedFeeling}
          selectedTime={selectedTime}
          isOpen={isOpen}
          onClose={() => setOpen(false)}
        />
      <footer className="py-8 text-slate-600 text-center text-sm font-extrabold dark:text-slate-500">
  
        © {new Date().getFullYear()} Focus Reset. All rights reserved.
      </footer>
    </div>
  );
}

