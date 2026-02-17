"use client";

/*
TODO(читаемость/консистентность):
- Переименовать FindBrigthingSystem -> FindBreathingSystemDialog (опечатка в файле и в символе).
- Экранировать апострофы в JSX-тексте, чтобы закрыть react/no-unescaped-entities.
- Исправить сломанный символ в футере ("В©" -> корректный символ копирайта).
- Рассмотреть условный mount модалки (рендерить только когда открыта), чтобы упростить поток состояния.
*/

import FeelingSection from "@/features/intake/ui/FeelingSection";
import TimeSection from "@/features/intake/ui/TimeSection";
// TODO(нейминг): поправить опечатку в имени/файле на FindBreathingSystemDialog.
import FindBrigthingSystem from "@/features/intake/ui/FindBreathingSystemDialog";

import { Feelings, TimeOption } from "@/entities/breathing/model/types";
import { useState } from "react";

export default function Home() {
  const [selectedFeeling, setSelectedFeeling] = useState<Feelings | null>(null);
  const [selectedTime, setSelectedTime] = useState<TimeOption | null>(null);
  const [findBreathingSystem, setFindBreathingSystem] = useState<boolean>(false);

  return (
    <div className="gradient-bg">
      <div className="animate-fade-in fade-in-delay-1 py-18 px-4.5 m-auto flex justify-center flex-col items-center">
        {/* TODO(lint): экранировать апостроф в "Let's" для react/no-unescaped-entities. */}
        <h1 className="text-[40px] text-center md:text-[45px] font-extrabold text-slate-500 dark:text-white">Take a breath. Let's reset</h1>
        <p className="text-[16px] md:text-[18px] font-medium text-slate-400 dark:text-slate-400 text-center">
          {/* TODO(lint): экранировать апостроф в "We'll" для react/no-unescaped-entities. */}
          Choose how you feel and how much time you have. We'll handle the reset
        </p>
      </div>
      <div className="max-w-300 mx-auto grid grid-cols-1 gap-4 p-1 md:grid-cols-2">
        <div className="animate-fade-in fade-in-delay-2">
          <FeelingSection selectedFeeling={selectedFeeling} onSelectFeeling={setSelectedFeeling} />
        </div>
        <div className="animate-fade-in fade-in-delay-3">
          <TimeSection selectedTime={selectedTime} onSelectTime={setSelectedTime} onFindTechnique={setFindBreathingSystem} />
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
      {/* TODO(consistency): после унификации пропов использовать одно имя флага (isOpen или findBreathingSystem). */}
        <FindBrigthingSystem
          selectedFeeling={selectedFeeling}
          selectedTime={selectedTime}
          isOpen={findBreathingSystem}
          onClose={() => setFindBreathingSystem(false)}
        />
      <footer className="py-8 text-center text-sm font-extrabold text-gray-700 dark:text-gray-600">
        {/* TODO(content): исправить битый символ "В©" на корректный символ копирайта. */}
        В© {new Date().getFullYear()} Focus Reset. All rights reserved.
      </footer>
    </div>
  );
}

