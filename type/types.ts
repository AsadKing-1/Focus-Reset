export type Feelings = "Fatigued" | "Overwhelmed" | "Mind Wandering" | "Sleepy";
export type TimeOption = "2 min" | "5 min" | "10 min";
export type SessionStatus = "Not Started" | "Active" | "Finished";

export type BreathingTechnique = {
  id: string;
  name: string;
  pattern: string;
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
