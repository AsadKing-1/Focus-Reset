import { Suspense } from "react";
import SessionClient from "./SessionClient";

/*
TODO(читаемость):
- Вынести fallback в отдельный shared-компонент, чтобы не дублировать стили загрузки.
- Добавить error boundary на уровень маршрута для ошибок в SessionClient.
*/

export default function SessionsPage() {
    return (
        <Suspense fallback={<div className="p-6 text-center text-sm text-gray-400">Loading session...</div>}>
            <SessionClient />
        </Suspense>
    );
}
