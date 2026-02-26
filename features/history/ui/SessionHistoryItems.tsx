import type { SessionHistoryItem } from "@/entities/breathing/model/types";

interface SessionHistoryItemsProps {
  item: SessionHistoryItem;
}

const FEELING_META: Record<
  Exclude<SessionHistoryItem["feelingAfter"], null>,
  { icon: string; label: string }
> = {
  Stressed: { icon: "sentiment_stressed", label: "Stressed" },
  Neutral: { icon: "sentiment_neutral", label: "Neutral" },
  Calm: { icon: "sentiment_calm", label: "Calm" },
  Energized: { icon: "bolt", label: "Energized" },
};

function formatEndedAt(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown time";

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default function SessionHistoryItems({ item }: SessionHistoryItemsProps) {
  const feelingMeta = item.feelingAfter ? FEELING_META[item.feelingAfter] : null;
  const hasNotes = item.notes.trim().length > 0;

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-[#1c2127]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary/80">
            {formatEndedAt(item.endedAt)}
          </p>
          <h2 className="mt-1 text-xl font-extrabold text-slate-600 dark:text-white">
            {item.techniqueName}
          </h2>
        </div>
        <div className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-extrabold text-primary">
          <span className="material-symbols-outlined text-base">schedule</span>
          {item.durationMin} min
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-extrabold text-slate-500 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-200">
          <span className="material-symbols-outlined text-sm">air</span>
          {item.techniqueName}
        </span>
        {feelingMeta && (
          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-extrabold text-slate-500 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-200">
            <span className="material-symbols-outlined text-sm">{feelingMeta.icon}</span>
            {feelingMeta.label}
          </span>
        )}
      </div>

      {hasNotes && (
        <p className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-200">
          {item.notes}
        </p>
      )}
    </article>
  );
}
