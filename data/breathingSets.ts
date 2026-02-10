import { BreathingSet } from "@/type/types";

export const breathingSets: BreathingSet[] = [
  {
    id: "quick-boost",
    title: "Quick Boost",
    intent: "boost",
    feelings: ["Fatigued", "Sleepy"],
    times: ["2 min", "5 min"],
    summary: "Short energizing cycles to lift alertness.",
    techniques: [
      {
        id: "phys-sigh",
        name: "Physiological Sigh",
        pattern:"Two short inhales through nose, one long exhale through mouth",
        durationMin: 1,
        notes: "Repeat 6-10 cycles.",
      },
      {
        id: "box-4",
        name: "Box 4-4-4-4",
        pattern: "Inhale 4 / hold 4 / exhale 4 / hold 4",
        durationMin: 2,
        notes: "Steady pace.",
      },
      {
        id: "rhythm-3",
        name: "Rhythm 3-3",
        pattern: "Inhale 3 / exhale 3",
        durationMin: 2,
        notes: "Light, no holds.",
      },
    ],
  },
  {
    id: "stress-reset",
    title: "Stress Reset",
    intent: "calm",
    feelings: ["Overwhelmed"],
    times: ["5 min", "10 min"],
    summary: "Longer exhales to downshift arousal.",
    techniques: [
      {
        id: "four-six",
        name: "4-6 Breathing",
        pattern: "Inhale 4 / exhale 6",
        durationMin: 3,
      },
      {
        id: "four-seven-eight",
        name: "4-7-8",
        pattern: "Inhale 4 / hold 7 / exhale 8",
        durationMin: 3,
      },
      {
        id: "three-six",
        name: "Long Exhale 3-6",
        pattern: "Inhale 3 / exhale 6",
        durationMin: 3,
      },
    ],
  },
  {
    id: "focus-reset",
    title: "Focus Reset",
    intent: "focus",
    feelings: ["Mind Wandering"],
    times: ["2 min", "5 min", "10 min"],
    summary: "Even rhythm to stabilize attention.",
    techniques: [
      {
        id: "equal-5",
        name: "Equal 5-5",
        pattern: "Inhale 5 / exhale 5",
        durationMin: 2,
      },
      {
        id: "counted-exhales",
        name: "Counted Exhales",
        pattern: "Count only exhales from 1 to 10, repeat",
        durationMin: 3,
      },
      {
        id: "box-3",
        name: "Box 3-3-3-3",
        pattern: "Inhale 3 / hold 3 / exhale 3 / hold 3",
        durationMin: 3,
      },
    ],
  },
  {
    id: "steady-calm",
    title: "Steady Calm",
    intent: "reset",
    feelings: ["Overwhelmed", "Fatigued"],
    times: ["10 min"],
    summary: "Gentle longer cycles for steady calm.",
    techniques: [
      {
        id: "ratio-1-2",
        name: "Ratio 1:2",
        pattern: "Inhale 4 / exhale 8",
        durationMin: 4,
      },
      {
        id: "coherent-5",
        name: "Coherent 5-5",
        pattern: "Inhale 5 / exhale 5",
        durationMin: 3,
      },
      {
        id: "soft-hold",
        name: "Soft Hold 4-2-6",
        pattern: "Inhale 4 / hold 2 / exhale 6",
        durationMin: 3,
      },
    ],
  },
];
