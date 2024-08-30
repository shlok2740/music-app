import React, { useState, useEffect } from "react";
import CTA from "./CTA";
import BarChart from "./chart/BarChart";

const MyMusic = () => {
    const [topSongs, setTopSongs] = useState([]);
    const [topAlbums, setTopAlbums] = useState([]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("csvData") || "[]");
        const songCounts = {};
        const albumCounts = {};

        storedData.forEach((item) => {
            if (item["Track"]) {
                songCounts[item["Track"]] =
                    (songCounts[item["Track"]] || 0) + 1;
            }
            if (item["Album"]) {
                albumCounts[item["Album"]] =
                    (albumCounts[item["Album"]] || 0) + 1;
            }
        });

        const sortedSongs = Object.entries(songCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);

        const sortedAlbums = Object.entries(albumCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);

        setTopSongs(sortedSongs);
        setTopAlbums(sortedAlbums);
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
            <div className="grid grid-cols-2 gap-8 mb-8">
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
        </div>
    );
};

export default MyMusic;
