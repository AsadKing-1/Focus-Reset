import type {
  BreathingTechnique,
  PhaseType,
  TimeOption,
} from "@/entities/breathing/model/types";
import { useMemo, useState } from "react";

type VisualPhase = "inhale" | "hold" | "exhale";

export function useTime(
  selectedTime: TimeOption,
  technique: BreathingTechnique,
) {
  const totalSeconds = selectedTime * 60;

  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(totalSeconds > 0);

  function formatClock(total: number) {
    const safe = Math.max(0, total);
    const minutes = Math.floor(safe / 60);
    const seconds = safe % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  function resolvePhaseType(type: PhaseType): VisualPhase {
    if (type === "inhale" || type === "hold" || type === "exhale") return type;
    return "hold";
  }

  const elapsedSeconds = totalSeconds - secondsLeft;
  const progress =
    totalSeconds === 0
      ? 0
      : ((totalSeconds - secondsLeft) / totalSeconds) * 100;
  const timeLabel = formatClock(secondsLeft);
  const elapsedLabel = formatClock(elapsedSeconds);

  const phaseSnapshot = useMemo(() => {
    if (!technique.phases?.length || totalSeconds === 0) return null;

    const cycleDuration = technique.phases.reduce(
      (sum, phase) => sum + phase.seconds,
      0,
    );
    if (cycleDuration <= 0) return null;

    const elapsedInCycle = elapsedSeconds % cycleDuration;
    let acc = 0;

    for (let index = 0; index < technique.phases.length; index += 1) {
      const phase = technique.phases[index];
      const start = acc;
      acc += phase.seconds;

      if (elapsedInCycle < acc) {
        const phaseElapsed = Math.min(
          Math.max(elapsedInCycle - start, 0),
          phase.seconds,
        );
        const phaseSecondsLeft = Math.max(
          0,
          Math.ceil(phase.seconds - phaseElapsed),
        );
        const phaseProgress =
          phase.seconds > 0 ? phaseElapsed / phase.seconds : 1;
        return { phase, index, phaseSecondsLeft, phaseProgress };
      }
    }

    const fallbackPhase = technique.phases[technique.phases.length - 1];
    return {
      phase: fallbackPhase,
      index: technique.phases.length - 1,
      phaseSecondsLeft: 0,
      phaseProgress: 1,
    };
  }, [technique.phases, totalSeconds, elapsedSeconds]);

  return {
    formatClock,
    totalSeconds,
    secondsLeft,
    isRunning,
    setIsRunning,
    setSecondsLeft,
    resolvePhaseType,
    elapsedSeconds,
    progress,
    timeLabel,
    elapsedLabel,
    phaseSnapshot,
  };
}
