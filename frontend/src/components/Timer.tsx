import { useState, useEffect } from "react";

interface WateringTimerProps {
    startDate: Date;
    isWatering: boolean;
}

const WateringTimer = ({ startDate, isWatering }: WateringTimerProps) => {

    const start = new Date(startDate).getTime();
    const diffInSeconds: number = Math.max(0, Math.floor( 12 * 60 * 60 - (Date.now() - start) / 1000));

    const [time, setTime] = useState<number>(diffInSeconds);

    useEffect(() => {
        if (time <= 0) return;

        const timer = setInterval(() => {
            setTime(Math.max(0, Math.floor( 12 * 60 * 60 - ( Date.now() - start ) / 1000)));
        }, 1000);

        return () => clearInterval(timer);
    }, [time]);

    const formatTime = (seconds: number): string => {
        const h = String(Math.floor(seconds / 3600)).padStart(1, "0");
        const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
        const s = String(seconds % 60).padStart(2, "0");
        return `${h}:${m}:${s}`;
    };

    return (
        <div className={`text-6xl font-bold pt-20 ${ isWatering ? "text-green-500" : "text-blue-800" }`}>
            {formatTime(time)}
        </div>
    );
};

export default WateringTimer;