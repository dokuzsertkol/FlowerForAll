import { useState, useEffect } from "react";
import FlowerTable from "../components/Table";
import Loading from "../components/Loading";

import { getLeaderboard } from "../services/flowerService";

const LeaderboardPage = () => {
  
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchLeaderboard = async () => {
        setLoading(true);

        const res = await getLeaderboard();

        console.log(res.data.Data);

        setLeaderboard(res.data.Data);

        setLoading(false);
    };

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    if (loading) return <Loading />;

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-100 space-y-2 pt-20">
        <h1 className="text-6xl font-bold text-blue-800">Leaderboard</h1>
        <FlowerTable flowers={leaderboard}/>
        </div>
    );
};

export default LeaderboardPage;
