import type { Phase } from "@/entities/breathing/model/types";

const PHASE_LABELS: Record<Phase["type"], string> = {
  inhale: "Inhale",
  hold: "Hold",
  exhale: "Exhale",
  hold_empty: "Hold (empty)",
};

export const formatPhases = (phases: Phase[]) => {
  if (phases.length === 0) return "Custom breathing";
  return phases
    .map(
      (phase) => `${phase.label ?? PHASE_LABELS[phase.type]} ${phase.seconds}`,
    )
    .join(" / ");
};
