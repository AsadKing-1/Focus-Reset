import { NotebookPen } from "lucide-react";

interface InputFeelingsProps {
    value: string
    onChange: (value: string) => void
}

export default function InputFeelings({ value, onChange }: InputFeelingsProps) {
    return (
        <div className="w-full max-w-300">
            <div className="flex justify-between items-center pb-2">
                <div className="flex items-center gap-2">
                    <NotebookPen className="size-5 text-primary" />
                    <span className="font-bold text-slate-500">Anything on your mind?</span>
                </div>
                <div className="px-2 font-medium text-slate-500">
                    Optional
                </div>
            </div>
            <div>
                <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder="Briefly capture your current state or any insights from the session..." className="w-full rounded-lg border bg-gray-100 shadow-sm border-slate-200 px-3 py-2 h-30 focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
        </div>
    )
}
