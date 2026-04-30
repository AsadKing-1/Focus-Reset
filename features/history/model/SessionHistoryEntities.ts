import type { SessionHistoryItem } from "@/entities/breathing/model/types";
import { Clock, Frown, Meh, Smile, Wind, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const FEELING_META: Record<
    Exclude<SessionHistoryItem["feelingAfter"], null>,
    { icon: LucideIcon; label: string }
> = {
    Stressed: { icon: Frown, label: "Stressed" },
    Neutral: { icon: Meh, label: "Neutral" },
    Calm: { icon: Smile, label: "Calm" },
    Energized: { icon: Zap, label: "Energized" },
};

export function formatEndedAt(value: string): string {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Unknown time";

    return new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(date);
}