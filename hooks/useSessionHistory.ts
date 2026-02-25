"use client";

import { useEffect, useState } from "react";

import type { SessionHistoryItem } from "@/entities/breathing/model/types";

const HISTORY_KEY = "focusreset:session-history:v1";

function readHistoryFromStorage(): SessionHistoryItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);

    // Защита формата: если структура не массив, игнорируем данные.
    return Array.isArray(parsed) ? (parsed as SessionHistoryItem[]) : [];
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
    setSessionHistory(readHistoryFromStorage());
    setIsHydrated(true);
  }, []);

  function createHistorySession(item: SessionHistoryItem): boolean {
    const existing = readHistoryFromStorage();
    const updated = [item, ...existing].sort(
      (a, b) => Date.parse(b.endedAt) - Date.parse(a.endedAt),
    );
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
