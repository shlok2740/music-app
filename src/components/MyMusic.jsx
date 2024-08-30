import React, { useState, useEffect, useMemo } from "react";
import CTA from "./CTA";
import BarChart from "./chart/BarChart";

const MyMusic = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [topSongs, setTopSongs] = useState([]);
    const [topAlbums, setTopAlbums] = useState([]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("csvData") || "[]");
        const { songCounts, albumCounts, recentSongs } =
            processStoredData(storedData);

        setTopSongs(getTopItems(songCounts, 10));
        setTopAlbums(getTopItems(albumCounts, 10));
        setSuggestions(generateSuggestions(storedData, 3));
    }, []);

    const processStoredData = (data) => {
        const songCounts = {};
        const albumCounts = {};
        const recentSongs = {};
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

        data.forEach((item) => {
            if (item.Track) {
                songCounts[item.Track] = (songCounts[item.Track] || 0) + 1;
            }
            if (item.Album) {
                albumCounts[item.Album] = (albumCounts[item.Album] || 0) + 1;
            }
            const playDate = new Date(item.date);
            if (playDate >= thirtyDaysAgo && item.Track) {
                recentSongs[item.Track] = (recentSongs[item.Track] || 0) + 1;
            }
        });

        return { songCounts, albumCounts, recentSongs };
    };

    const getTopItems = (counts, limit) => {
        return Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, limit);
    };

    const generateSuggestions = (data, count) => {
        const uniqueSongs = [
            ...new Set(data.map((item) => JSON.stringify(item))),
        ].map(JSON.parse);
        return Array.from(
            { length: count },
            () => uniqueSongs[Math.floor(Math.random() * uniqueSongs.length)]
        );
    };

    const chartOptions = useMemo(
        () => ({
            responsive: true,
            maintainAspectRatio: false,
        }),
        []
    );

    const songChartData = useMemo(
        () => ({
            labels: topSongs.map(([song]) => song),
            datasets: [
                {
                    label: "Plays",
                    data: topSongs.map(([, count]) => count),
                    backgroundColor: "rgba(75, 192, 192, 0.6)",
                },
            ],
        }),
        [topSongs]
    );

    const albumChartData = useMemo(
        () => ({
            labels: topAlbums.map(([album]) => album),
            datasets: [
                {
                    label: "Plays",
                    data: topAlbums.map(([, count]) => count),
                    backgroundColor: "rgba(153, 102, 255, 0.6)",
                },
            ],
        }),
        [topAlbums]
    );

    return (
        <div className="flex-1 p-8">
            <div className="bg-blue-500 text-white p-6 rounded-lg mb-8 flex justify-between items-center">
                <CTA />
            </div>
            <h3 className="text-lg font-semibold mb-4">Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <ChartSection
                    title="Top 10 Played Songs"
                    data={songChartData}
                    options={chartOptions}
                />
                <ChartSection
                    title="Top 10 Played Albums"
                    data={albumChartData}
                    options={chartOptions}
                />
            </div>
            <h3 className="text-lg font-semibold mb-4">Suggestions for You</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {suggestions.map((song, index) => (
                    <SongCard key={index} song={song} />
                ))}
            </div>
        </div>
    );
};

const ChartSection = ({ title, data, options }) => (
    <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="h-64">
            <BarChart data={data} options={options} />
        </div>
    </div>
);

const SongCard = ({ song }) => (
    <div className="bg-white p-4 rounded-lg shadow">
        <h4 className="font-semibold">{song.Track}</h4>
        <p className="text-sm text-gray-600">{song.Artist}</p>
        <p className="text-sm text-gray-500">{song.Album}</p>
    </div>
);

export default MyMusic;
