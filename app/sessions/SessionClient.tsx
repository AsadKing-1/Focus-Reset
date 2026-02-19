"use client";

import { breathingSets } from "@/entities/breathing/data/breathingSets";
import { useSearchParams } from "next/navigation";

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
        isHydrated
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
