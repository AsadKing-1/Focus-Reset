"use client";
import FeelingSection from "@/features/intake/ui/FeelingSection";
import TimeSection from "@/features/intake/ui/TimeSection";

import FindBreathingSystem from "@/features/intake/ui/FindBreathingSystemDialog";

import { Feelings, TimeOption } from "@/entities/breathing/model/types";
import { Flower2, Moon, PersonStanding, Wind } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [selectedFeeling, setSelectedFeeling] = useState<Feelings | null>(null);
  const [selectedTime, setSelectedTime] = useState<TimeOption | null>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <div className="home-page">
      <div className="animate-fade-in fade-in-delay-1 py-18 px-4.5 m-auto flex justify-center flex-col items-center">
        <h1 className="text-[40px] text-center md:text-[45px] font-display calm-text">Take a breath. Let&apos;s reset</h1>
        <p className="text-[16px] md:text-[18px] font-medium text-primary/70 text-center">
          Choose how you feel and how much time you have. We&apos;ll handle the reset
        </p>
      </div>
      <div className="max-w-290 mx-auto grid grid-cols-1 gap-4 p-1 md:grid-cols-2">
        <div className="animate-fade-in fade-in-delay-2">
          <FeelingSection selectedFeeling={selectedFeeling} onSelectFeeling={setSelectedFeeling} />
        </div>
        <div className="animate-fade-in fade-in-delay-3">
          <TimeSection selectedFeeling={selectedFeeling} selectedTime={selectedTime} onSelectTime={setSelectedTime} onFindTechnique={setOpen} />
        </div>
      </div>
      <div className="mt-20 w-full max-w-4xl opacity-20 pointer-events-none mx-auto">
      <div className="h-px w-full bg-linear-to-r from-transparent via-primary to-transparent"></div>
        <div className="flex justify-around py-8">
          <Wind className="size-10" />
          <PersonStanding className="size-10" />
          <Flower2 className="size-10" />
          <Moon className="size-10" />
        </div>
      </div>
        <FindBreathingSystem
          selectedFeeling={selectedFeeling}
          selectedTime={selectedTime}
          isOpen={isOpen}
          onClose={() => setOpen(false)}
        />
      <footer className="py-8 text-slate-600 text-center text-sm font-extrabold">
  
        © {new Date().getFullYear()} Focus Reset. All rights reserved.
      </footer>
    </div>
  );
}

