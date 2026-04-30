type VisualPhase = "inhale" | "hold" | "exhale";

export const PHASE_STYLES: Record<VisualPhase, {
    badge: string; timer: string; ring: string; track: string; bar: string;
}> = {
    inhale: {
        badge: "border-indigo-400/70 bg-indigo-500/10 text-indigo-300",
        timer: "text-indigo-500",
        ring: "border-indigo-400/60",
        track: "bg-indigo-950/50",
        bar: "bg-indigo-500",
    },

    hold: {
        badge: "border-sky-400/30 bg-sky-500/10 text-sky-300",
        timer: "text-sky-500",
        ring: "border-sky-400/60",
        track: "bg-sky-950/50",
        bar: "bg-sky-500",
    },

    exhale: {
        badge: "border-emerald-400/30 bg-emerald-500/10 text-emerald-300",
        timer: "text-emerald-500",
        ring: "border-emerald-400/60",
        track: "bg-emerald-950/50",
        bar: "bg-emerald-500",
    },
};

export const PHASE_LABELS: Record<string, string> = {
    inhale: "Inhale",
    hold: "Hold",
    exhale: "Exhale",
    hold_empty: "Hold (empty)",
};