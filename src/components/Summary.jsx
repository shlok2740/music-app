import React, { useState, useEffect, useMemo } from "react";
import PieChart from "./chart/PieChart";

const Card = ({ title, value }) => (
    <div className="bg-white shadow rounded-lg p-4 m-2 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{value}</p>
    </div>
);

const Summary = () => {
    const [rawData, setRawData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            const data = JSON.parse(localStorage.getItem("csvData") || "[]");
            setRawData(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Error parsing data:", err);
            setError("Error loading data. Please try again.");
            setRawData([]);
        }
    }, []);

    const getMostLeastCommon = (key, isLeast = false) => {
        if (!rawData.length) return "No data";

        const counts = rawData.reduce((acc, item) => {
            if (item && item[key]) {
                acc[item[key]] = (acc[item[key]] || 0) + 1;
            }
            return acc;
        }, {});

        const sorted = Object.entries(counts).sort((a, b) => {
            if (b[1] !== a[1]) return isLeast ? a[1] - b[1] : b[1] - a[1];
            return a[0].localeCompare(b[0]);
        });

        return sorted.length > 0 ? sorted[0][0] : "No data";
    };

    const statistics = useMemo(
        () => ({
            MostPlayedSong: getMostLeastCommon("Track"),
            LeastPlayedSong: getMostLeastCommon("Track", true),
            MostListenedArtist: getMostLeastCommon("Artist"),
            LeastListenedArtist: getMostLeastCommon("Artist", true),
            MostPlayedAlbum: getMostLeastCommon("Album"),
            LeastPlayedAlbum: getMostLeastCommon("Album", true),
        }),
        [rawData]
    );

    const pieChartData = useMemo(() => {
        const timeRanges = {
            "0-10": 0,
            "11-20": 0,
            "21-30": 0,
            "31-40": 0,
            "41-50": 0,
            "51-60": 0,
            "60+": 0,
        };

        rawData.forEach((item) => {
            const timeInMinutes = parseInt(item.time.split(":")[0]);
            const range = Object.keys(timeRanges).find((key) => {
                const [min, max] = key.split("-").map(Number);
                return (
                    timeInMinutes > min && (max ? timeInMinutes <= max : true)
                );
            });
            if (range) timeRanges[range]++;
        });

        return {
            labels: Object.keys(timeRanges),
            datasets: [
                {
                    data: Object.values(timeRanges),
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#4BC0C0",
                        "#9966FF",
                        "#FF9F40",
                        "#FF6384",
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#4BC0C0",
                        "#9966FF",
                        "#FF9F40",
                        "#FF6384",
                    ],
                },
            ],
        };
    }, [rawData]);

    const pieOptions = {
        plugins: {
            legend: { position: "right" },
            title: {
                display: true,
                text: "Listening Time Breakdown in minutes",
            },
        },
        animation: {
            animateRotate: true,
            animateScale: true,
            duration: 200,
            easing: "easeIn",
        },
    };

    const TimeBreakdownTable = ({ data }) => (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Time Range (min)</th>
                        <th className="py-2 px-4 border-b">Count</th>
                    </tr>
                </thead>
                <tbody>
                    {data.labels.map((label, index) => (
                        <tr key={label}>
                            <td className="py-2 px-4 border-b">{label}</td>
                            <td className="py-2 px-4 border-b">
                                {data.datasets[0].data[index]}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    if (error) return <p className="text-red-500">{error}</p>;
    if (!rawData.length) return <p>No data available</p>;

    return (
        <div className="m-2">
            <h2 className="text-2xl font-bold mb-4 text-center text-indigo-600">
                Listening Statistics Overview
            </h2>

            <div className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {Object.entries(statistics)
                        .slice(0, 3)
                        .map(([key, value]) => (
                            <Card
                                key={key}
                                title={key.replace(/([A-Z])/g, " $1").trim()}
                                value={value}
                            />
                        ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(statistics)
                        .slice(3)
                        .map(([key, value]) => (
                            <Card
                                key={key}
                                title={key.replace(/([A-Z])/g, " $1").trim()}
                                value={value}
                            />
                        ))}
                </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-indigo-600 text-center">
                Listening Time Breakdown
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 mx-2">
                <div className="flex flex-col justify-center rounded-lg h-full">
                    <TimeBreakdownTable data={pieChartData} />
                </div>
                <div className="flex items-center justify-center rounded-lg h-full">
                    <PieChart data={pieChartData} options={pieOptions} />
                </div>
            </div>
        </div>
    );
};

export default Summary;
