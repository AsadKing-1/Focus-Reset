import type { SessionHistoryItem } from "@/entities/breathing/model/types";
import { FEELING_META } from "@/features/history/model/SessionHistoryEntities";
import { formatEndedAt } from "@/features/history/model/SessionHistoryEntities";
import { Clock, Wind } from "lucide-react";

interface SessionHistoryItemsProps {
  item: SessionHistoryItem;
}

export default function SessionHistoryItems({ item }: SessionHistoryItemsProps) {
  
  const feelingMeta = item.feelingAfter ? FEELING_META[item.feelingAfter] : null;
  const FeelingIcon = feelingMeta?.icon;
  const hasNotes = item.notes.trim().length > 0;

  return (
    <article className="rounded-2xl p-5 shadow-sm transition-all hover:scale-[1.03] hover:shadow-md bg-(--bg-800) border-gradient duration-300">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary/80">
            {formatEndedAt(item.endedAt)}
          </p>
          <h2 className="mt-1 text-xl font-extrabold text-slate-600">
            {item.techniqueName}
          </h2>
        </div>
        <div className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-extrabold text-primary">
          <Clock className="size-4" />
          {item.durationMin} min
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-extrabold text-slate-500">
          <Wind className="size-3.5" />
          {item.techniqueName}
        </span>
        {feelingMeta && FeelingIcon && (
          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-extrabold text-slate-500">
            <FeelingIcon className="size-3.5" />
            {feelingMeta.label}
          </span>
        )}
      </div>

      {hasNotes && (
        <p className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
          {item.notes}
        </p>
      )}
    </article>
  );
}
