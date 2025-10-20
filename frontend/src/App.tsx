import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import FlowerPage from "./pages/FlowerPage";
import AboutPage from "./pages/AboutPage";
import LeaderboardPage from "./pages/LeaderboardPage";

import Navbar from "./components/NavBar"

const App = () => {
  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<FlowerPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
        </Routes>
      </div>
      <footer className="w-full py-6 text-center text-sm text-slate-500 border-t border-slate-200">
        <p className="text-sm text-slate-500 text-center">
          © {new Date().getFullYear()} FlowerForAll - Licensed under{" "}
          <a
            href="https://www.gnu.org/licenses/gpl-3.0.en.html"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-slate-700"
          >
            GPLv3
          </a>
          {" "} • Created by{" "}
          <a
            href="https://github.com/dokuzsertkol"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-slate-700 underline hover:text-slate-900"
          >
            dokuzsertkol
          </a>
        </p>
      </footer>
    </Router>
  );
};

export default App;
