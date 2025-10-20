import { useState, useEffect } from "react";
import FlowerTable from "../components/Table";
import Loading from "../components/Loading";

import { getDeadFlowers } from "../services/flowerService";

const LeaderboardPage = () => {
  
    const [deadFlowers, setDeadFlowers] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchDeadFlowers = async () => {
        setLoading(true);

        const res = await getDeadFlowers();

        console.log(res.data.Data);

        setDeadFlowers(res.data.Data);

        setLoading(false);
    };

    useEffect(() => {
        fetchDeadFlowers();
    }, []);

    if (loading) return <Loading />;

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-100 space-y-2 pt-20">
        <h1 className="text-6xl font-bold text-blue-800">Leaderboard</h1>
        <FlowerTable flowers={deadFlowers}/>
        </div>
    );
};

export default LeaderboardPage;
