"use client";

import { useSessionHistory } from "@/hooks/useSessionHistory";
import EmptyStateHistory from "./EmptyStateHistory";
import SessionHistoryItems from "./SessionHistoryItems";

export default function HistoryContent() {
    const { sessionHistory, isHydrated, error } = useSessionHistory();

    if (!isHydrated) {
        return (
            <section className="w-full px-3 py-8 md:py-12 animate-fade-in">
                <div className="mx-auto w-full max-w-5xl rounded-2xl border border-gray-200 bg-white p-6 text-sm font-medium text-slate-500 shadow-sm">
                    Loading session history...
                </div>
            </section>
        );
    }

    if (sessionHistory.length === 0) {
        return <EmptyStateHistory />;
    }

    return (
        <section className="w-full px-3 py-8 md:py-12 animate-fade-in fade-in-delay-1">
            <div className="mx-auto w-full max-w-6xl">
                <div className="mb-4 rounded-2xl p-5 shadow-sm bg-(--bg-800)">
                    <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary/80">
                        Session History
                    </p>
                    <h1 className="mt-1 text-2xl font-extrabold text-slate-600 md:text-3xl">
                        Your Breathing Sessions
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                        {sessionHistory.length} sessions recorded.
                    </p>
                    {error && (
                        <p className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
                            {error}
                        </p>
                    )}
                </div>

                <div className="grid gap-3 md:gap-4">
                    {sessionHistory.map((sessionItem) => (
                        <SessionHistoryItems key={sessionItem.id} item={sessionItem} />
                    ))}
                </div>
            </div>
        </section>
    );
}
