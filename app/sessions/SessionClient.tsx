"use client";

import { useState, useEffect } from "react";
import { breathingSets } from "@/data/breathingSets";
import { useSearchParams } from "next/navigation";

import type { SessionStatus } from "@/type/types";

import BeforeBreathingSessionStart from "@/components/BeforeBreathingSessionStart/BeforeBreathingSessionStart";
import BreathingSessionActive from "@/components/BreathingSessionActive/BreathingSessionActive";
import BreathingSessionFinished from "@/components/BreathingSessionFinished/BreathingSessionFinished";

export default function SessionClient() {
    const params = useSearchParams();
    const techId = params.get("tech");
    const selectedTime = params.get("time");

    const [BreathingSession, setBreathingSession] = useState<SessionStatus>("Finished");
    const [isHydrated, setIsHydrated] = useState(false);

    const storageKey = techId ? `breathing-session:${techId}` : null;

    useEffect(() => {
        if (!storageKey || typeof window === "undefined") return;
        const storedSession = localStorage.getItem(storageKey);
        if (storedSession === "Not Started" || storedSession === "Active" || storedSession === "Finished") {
            setBreathingSession(storedSession);
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
            {BreathingSession === "Finished" && <BreathingSessionFinished />}
        </div>
    );
}
