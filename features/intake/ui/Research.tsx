import { Info } from "lucide-react";

export default function Research() {
    return (
        <div className="p-3">
            <div className="mt-2 p-6 bg-(--bg-800) shadow-lg shadow-black/20 flex items-start gap-4 rounded-xl ">
                <Info className="mt-1 size-5 shrink-0 text-primary" />
                <p className="calm-text text-sm leading-relaxed">
                    Research suggests that even a 5-minute focused reset can reduce cortical arousal and improve cognitive performance by up to 20% in high-stress environments.
                </p>
            </div>
        </div>
    )
}
