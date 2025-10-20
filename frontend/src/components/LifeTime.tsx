import { useEffect, useState } from "react";

interface LifeTimeProps {
    startDate: Date;
    healthState: number;
    diedAt: Date | null;
}

const LifeTime = ({ startDate, healthState, diedAt }: LifeTimeProps) => {
    const [elapsed, setElapsed] = useState("");

    useEffect(() => {
        const start: Date = new Date(startDate);
        const end: Date = healthState === 0 && diedAt ? new Date(diedAt) : new Date();

        const updateElapsed = (endTime: Date): void => {
            const diff: number = Math.floor((endTime.getTime() - start.getTime()) / 1000);
            const days: number = Math.floor(diff / (3600 * 24));
            const hours: number = Math.floor((diff % (3600 * 24)) / 3600);
            const minutes: number = Math.floor((diff % 3600) / 60);
            const seconds:number  = diff % 60;

            const parts = [];
            if (days > 0) parts.push(`${days}d`);
            if (hours > 0) parts.push(`${hours}h`);
            if (minutes > 0) parts.push(`${minutes}m`);
            if (seconds > 0) parts.push(`${seconds}s`);

            setElapsed(parts.join(", "));
        };

        updateElapsed(end);

        if (healthState !== 0) {
            const timer = setInterval(() => updateElapsed(new Date()), 1000);
            return () => clearInterval(timer);
        }
    }, [startDate, healthState, diedAt]);

    return (
        <div className={`text-xl font-semibold ${healthState === 0 ? "text-gray-600" : "text-blue-600"} mb-8`}>
            Age: {elapsed}
        </div>
    );
}

export default LifeTime;