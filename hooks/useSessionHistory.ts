"use client";

import { useEffect, useState } from "react";

import type {
  AfterSessionFeeling,
  SessionHistoryItem,
  TimeOption,
} from "@/entities/breathing/model/types";

const HISTORY_KEY = "focusreset:session-history:v1";

function isAfterSessionFeeling(value: unknown): value is AfterSessionFeeling {
  return (
    value === "Stressed" ||
    value === "Neutral" ||
    value === "Calm" ||
    value === "Energized" ||
    value === null
  );
}

function isTimeOption(value: unknown): value is TimeOption {
  return value === 2 || value === 5 || value === 10;
}

function parseHistoryItem(value: unknown): SessionHistoryItem | null {
  if (!value || typeof value !== "object") return null;
  const raw = value as Partial<SessionHistoryItem>;

  if (typeof raw.id !== "string") return null;
  if (typeof raw.endedAt !== "string") return null;
  if (typeof raw.techniqueId !== "string") return null;
  if (typeof raw.techniqueName !== "string") return null;
  if (!isTimeOption(raw.durationMin)) return null;
  if (!isAfterSessionFeeling(raw.feelingAfter)) return null;
  if (typeof raw.notes !== "string") return null;

  return {
    id: raw.id,
    endedAt: raw.endedAt,
    techniqueId: raw.techniqueId,
    techniqueName: raw.techniqueName,
    durationMin: raw.durationMin,
    feelingAfter: raw.feelingAfter,
    notes: raw.notes,
  };
}

function sortByEndedAtDesc(items: SessionHistoryItem[]): SessionHistoryItem[] {
  return [...items].sort(
    (a, b) => Date.parse(b.endedAt) - Date.parse(a.endedAt),
  );
}

function readHistoryFromStorage(): SessionHistoryItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return sortByEndedAtDesc(
      parsed
        .map((item) => parseHistoryItem(item))
        .filter((item): item is SessionHistoryItem => item !== null),
    );
  } catch {
    // Битый JSON не должен ломать экран истории.
    return [];
  }
}

function writeHistoryToStorage(items: SessionHistoryItem[]): boolean {
  if (typeof window === "undefined") return false;
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(items));
    return true;
  } catch {
    return false;
  }
}

export function useSessionHistory() {
  const [sessionHistory, setSessionHistory] = useState<SessionHistoryItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setSessionHistory(readHistoryFromStorage());
      setIsHydrated(true);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  function createHistorySession(item: SessionHistoryItem): boolean {
    const existing = readHistoryFromStorage();
    const updated = sortByEndedAtDesc([item, ...existing]);
    const saved = writeHistoryToStorage(updated);
    setSessionHistory(updated);
    if (!saved) {
      setError("Не удалось сохранить историю сессий.");
      return false;
    }

    setError(null);
    return true;
  }
  
  function clearSessionHistory(): boolean {
    const saved = writeHistoryToStorage([]);
    setSessionHistory([]);
    if (!saved) {
      setError("Не удалось очистить историю сессий.");
      return false;
    }

    setError(null);
    return true;
  }

  return {
    sessionHistory,
    isHydrated,
    error,
    createHistorySession,
    clearSessionHistory,
  };
}
