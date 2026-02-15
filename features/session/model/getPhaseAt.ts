import type { Phase } from "@/type/types";

export function getPhaseAt(phases: Phase[], elapsed: number) {
    const cycleDuration = phases.reduce((a, p) => a + p.seconds, 0);
    const inCycle = elapsed % cycleDuration;

    let acc = 0;
    for (const phase of phases) {
        acc += phase.seconds;
        if (inCycle < acc) return phase;
    }
    return phases[phases.length - 1];
}
