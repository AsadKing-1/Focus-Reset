export type Feelings = "Fatigued" | "Overwhelmed" | "Mind Wandering" | "Sleepy";
export type TimeOption = "2 min" | "5 min" | "10 min";
export type SessionStatus = "Not Started" | "Active" | "Finished";
export type PhaseType = "inhale" | "hold" | "exhale";
export type AfterSessionFeeling = "Stressed" | "Neutral" | "Calm" | "Energized" | null;

export type Phase = {
  type: PhaseType;
  seconds: number;
  label?: string;
};

export type Technique = {
  name: string;
  phases: Phase[];
  cycles?: number;
  totalSeconds: number;
};

export type BreathingTechnique = {
  id: string;
  name: string;
  phases: Phase[];
  durationMin: number;
  notes?: string;
};

export type BreathingSet = {
  id: string;
  title: string;
  intent: "boost" | "calm" | "focus" | "reset";
  feelings: Feelings[];
  times: TimeOption[];
  summary: string;
  techniques: BreathingTechnique[];
};
