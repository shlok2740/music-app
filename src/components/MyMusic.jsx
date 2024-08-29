import React from "react";
import CTA from "./CTA";

const MyMusic = () => {
    return (
        <div className="flex-1 p-8 bg-gray-50">
            <header className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Hi there!</h2>
                <div className="flex items-center space-x-4">
                    <input
                        type="text"
                        placeholder="Search"
                        className="px-4 py-2 rounded-full bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <img
                        src="vite.svg"
                        alt="User"
                        className="w-10 h-10 rounded-full border-2 border-blue-500"
                    />
                </div>
            </header>
            <div className="bg-blue-500 text-white p-6 rounded-lg mb-8 flex justify-between items-center">
                <CTA />
            </div>
            {/* Statistics and Playlists */}
            <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4">Statistics</h3>
                    <div className="h-40 bg-gray-200 rounded"></div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4">Playlists</h3>
                    {/* Playlist items */}
                    <div className="grid grid-cols-3 gap-4">
                        {[
                            "New Playlist",
                            "Eminem Essentials",
                            "My Shazam Tracks",
                        ].map((playlist) => (
                            <div
                                key={playlist}
                                className="bg-gray-200 h-24 rounded flex items-center justify-center text-sm"
                            >
                                {playlist}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Popular Categories and Suggestions */}
            <div className="grid grid-cols-2 gap-8">
                <div>
                    <h3 className="text-lg font-semibold mb-4">
                        Popular Categories
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                        {["90s", "Hip-hop/Rap", "African"].map((category) => (
                            <div
                                key={category}
                                className="bg-gray-200 h-24 rounded flex items-center justify-center"
                            >
                                {category}
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-4">
                        Suggestions for you
                    </h3>
                    <ul className="space-y-2">
                        {[
                            "Rema - FYN",
                            "Heat Waves - Glass Animal",
                            "Under The Influence - Chris Brown",
                        ].map((track) => (
                            <li
                                key={track}
                                className="flex items-center justify-between bg-white p-2 rounded"
                            >
                                <span>{track}</span>
                                <button className="text-blue-500">Play</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MyMusic;
