import type { LucideIcon } from "lucide-react";
import { Feelings } from "@/entities/breathing/model/types";
import { BatteryLow, Bed, Brain, Smile, Waves } from "lucide-react";

interface FeelingsCardProps {
    feeling: Feelings;
    icon: LucideIcon;
    description: string;
}

export const FeelingCardGroup: FeelingsCardProps[] = [
    {
        feeling: "Fatigued",
        icon: BatteryLow,
        description: "Low Energy, mental fog",
    },
    {
        feeling: "Overwhelmed",
        icon: Waves,
        description: "Too many Tasks at once",
    },
    {
        feeling: "Mind Wandering",
        icon: Brain,
        description: "Mind is wandering",
    },
    {
        feeling: "Sleepy",
        icon: Bed,
        description: "Need a quick wake up",
    }
];