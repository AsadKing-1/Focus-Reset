import type {
  TimeOption,
  SessionStatus,
} from "@/entities/breathing/model/types";
import { useState, useEffect } from "react";

export function useSessionPersistence(storageKey: string | null) {
  const [isHydrated, setIsHydrated] = useState(false);

  function parseTimeOption(value: string | null): TimeOption {
    const n = Number(value);
    return n === 2 || n === 5 || n === 10 ? n : 2;
  }

  const [breathingSession, setBreathingSession] = useState<SessionStatus>(
    () => {
      if (typeof window === "undefined" || !storageKey) return "Not Started";
      const stored = localStorage.getItem(storageKey);
      return stored === "Not Started" || stored === "Active"
        ? stored
        : "Not Started";
    },
  );
  useEffect(() => {
    if (!storageKey || typeof window === "undefined") return;
    localStorage.setItem(storageKey, breathingSession);
  }, [storageKey, breathingSession]);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return {
    parseTimeOption,
    breathingSession,
    setBreathingSession,
    isHydrated,
    setIsHydrated,
  };
}
