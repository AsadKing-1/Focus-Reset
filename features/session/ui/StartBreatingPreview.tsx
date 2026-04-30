import { Grid2x2 } from "lucide-react";

export default function StarBreatingPreview() {
    return (
        <div className="w-full h-full flex items-center justify-center p-8  text-gray-900 bg-(--bg-800)">
            <div className="relative w-48 h-48 border-4 border-dashed border-primary/40 rounded-xl flex items-center justify-center">
                <Grid2x2 className="size-20 text-primary" />
                <div className="absolute inset-0 border-2 border-primary/90 rounded-xl opacity-40 animate-pulse"></div>
            </div>
        </div>
    )
}
