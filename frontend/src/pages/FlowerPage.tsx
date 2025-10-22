import { useState, useEffect } from "react";
import io from "socket.io-client";
import { getFlower, createFlower, waterFlower, setFlowerDead } from "../services/flowerService";
import { getSettings } from "../services/settingsService";
import { FlowerDTO } from "../dtos/flowerDto";
import { SettingsDTO } from "../dtos/settingsDto";

import WateringTimer from "../components/Timer";
import Loading from "../components/Loading";
import LifeTime from "../components/LifeTime";

import cloudImg from "../assets/cloud.png";
import flower3Img from "../assets/flower3.png";
import flower2Img from "../assets/flower2.png";
import flower1Img from "../assets/flower1.png";
import flower0Img from "../assets/flower0.png";

const socket = io(import.meta.env.VITE_BACKEND_URL);

const FlowerPage = () => {

    const [flower, setFlower] = useState<FlowerDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isRaining, setIsRaining] = useState<boolean>(false);
    const [settings, setSettings] = useState<SettingsDTO>({ totalStateCount: 0, intervalHours: 0, deathHours: 0});
        

    const fetchFlower = async (): Promise<void> => {

        try {
            setLoading(true);
            const res = await getFlower();
            const fetchedFlower: FlowerDTO | null = res.data.Data;
            if (fetchedFlower) setFlower(fetchedFlower);
        } catch (error) {
            console.error("Flower fetch failed", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSettings = async () => {

      const settingsRes = await getSettings();
      const fetchedSettings: SettingsDTO = settingsRes.data.Data;
      setSettings(fetchedSettings);
    }

    useEffect(() => {
        fetchFlower();
        fetchSettings();

        const handleFlowerUpdate = (payload: { flower: FlowerDTO }) => {
            setFlower(payload.flower);
            setIsRaining(true);
            setTimeout(() => setIsRaining(false), 1000);
        };

        socket.on("flowerUpdated", handleFlowerUpdate);
        return () => {
            socket.off("flowerUpdated", handleFlowerUpdate);
        };
    }, [socket]);

    const handleCreate = async () => {

        await setFlowerDead();
        const res = await createFlower();
        const fetchedFlower: FlowerDTO | null = res.data.Data;
        if (fetchedFlower) setFlower(fetchedFlower);
    };

    const handleWater = async () => {
        const res = await waterFlower();
        const fetchedFlower: FlowerDTO | null = res.data.Data;
        if (fetchedFlower) setFlower(fetchedFlower);

        setIsRaining(true);
        setTimeout(() => setIsRaining(false), 1000);
    };

    if (loading) return <Loading />;
    if (!flower) return <Loading />;

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-100 space-y-4">
            
            <WateringTimer key={flower.flowerNumber} startDate={flower.lastWateredAt} isWatering={isRaining}/>
        
            <div className="relative mx-auto w-[220px] h-[100px] flex items-center justify-center">
                <img src={cloudImg} alt="cloud" className="absolute w-[300px] h-[150px] object-contain pointer-events-none z-20"/>
                <h1 className="text-3xl font-semibold text-gray-800 text-center py-16 z-30">Flower #{flower.flowerNumber}</h1>

                {isRaining && (
                <>
                    <div className="absolute w-1 h-4 bg-blue-400 rounded-full left-30 animate-fall z-10"></div>
                    <div className="absolute w-1 h-4 bg-blue-400 rounded-full left-20 animate-fall z-10"></div>
                    <div className="absolute w-1 h-4 bg-blue-400 rounded-full left-30 animate-fall delay-200 z-10"></div>
                    <div className="absolute w-1 h-4 bg-blue-400 rounded-full left-40 animate-fall delay-200 z-10"></div>
                    <div className="absolute w-1 h-4 bg-blue-400 rounded-full left-10 animate-fall delay-300 z-10"></div>
                    <div className="absolute w-1 h-4 bg-blue-400 rounded-full left-35 animate-fall delay-300 z-10"></div>
                    <div className="absolute w-1 h-4 bg-blue-400 rounded-full left-15 animate-fall delay-400 z-10"></div>
                    <div className="absolute w-1 h-4 bg-blue-400 rounded-full left-45 animate-fall delay-400 z-10"></div>
                    <div className="absolute w-1 h-4 bg-blue-400 rounded-full left-10 animate-fall delay-500 z-10"></div>
                    <div className="absolute w-1 h-4 bg-blue-400 rounded-full left-30 animate-fall delay-500 z-10"></div>
                </>
                )}
            </div>

            {flower.healthState === 3 ? (
                
            <img src={flower3Img} alt="healthy flower" className="w-48 h-48 object-contain animate-swing-fast z-0" />
            ) : flower.healthState === 2 ? (

                <img src={flower2Img} alt="thirsty flower" className="w-48 h-48 object-contain animate-swing-mid z-0" />
            ) : flower.healthState === 1 ? (
                
                <img src={flower1Img} alt="sick flower" className="w-48 h-48 object-contain animate-swing-slow z-0" />
            ) : (
                
                <img src={flower0Img} alt="dead flower" className="w-48 h-48 object-contain z-0" />
            )}

            {flower.healthState === 3 || flower.healthState === 2 || flower.healthState === 1 ? (
                
                <button onClick={handleWater} className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600">
                    Water The Flower
                </button>
            ) : (
                <button onClick={handleCreate} className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600">
                    Create New Flower
                </button>
            )}
            <LifeTime startDate={flower.createdAt} healthState={flower.healthState} diedAt={flower.diedAt} lastWateredAt={flower.lastWateredAt} stateCount={settings.totalStateCount} stateIntervalHours={settings.intervalHours}/>
        </div>
    );
};

export default FlowerPage;
