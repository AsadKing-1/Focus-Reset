export const dynamic = "force-dynamic";

import StarBreating from "@/components/StartBreating/StartBreating";
import { breathingSets } from "@/data/breathingSets";

type SessionsPageProps = {
    searchParams?: {
        tech?: string | string[];
        time?: string | string[];
    };
};

export default function SessionsPage({ searchParams }: SessionsPageProps) {
    const techValue = searchParams?.tech;
    const timeValue = searchParams?.time;
    const techId = Array.isArray(techValue) ? techValue[0] : techValue;
    const selectedTime = Array.isArray(timeValue) ? timeValue[0] : timeValue;

    const technique = breathingSets
        .flatMap((set) => set.techniques)
        .find((t) => t.id === techId);

    if (!technique) return <div>Technique not found</div>;

    return (
        <div>
            <div className="p-3 pt-20 animate-fade-in fade-in-delay-1">
                <h1 className="text-[25px] md:text-[35px] font-extrabold text-center dark:text-white">Based on your current state, we recommend...</h1>
                <p className="text-gray-400 text-center">This technique is tailored to lower your heart rate and improve focus.</p>
            </div>
            <div className="p-3 pb-10">
                <div className="mx-auto w-full max-w-5xl">
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-black/10 dark:border-white/10 dark:bg-[#121820] dark:shadow-black/40">
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr]">
                            <div className="border-b border-gray-200/70 dark:border-white/10 md:border-b-0 md:border-r">
                                <StarBreating />
                            </div>
                            <div className="p-6 md:p-8">
                                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide text-primary/80">
                                    <span className="material-symbols-outlined text-base">schedule</span>
                                    {selectedTime ? `${selectedTime} session` : "Session"}
                                </div>
                                <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
                                    {technique.name}
                                </h2>
                                <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-white/70">
                                    Follow the rhythm below to reset your focus and lower stress. Breathe smoothly and keep a steady pace.
                                </p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    <span className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-extrabold text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
                                        <span className="material-symbols-outlined text-sm">spa</span>
                                        Reduces Stress
                                    </span>
                                    <span className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-extrabold text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
                                        <span className="material-symbols-outlined text-sm">bolt</span>
                                        Sharpens Focus
                                    </span>
                                </div>
                                <button className="flex justify-center items-center mt-6 w-full rounded-xl bg-primary px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-primary/30 transition duration-200 hover:-translate-y-0.5 active:translate-y-0">
                                    <span className="material-symbols-outlined text-lg align-[-2px]">play_arrow</span>
                                    <span className="ml-2">Start Session</span>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center gap-2 text-xs text-gray-400 uppercase tracking-widest">
                <span className="material-symbols-outlined text-sm">info</span>
                <span>Based on your "Anxious" assessment</span>
            </div>
        </div>
    );
}
