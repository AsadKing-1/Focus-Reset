import type { AfterSessionFeeling } from "@/entities/breathing/model/types";
import { Frown, Meh, Smile, SmilePlus, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const feelings: { icon: LucideIcon; label: Exclude<AfterSessionFeeling, null> }[] = [
    { icon: Frown, label: "Stressed" },
    { icon: Meh, label: "Neutral" },
    { icon: Smile, label: "Calm" },
    { icon: Zap, label: "Energized" }
];

// TODO(доступность/типы): Сделать `feelings as const`, вывести тип из массива и добавить видимую подпись/aria-pressed.
// Сейчас кнопки выбора показывают только иконки, поэтому смысл хуже считывается клавиатурой и скринридером.
interface FeelingAfterSessionProps {
    value: AfterSessionFeeling;
    onChange: (value: AfterSessionFeeling) => void;
}


export default function FeelingAfterSession({value, onChange}: FeelingAfterSessionProps) {
    return (
        <div className="w-full max-w-300">
            <div className="px-3">
                <div className="flex items-center gap-2 w-full text-left py-1">
                    <SmilePlus className="size-6 text-primary" />
                    <span className="font-extrabold text-slate-500">
                        How do you feel now?
                    </span>
                </div>
            </div>
            <div className="p-3">
                <div className="bg-gray-100 shadow-sm border border-slate-200 rounded-2xl flex justify-around items-center p-3">
                    {feelings.map((f) => {
                        const Icon = f.icon;

                        return (
                            <button
                                key={f.label}
                                type="button"
                                aria-label={`Feeling ${f.label}`}
                                aria-pressed={value === f.label}
                                onClick={() => onChange(f.label)}
                                className={`w-full transition-all duration-300 flex flex-col justify-center items-center px-3 py-5 ${value === f.label ? 'bg-primary/20 rounded-sm' : ''}`}
                            >
                                <Icon className="size-6 text-primary" />
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}
