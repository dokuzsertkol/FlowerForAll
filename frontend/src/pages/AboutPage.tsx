import { useState, useEffect } from "react";
import { getSettings } from "../services/settingsService";
import { SettingsDTO } from "../dtos/settingsDto";

import Loading from "../components/Loading";
import flower3Img from "../assets/flower3.png";
import flower2Img from "../assets/flower2.png";
import flower1Img from "../assets/flower1.png";
import flower0Img from "../assets/flower0.png";

const AboutPage = () => {
    const [settings, setSettings] = useState<SettingsDTO>({ totalStateCount: 0, intervalHours: 0, deathHours: 0});
    const [loading, setLoading] = useState(false);

    const githubLink = "https://github.com/dokuzsertkol/FlowerForAll";

    const fetchSettings = async () => {
        setLoading(true);
        const res = await getSettings();
        setSettings(res.data.Data);
        setLoading(false);
    };
  
    useEffect(() => {
        fetchSettings();
    }, []);

    if (loading) return <Loading />;

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 space-y-4">
            <main className="max-w-4xl mx-auto px-6 py-12 prose prose-lg prose-slate pt-20">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold text-blue-800">About FlowerForAll</h1>
                    <p className="mt-2 text-slate-600">
                        FlowerForAll is a simple interactive experience that invites the world to
                        care for a single shared flower.
                    </p>
                </header>

                <section className="bg-white rounded-2xl shadow-sm p-6">
                    <h2 className="text-2xl font-semibold">What you see</h2>
                    <p className="mt-2 text-slate-700">
                        When you open the site, a flower appears on the screen with a countdown timer on it.
                        The timer steadily counts down. When the countdown hits zero the flower dies, 
                        every <strong>{settings.intervalHours} hours</strong> without water the flower moves to the next 
                        visual state. You can click the <strong>Water The Flower</strong> button to water the flower 
                        and reset the timer. Don't worry about overwatering, giving it water as often as you like, it won't harm it.
                    </p>
                    <p className="mt-2 text-sm text-slate-700">
                        If the flower appears watered even if you didn't click, that means someone else, somewhere in the world, just watered it.
                    </p>
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col items-center gap-3">
                            <img src={flower3Img} alt="Healthy flower" className="w-40 h-40 object-contain animate-swing-fast" />
                            <p className="text-center text-sm">Healthy</p>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <img src={flower2Img} alt="Thirsty flower" className="w-40 h-40 object-contain animate-swing-mid" />
                            <p className="text-center text-sm">Thirsty</p>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <img src={flower1Img} alt="Sick flower" className="w-40 h-40 object-contain animate-swing-slow" />
                            <p className="text-center text-sm">Sick</p>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <img src={flower0Img} alt="Dead flower" className="w-40 h-40 object-contain" />
                            <p className="text-center text-sm">Dead</p>
                        </div>
                    </div>
                    <p className="mt-6 text-slate-700">
                    The flower has <strong>{settings.totalStateCount}</strong> visual states (examples shown above).
                    It will die if it goes unwatered for <strong>{settings.deathHours} hours</strong> in total.
                    Every <strong>{settings.intervalHours} hours</strong> without water, the flower progresses to the
                    next less healthy state until it reaches the final, dead state.
                    </p>
                </section>
                <section className="mt-8 bg-white rounded-2xl shadow-sm p-6">
                    <h2 className="text-2xl font-semibold">How to interact</h2>
                    <ol className="list-decimal list-inside mt-3 text-slate-700">
                        <li>Click the <strong>Water The Flower</strong> button under the flower to give it water and reset the timer.</li>
                        <li>If the flower ever reaches the dead state, a <strong>Create New Flower</strong> button appears instead of the Water button, anyone can create a fresh flower.</li>
                        <li>Visit the <strong>Leaderboard</strong> page to see the five flowers that have lived the longest so far.</li>
                    </ol>
                </section>

                <section className="mt-8 bg-white rounded-2xl shadow-sm p-6">
                    <h2 className="text-2xl font-semibold">Community and code</h2>
                    <p className="mt-2 text-slate-700">
                        FlowerForAll is intentionally communal: the flower belongs to everyone across the globe.
                        You don't need an account to water it, just visit and help keep it alive. If you're
                        interested in the implementation, the project code is available on GitHub.
                    </p>
                    <p className="mt-4">
                    <a href={githubLink} className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg shadow-sm text-sm" target="_blank" rel="noopener noreferrer" >
                        View source on GitHub
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14L21 3m0 0v7m0-7h-7" />
                        </svg>
                    </a>
                    </p>
                </section>

                <footer className="mt-10 text-sm text-slate-500">
                    <p>
                        Quick facts: the flower dies after <strong>{settings.deathHours} hours</strong> without water, and shows a
                        new state every <strong>{settings.intervalHours} hours</strong>. The leaderboard shows the top 5 longest-lived
                        flowers site-wide.
                    </p>
                </footer>
            </main>
        </div>
    );
};

export default AboutPage;