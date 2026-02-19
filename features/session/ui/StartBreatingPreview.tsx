export default function StarBreatingPreview() {
    return (
        <div className="w-full h-full flex items-center justify-center p-8 bg-gray-50 text-gray-900 dark:bg-[#151a1f] dark:text-white">
            <div className="relative w-48 h-48 border-4 border-dashed border-primary/40 dark:border-primary/30 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-7xl">grid_view</span>
                <div className="absolute inset-0 border-2 border-primary/30 dark:border-primary/40 rounded-xl opacity-40 dark:opacity-20 animate-pulse"></div>
            </div>
        </div>
    )
}
