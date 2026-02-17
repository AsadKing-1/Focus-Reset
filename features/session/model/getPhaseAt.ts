/*
TODO(модель):
- Исправить импорт типа Phase на @/entities/breathing/model/types. (выполнено)
- Добавить защиту от пустого phases и cycleDuration <= 0, чтобы избежать NaN/краевых кейсов.(выполнено)
- Либо использовать эту функцию в BreathingSessionActive, либо удалить как неиспользуемую.
*/

// TODO(ts): путь устарел; заменить на "@/entities/breathing/model/types".
import type { Phase } from "@/entities/breathing/model/types";

export function getPhaseAt(phases: Phase[], elapsed: number) {
    const cycleDuration = phases.reduce((a, p) => a + p.seconds, 0);
    // TODO(bug): добавить guard для cycleDuration <= 0, иначе возможен NaN.
    if(cycleDuration <= 0) return phases[0] ?? null
    const inCycle = elapsed % cycleDuration;

    let acc = 0;
    for (const phase of phases) {
        acc += phase.seconds;
        if (inCycle < acc) return phase;
    }
    return phases[phases.length - 1];
}
