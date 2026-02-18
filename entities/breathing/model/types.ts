/*
TODO(модель):
- Проверить необходимость типа Technique: если не используется, удалить для упрощения модели.
- Согласовать SessionStatus и TimeOption со всеми UI-компонентами (сейчас часть UI всё ещё ожидает строки).
- По возможности зафиксировать словари через readonly/const-данные для большей типобезопасности.
*/

export type Feelings = "Fatigued" | "Overwhelmed" | "Mind Wandering" | "Sleepy";
export type TimeOption = (2 | 5 | 10);
export type SessionStatus = "Not Started" | "Active" | "Finished";
export type PhaseType = "inhale" | "hold" | "exhale";
export type AfterSessionFeeling =
  | "Stressed"
  | "Neutral"
  | "Calm"
  | "Energized"
  | null;

export type Phase = {
  type: PhaseType;
  seconds: number;
  label?: string;
};

// TODO(cleanup): удалить, если тип Technique нигде не используется.
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
