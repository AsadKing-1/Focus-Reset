"use client";

/*
TODO(архитектура/типы):
- Обновить импорты после рефактора папок: сейчас используются старые пути @/components, @/data, @/type. (выполнено)
- Синхронизировать тип времени с новой моделью (TimeOption = 2 | 5 | 10), убрать строковый парсинг "2 min". (выполнено)
- Логику localStorage вынести в отдельный хук (например useSessionPersistence) для читаемости и тестируемости.
- Избежать синхронного setState внутри useEffect, чтобы закрыть react-hooks/set-state-in-effect.
*/

import { useState, useEffect } from "react";
// TODO(ts): путь устарел после рефактора структуры; использовать entities/breathing/data.
import { breathingSets } from "@/entities/breathing/data/breathingSets";
import { useSearchParams } from "next/navigation";

// TODO(ts): путь устарел; использовать entities/breathing/model/types.
import { SessionStatus } from "@/entities/breathing/model/types";

// TODO(ts): импортировать из features/session/ui/* после переезда файлов.
import BeforeBreathingSessionStart from "@/features/session/ui/BeforeBreathingSessionStart";
import BreathingSessionActive from "@/features/session/ui/BreathingSessionActive";
import BreathingSessionFinished from "@/features/session/ui/BreathingSessionFinished";

import { useSessionPersistence } from "@/hooks/useSessionPersistence";

export default function SessionClient() {
    const params = useSearchParams();
    const techId = params.get("tech");
    const storageKey = techId ? `breathing-session:${techId}` : null;

    const {
        parseTimeOption,
        breathingSession,
        setBreathingSession,
        isHydrated,
        setIsHydrated
    } = useSessionPersistence(storageKey);

    if (!isHydrated) {
        return null;
    }

    if (!techId) {
        return <div className="p-6 text-center text-sm text-gray-400">Select a technique to start a session.</div>;
    }

    const selectedTime = parseTimeOption(params.get("time"));
    const technique = breathingSets.flatMap((set) => set.techniques).find((t) => t.id === techId);

    if (!technique) return <div className="p-6 text-center text-sm text-gray-400">Technique not found</div>;

    return (
        <div className="flex flex-1 flex-col min-h-0">
            {breathingSession === "Not Started" && (
                <BeforeBreathingSessionStart
                    technique={technique}
                    selectedTime={selectedTime}
                    setBreathingSession={setBreathingSession}
                />
            )}
            {breathingSession === "Active" &&
                <div className="flex-1 w-full flex justify-center items-center">
                    <BreathingSessionActive
                        setBreathingSession={setBreathingSession}
                        selectedTime={selectedTime}
                        technique={technique}
                    />
                </div>
            }
            {breathingSession === "Finished" &&
                <BreathingSessionFinished
                    selectedTime={selectedTime}
                    technique={technique}
                />
            }
        </div>
    );
}
