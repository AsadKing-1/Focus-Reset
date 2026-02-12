import { useState } from "react"

export default function FeelingAfterSession() {
    return (
        <div className="w-full max-w-300">
            <div className="flex justify-center gap-2 w-full text-left py-2">
                <span className="material-symbols-outlined text-2xl dark:text-primary">
                    sentiment_satisfied
                </span>
                <span className="font-medium dark:text-white">
                    How do you feel now?
                </span>
            </div>
            <div className="bg-gray-200/50 dark:bg-primary/10 rounded-2xl flex justify-center gap-4 py-4">
                <div className="flex flex-col justify-center items-center">
                    <span className="material-symbols-outlined text-2xl dark:text-primary">
                        sentiment_stressed
                    </span>
                    <div className="font-extrabold dark:text-white">
                        Stressed
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <span className="material-symbols-outlined text-2xl dark:text-primary">
                        sentiment_neutral
                    </span>
                    <div className="font-extrabold dark:text-white">
                        Neutral
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <span className="material-symbols-outlined text-2xl dark:text-primary">
                        sentiment_calm
                    </span>
                    <div className="font-extrabold dark:text-white">
                        Calm
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <span className="material-symbols-outlined text-2xl dark:text-primary">
                        bolt
                    </span>
                    <div className="font-extrabold dark:text-white">
                        Energized
                    </div>
                </div>
            </div>
        </div>
    )
}