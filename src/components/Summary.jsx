import React, { useState, useEffect } from "react";
import PieChart from "./chart/PieChart";

const Summary = () => {
    const [rawData, setRawData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            const data = JSON.parse(localStorage.getItem("csvData") || "[]");
            setRawData(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Error parsing data:", err);
            setRawData([]);
        }
    }, []);

    const getMostLeastCommon = (key, isLeast = false) => {
        if (!rawData || rawData.length === 0) {
            console.log(`No data available for key: ${key}`);
            return "No data";
        }

        const counts = rawData.reduce((acc, item) => {
            if (item && item[key]) {
                acc[item[key]] = (acc[item[key]] || 0) + 1;
            }
            return acc;
        }, {});

        const sorted = Object.entries(counts).sort((a, b) => {
            if (b[1] !== a[1]) {
                return isLeast ? a[1] - b[1] : b[1] - a[1];
            }
            return a[0].localeCompare(b[0]);
        });

        console.log(`Sorted data for key ${key}:`, sorted);
        return sorted.length > 0 ? sorted[0][0] : "No data";
    };

   

    const mostPlayedSong = getMostLeastCommon("Track");
    const leastPlayedSong = getMostLeastCommon("Track", true);
    const mostListenedArtist = getMostLeastCommon("Artist");
    const leastListenedArtist = getMostLeastCommon("Artist", true);
    const mostPlayedAlbum = getMostLeastCommon("Album");
    const leastPlayedAlbum = getMostLeastCommon("Album", true);

    const Card = ({ title, value }) => (
        <div className="bg-white shadow rounded-lg p-4 m-2">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{value}</p>
        </div>
    );

    const getPieChartData = () => {
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
            const timeParts = item.time.split(":");
            const timeInMinutes =
                parseInt(timeParts[0])

            if (timeInMinutes <= 10) timeRanges["0-10"]++;
            else if (timeInMinutes <= 20) timeRanges["11-20"]++;
            else if (timeInMinutes <= 30) timeRanges["21-30"]++;
            else if (timeInMinutes <= 40) timeRanges["31-40"]++;
            else if (timeInMinutes <= 50) timeRanges["41-50"]++;
            else if (timeInMinutes <= 60) timeRanges["51-60"]++;
            else timeRanges["60+"]++;
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
    };

    const pieOptions = {
        plugins: {
            legend: {
                position: "bottom",
            },
            title: {
                display: true,
                text: "Song Duration Distribution (minutes)",
            },
        },
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Summary of the list</h2>
            {error && <p className="text-red-500">{error}</p>}
            {rawData.length > 0 ? (
                <>
                    <div className="mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <Card
                                title="Most Played Song"
                                value={mostPlayedSong}
                            />
                            <Card
                                title="Most Listened Artist"
                                value={mostListenedArtist}
                            />
                            <Card
                                title="Most Played Album"
                                value={mostPlayedAlbum}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card
                                title="Least Played Song"
                                value={leastPlayedSong}
                            />
                            <Card
                                title="Least Listened Artist"
                                value={leastListenedArtist}
                            />
                            <Card
                                title="Least Played Album"
                                value={leastPlayedAlbum}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 mb-8">
                       
                        <div>
                            <PieChart
                                data={getPieChartData()}
                                options={pieOptions}
                            />
                        </div>
                    </div>
                </>
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
};

export default Summary;
