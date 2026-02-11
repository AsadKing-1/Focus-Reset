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
        phases: [
          { type: "inhale", seconds: 2, label: "Inhale" },
          { type: "inhale", seconds: 1, label: "Top-up inhale" },
          { type: "exhale", seconds: 6, label: "Long exhale" },
        ],
        durationMin: 1,
        notes: "Two short inhales through nose, one long exhale through mouth. Repeat 6-10 cycles.",
      },
      {
        id: "box-4",
        name: "Box 4-4-4-4",
        phases: [
          { type: "inhale", seconds: 4 },
          { type: "hold", seconds: 4 },
          { type: "exhale", seconds: 4 },
          { type: "hold_empty", seconds: 4 },
        ],
        durationMin: 2,
        notes: "Steady pace.",
      },
      {
        id: "rhythm-3",
        name: "Rhythm 3-3",
        phases: [
          { type: "inhale", seconds: 3 },
          { type: "exhale", seconds: 3 },
        ],
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
        phases: [
          { type: "inhale", seconds: 4 },
          { type: "exhale", seconds: 6 },
        ],
        durationMin: 3,
      },
      {
        id: "four-seven-eight",
        name: "4-7-8",
        phases: [
          { type: "inhale", seconds: 4 },
          { type: "hold", seconds: 7 },
          { type: "exhale", seconds: 8 },
        ],
        durationMin: 3,
      },
      {
        id: "three-six",
        name: "Long Exhale 3-6",
        phases: [
          { type: "inhale", seconds: 3 },
          { type: "exhale", seconds: 6 },
        ],
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
        phases: [
          { type: "inhale", seconds: 5 },
          { type: "exhale", seconds: 5 },
        ],
        durationMin: 2,
      },
      {
        id: "counted-exhales",
        name: "Counted Exhales",
        phases: [
          { type: "inhale", seconds: 4 },
          { type: "exhale", seconds: 4 },
        ],
        durationMin: 3,
        notes: "Count only exhales from 1 to 10, repeat.",
      },
      {
        id: "box-3",
        name: "Box 3-3-3-3",
        phases: [
          { type: "inhale", seconds: 3 },
          { type: "hold", seconds: 3 },
          { type: "exhale", seconds: 3 },
          { type: "hold_empty", seconds: 3 },
        ],
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
        phases: [
          { type: "inhale", seconds: 4 },
          { type: "exhale", seconds: 8 },
        ],
        durationMin: 4,
      },
      {
        id: "coherent-5",
        name: "Coherent 5-5",
        phases: [
          { type: "inhale", seconds: 5 },
          { type: "exhale", seconds: 5 },
        ],
        durationMin: 3,
      },
      {
        id: "soft-hold",
        name: "Soft Hold 4-2-6",
        phases: [
          { type: "inhale", seconds: 4 },
          { type: "hold", seconds: 2 },
          { type: "exhale", seconds: 6 },
        ],
        durationMin: 3,
      },
    ],
  },
];
