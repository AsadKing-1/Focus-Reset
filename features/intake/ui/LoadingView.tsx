export default function LoadingView() {
    return (
        <div className="flex flex-col items-center gap-4 p-6 text-center">
            <div className="h-12 w-12 rounded-full border-4 border-gray-200 border-t-primary animate-spin dark:border-white/20" />
            <div>
                <p className="text-lg font-extrabold">Finding the best reset...</p>
                <p className="text-sm text-gray-600 dark:text-white/60">Analyzing your mood and time</p>
            </div>
        </div>
    )
}