import { useState, useEffect } from "react";

import { Feelings, TimeOption, BreathingSet } from "@/entities/breathing/model/types";

import LoadingView from "./LoadingView";
import SuccessView from "./SuccessView";
import ResultView from "./ResultView";

interface DialogContentProps {
    selectedFeeling: Feelings | null;
    selectedTime: TimeOption | null;
    recommendation: BreathingSet | null;
    onClose: () => void;
}

type DialogPhase = "loading" | "success" | "result";

export default function DialogContent({ selectedFeeling, selectedTime, recommendation, onClose }: DialogContentProps) {
    const [phase, setPhase] = useState<DialogPhase>("loading");

    useEffect(() => {
        const timerSuccess = setTimeout(() => setPhase("success"), 900);
        const timerResult = setTimeout(() => setPhase("result"), 1600);

        return () => {
            clearTimeout(timerSuccess);
            clearTimeout(timerResult);
        };
    }, [])

    if (phase === "loading") return <LoadingView />;
    if (phase === "success") return <SuccessView />;

    return (
        <ResultView
            recommendation={recommendation}
            onClose={onClose}
            selectedFeeling={selectedFeeling}
            selectedTime={selectedTime}
        />
    )
}