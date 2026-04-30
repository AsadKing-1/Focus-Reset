import { Check } from "lucide-react";

export default function SuccessView() {
    return (
        <div className="flex flex-col items-center gap-4 p-6 text-center">
            <div className="h-12 w-12 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                <Check className="size-7" />
            </div>
            <div>
                <p className="text-lg font-extrabold">Ready</p>
                <p className="text-sm text-gray-600">Personalized technique found</p>
            </div>
        </div>
    )
}
