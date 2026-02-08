import { Suspense } from "react";
import SessionClient from "./SessionClient";

export default function SessionsPage() {
    return (
        <Suspense fallback={<div className="p-6 text-center text-sm text-gray-400">Loading session...</div>}>
            <SessionClient />
        </Suspense>
    );
}
