"use client";

export default function FeelingSection() {
    return (
        <div>
            <div className="flex items-center gap-2 p-3.5">
                <span className="material-symbols-outlined size-6 dark:text-primary">
                    mood
                </span>
                <span className="dark:text-white">How are you feeling?</span>
            </div>
            <div className="w-full grid grid-cols-2 gap-4 p-3.5">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 shadow-lg shadow-black/20 backdrop-blur-md">
                    <div>
                        <span className="material-symbols-outlined bg-white/10 border-white/15 rounded-md p-3 mb-2">
                            battery_android_frame_1
                        </span>
                        <h2>Fatigued</h2>
                        <p className="text-[14px]">Low Energy, mental fog</p>
                    </div>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 shadow-lg shadow-black/20 backdrop-blur-md">
                    <div>
                        <span className="material-symbols-outlined bg-gray-100 p-3 mb-2">
                            waves
                        </span>
                        <h2>OverWhelmed</h2>
                        <p className="text-[14px]">Too many Tasks at once</p>
                    </div>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 shadow-lg shadow-black/20 backdrop-blur-md">
                    <div>
                        <span className="material-symbols-outlined bg-gray-100 p-3 mb-2">
                            blur_on
                        </span>
                        <h2>Fatigued</h2>
                        <p className="text-[14px]">Mind is wandering</p>
                    </div>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 shadow-lg shadow-black/20 backdrop-blur-md">
                    <div>
                        <span className="material-symbols-outlined bg-gray-100 p-3 mb-2">
                            bedtime
                        </span>
                        <h2>Sleepy</h2>
                        <p className="text-[14px]">Need a quick wake up</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
