import Link from "next/link";

export default function EmptyStateHistory() {
    return (
        <section className="w-full px-3 py-8 md:py-12 animate-fade-in fade-in-delay-1">
            <div className="mx-auto w-full max-w-5xl">
                <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl shadow-black/10 dark:border-white/10 dark:bg-[#121820] dark:shadow-black/40 md:p-8">
                    <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
                    <div className="pointer-events-none absolute -left-8 bottom-0 h-36 w-36 rounded-full bg-primary/10 blur-3xl" />

                    <div className="relative flex flex-col gap-6">
                        <div className="flex items-start gap-4">
                            <div className="inline-flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <span className="material-symbols-outlined text-3xl">history</span>
                            </div>
                            <div>
                                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary/80">
                                    Session History
                                </p>
                                <h1 className="mt-1 text-2xl font-extrabold text-slate-500 dark:text-white md:text-3xl">
                                    No sessions yet
                                </h1>
                                <p className="mt-2 max-w-2xl text-sm text-gray-600 dark:text-white/70">
                                    Complete your first breathing session and your progress will show up here automatically.
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-2 sm:grid-cols-3">
                            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-extrabold text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
                                <span className="material-symbols-outlined text-sm text-primary">auto_awesome</span>
                                Auto-saved
                            </div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-extrabold text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
                                <span className="material-symbols-outlined text-sm text-primary">schedule</span>
                                Sorted by latest
                            </div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-extrabold text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
                                <span className="material-symbols-outlined text-sm text-primary">insights</span>
                                Track your reset
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-primary/30 transition duration-200 hover:-translate-y-0.5 active:translate-y-0"
                            >
                                <span className="material-symbols-outlined text-lg">play_arrow</span>
                                Start first session
                            </Link>
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-500 transition duration-200 hover:border-primary/40 hover:text-primary dark:border-white/15 dark:bg-white/5 dark:text-white"
                            >
                                <span className="material-symbols-outlined text-lg">psychiatry</span>
                                Pick a technique
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
