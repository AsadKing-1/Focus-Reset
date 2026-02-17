"use client";

/*
TODO(архитектура/типы):
- Обновить импорты после рефактора папок: сейчас используются старые пути @/components, @/data, @/type.
- Синхронизировать тип времени с новой моделью (TimeOption = 2 | 5 | 10), убрать строковый парсинг "2 min".
- Логику localStorage вынести в отдельный хук (например useSessionPersistence) для читаемости и тестируемости.
- Избежать синхронного setState внутри useEffect, чтобы закрыть react-hooks/set-state-in-effect.
*/

import { useState, useEffect } from "react";
// TODO(ts): путь устарел после рефактора структуры; использовать entities/breathing/data.
import { breathingSets } from "@/entities/breathing/data/breathingSets";
import { useSearchParams } from "next/navigation";

// TODO(ts): путь устарел; использовать entities/breathing/model/types.
import { SessionStatus, TimeOption } from "@/entities/breathing/model/types";

// TODO(ts): импортировать из features/session/ui/* после переезда файлов.
import BeforeBreathingSessionStart from "@/features/session/ui/BeforeBreathingSessionStart";
import BreathingSessionActive from "@/features/session/ui/BreathingSessionActive";
import BreathingSessionFinished from "@/features/session/ui/BreathingSessionFinished";

export default function SessionClient() {
    const params = useSearchParams();
    const techId = params.get("tech");

    function parseTimeOption(value: string | null): TimeOption{
        const n = Number(value);
        return n === 2 || n === 5 || n === 10 ? n : 2
    }

    const selectedTime = parseTimeOption(params.get("time"))

    const [BreathingSession, setBreathingSession] = useState<SessionStatus>("Not Started");
    const [isHydrated, setIsHydrated] = useState(false);

    const storageKey = techId ? `breathing-session:${techId}` : null;

    useEffect(() => {
        if (!storageKey || typeof window === "undefined") return;
        const storedSession = localStorage.getItem(storageKey);
        if (storedSession === "Not Started" || storedSession === "Active") {
            // TODO(lint): react-hooks/set-state-in-effect — инициализацию лучше вынести в lazy init/useMemo.
            setBreathingSession(storedSession);
        }
        if (storedSession === "Finished") {
            localStorage.setItem(storageKey, "Not Started");
            // TODO(lint): это тоже синхронный setState внутри effect.
            setBreathingSession("Not Started");
        }
        setIsHydrated(true);
    }, [storageKey]);

    useEffect(() => {
        if (!storageKey || !isHydrated || typeof window === "undefined") return;
        localStorage.setItem(storageKey, BreathingSession);
    }, [BreathingSession, storageKey, isHydrated]);


    if (!techId) {
        return <div className="p-6 text-center text-sm text-gray-400">Select a technique to start a session.</div>;
    }

    const technique = breathingSets
        // TODO(ts): после исправления импортов type inference вернется, и implicit any исчезнет.
        .flatMap((set) => set.techniques)
        .find((t) => t.id === techId);

    if (!technique) return <div className="p-6 text-center text-sm text-gray-400">Technique not found</div>;

    return (
        <div className="flex flex-1 flex-col min-h-0">
            {BreathingSession === "Not Started" && (
                <BeforeBreathingSessionStart
                    technique={technique}
                    selectedTime={selectedTime}
                    setBreathingSession={setBreathingSession}
                />
            )}
            {BreathingSession === "Active" &&
                <div className="flex-1 w-full flex justify-center items-center">
                    <BreathingSessionActive
                        setBreathingSession={setBreathingSession}
                        selectedTime={selectedTime}
                        technique={technique}
                    />
                </div>
            }
            {BreathingSession === "Finished" &&
                <BreathingSessionFinished
                    selectedTime={selectedTime}
                    technique={technique}
                />
            }
        </div>
    );
}
