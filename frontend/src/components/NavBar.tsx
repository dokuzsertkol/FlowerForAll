import { useState, useEffect } from "react";
import { Link, useLocation, Location } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location: Location = useLocation();

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    return (
        <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between"> 
                <div className="flex items-center gap-x-12">
                    <h1 className="text-2xl font-bold text-blue-800">FlowerForAll</h1>
                    <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
                        <li><Link to="/">Flower</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/leaderboard">Leaderboard</Link></li>
                    </ul>
                </div>
                <button className="md:hidden text-gray-700 focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {isOpen && (
                <ul className="md:hidden bg-white px-4 pb-4 space-y-2">
                    <li><Link to="/" className="block">Flower</Link></li>
                    <li><Link to="/about" className="block">About</Link></li>
                    <li><Link to="/leaderboard" className="block">Leaderboard</Link></li>
                </ul>
            )}
        </nav>
    );
}

export default Navbar;
