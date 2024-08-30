import React, { useState, useEffect } from "react";
import CTA from "./CTA";
import BarChart from "./chart/BarChart";

const MyMusic = () => {
    const [popularSongs, setPopularSongs] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [topSongs, setTopSongs] = useState([]);
    const [topAlbums, setTopAlbums] = useState([]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("csvData") || "[]");
        const songCounts = {};
        const albumCounts = {};
        const recentSongs = {};

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        storedData.forEach((item) => {
            if (item["Track"]) {
                songCounts[item["Track"]] =
                    (songCounts[item["Track"]] || 0) + 1;
            }
            if (item["Album"]) {
                albumCounts[item["Album"]] =
                    (albumCounts[item["Album"]] || 0) + 1;
            }

            const playDate = new Date(item.date);
            if (playDate >= thirtyDaysAgo && item["Track"]) {
                recentSongs[item["Track"]] =
                    (recentSongs[item["Track"]] || 0) + 1;
            }
        });

        const sortedSongs = Object.entries(songCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);

        const sortedAlbums = Object.entries(albumCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);

        const sortedRecentSongs = Object.entries(recentSongs)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([track, count]) => {
                const songData = storedData.find(
                    (item) => item["Track"] === track
                );
                return {
                    track,
                    count,
                    artist: songData["Artist"],
                    album: songData["Album"],
                };
            });

        setTopSongs(sortedSongs);
        setTopAlbums(sortedAlbums);
        setPopularSongs(sortedRecentSongs);

        // Generate 3 random suggestions
        const allSongs = storedData.filter(
            (item, index, self) =>
                index === self.findIndex((t) => t["Track"] === item["Track"])
        );
        const randomSuggestions = [];
        for (let i = 0; i < 3; i++) {
            const randomIndex = Math.floor(Math.random() * allSongs.length);
            randomSuggestions.push(allSongs[randomIndex]);
        }
        setSuggestions(randomSuggestions);
    }, []);

    const songChartData = {
        labels: topSongs.map(([song]) => song),
        datasets: [
            {
                label: "Plays",
                data: topSongs.map(([, count]) => count),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
        ],
    };

    const albumChartData = {
        labels: topAlbums.map(([album]) => album),
        datasets: [
            {
                label: "Plays",
                data: topAlbums.map(([, count]) => count),
                backgroundColor: "rgba(153, 102, 255, 0.6)",
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className="flex-1 p-8 bg-gray-50">
            <div className="bg-blue-500 text-white p-6 rounded-lg mb-8 flex justify-between items-center">
                <CTA />
            </div>
            <h3 className="text-lg font-semibold mb-4">Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4">
                        Top 10 Played Songs
                    </h3>
                    <div className="h-64">
                        <BarChart data={songChartData} options={chartOptions} />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4">
                        Top 10 Played Albums
                    </h3>
                    <div className="h-64">
                        <BarChart
                            data={albumChartData}
                            options={chartOptions}
                        />
                    </div>
                </div>
            </div>
            <h3 className="text-lg font-semibold mb-4">
                Popular Songs (Last 30 Days)
            </h3>
            <div className="mb-8">
                <div
                    id="controls-carousel"
                    className="relative w-full"
                    data-carousel="static"
                >
                    <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                        {popularSongs.map((song, index) => (
                            <div
                                key={index}
                                className={`hidden duration-700 ease-in-out ${
                                    index === 0
                                        ? 'data-carousel-item="active"'
                                        : "data-carousel-item"
                                }`}
                            >
                                <div className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-white p-6 rounded-lg shadow-lg">
                                    <h4 className="text-xl font-bold mb-2">
                                        {song.track}
                                    </h4>
                                    <p className="text-md text-gray-700 mb-1">
                                        <span className="font-semibold">
                                            Artist:
                                        </span>{" "}
                                        {song.artist}
                                    </p>
                                    <p className="text-md text-gray-700 mb-3">
                                        <span className="font-semibold">
                                            Album:
                                        </span>{" "}
                                        {song.album}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Plays: {song.count}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        type="button"
                        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                        data-carousel-prev
                    >
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                            <svg
                                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 1 1 5l4 4"
                                />
                            </svg>
                            <span className="sr-only">Previous</span>
                        </span>
                    </button>
                    <button
                        type="button"
                        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                        data-carousel-next
                    >
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                            <svg
                                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 9 4-4-4-4"
                                />
                            </svg>
                            <span className="sr-only">Next</span>
                        </span>
                    </button>
                </div>
            </div>

            <h3 className="text-lg font-semibold mb-4">Suggestions for You</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {suggestions.map((song, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold">{song["Track"]}</h4>
                        <p className="text-sm text-gray-600">
                            {song["Artist"]}
                        </p>
                        <p className="text-sm text-gray-500">{song["Album"]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyMusic;
