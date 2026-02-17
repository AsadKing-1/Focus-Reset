/*
TODO(читаемость/данные):
- Сделать компонент управляемым через props (value/onChange), чтобы родитель мог сохранить текст.
- Добавить ограничение длины и подсчёт символов для предсказуемого UX.
- При необходимости выделить валидацию в отдельный helper.
*/

export default function InputFeelings() {
    return (
        <div className="w-full max-w-300">
            <div className="flex justify-between items-center pb-2">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">edit_note</span>
                    <span className="font-bold text-slate-500 dark:text-white">Anything on your mind?</span>
                </div>
                <div className="px-2 font-medium text-slate-500 dark:text-slate-400">
                    Optional
                </div>
            </div>
            <div>
                {/* TODO(architecture): сделать value/onChange через props, чтобы родитель мог сохранять текст. */}
                <textarea placeholder="Briefly capture your current state or any insights from the session..." className="w-full dark:text-white rounded-lg border bg-gray-100 shadow-sm dark:bg-[#1c2127] border-slate-200 dark:border-slate-800 px-3 py-2 h-30 focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
        </div>
    )
}
