import type {
  TimeOption,
  SessionStatus,
} from "@/entities/breathing/model/types";
import { useState, useEffect } from "react";

/*
TODO(следующий-шаг: история/профиль):
- Добавить безопасные хелперы для localStorage:
  readJson<T>(key, fallback), writeJson(key, value)
- Добавить API для истории сессий:
  appendSessionHistory(item), getSessionHistory(), clearSessionHistory()
- Добавить API для мини-профиля:
  getMiniProfile(), saveMiniProfile(profile)
Ключи:
- focusreset:session-history:v1
- focusreset:profile:v1
TODO(session): Хранить не только статус, но и тайминг сессии:
startedAt, durationSeconds, pausedAt/remainingSeconds. Сейчас обновление страницы во время Active может перезапустить таймер.
*/

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
    const frame = window.requestAnimationFrame(() => {
      setIsHydrated(true);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return {
    parseTimeOption,
    breathingSession,
    setBreathingSession,
    isHydrated,
    setIsHydrated,
  };
}
