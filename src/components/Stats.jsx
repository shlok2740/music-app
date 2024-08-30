import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";

const Stats = () => {
    const [stats, setStats] = useState({
        uniqueSongs: 0,
        uniqueAlbums: 0,
        uniqueArtists: 0,
    });
    const [csvData, setCsvData] = useState([]);
    const [selectedSong, setSelectedSong] = useState("");
    const svgRef = useRef();
    const containerRef = useRef();

    useEffect(() => {
        const calculateStats = () => {
            const data = JSON.parse(localStorage.getItem("csvData") || "[]");
            setCsvData(data);

            const uniqueSongs = new Set(data.map((row) => row.Track)).size;
            const uniqueAlbums = new Set(data.map((row) => row.Album)).size;
            const uniqueArtists = new Set(data.map((row) => row.Artist)).size;

            setStats({
                uniqueSongs,
                uniqueAlbums,
                uniqueArtists,
            });
        };

        calculateStats();
    }, []);

    useEffect(() => {
        if (selectedSong && csvData.length > 0) {
            createDendrogram();
        }
    }, [selectedSong, csvData]);

    const createDendrogram = () => {
        const container = containerRef.current;
        const width = container.clientWidth;
        const height = Math.min(width, window.innerHeight - 30); // Adjust the 300 value as needed
        const radius = Math.min(width, height) / 2;

        d3.select(svgRef.current).selectAll("*").remove();

        const svg = d3
            .select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2},${height / 2})`);

        const selectedSongData = csvData.find(
            (song) => song.Track === selectedSong
        );
        if (!selectedSongData) return;

        const relatedSongs = csvData.filter(
            (song) =>
                song.Artist === selectedSongData.Artist ||
                song.Album === selectedSongData.Album
        );

        const uniqueSongs = new Set();
        const root = d3.hierarchy({
            name: selectedSong,
            children: relatedSongs
                .filter(
                    (song) =>
                        song.Artist === selectedSongData.Artist &&
                        song.Track !== selectedSong
                )
                .reduce((acc, song) => {
                    if (!uniqueSongs.has(song.Track)) {
                        uniqueSongs.add(song.Track);
                        acc.push({ name: song.Track });
                    }
                    return acc;
                }, [])
                .sort((a, b) => a.name.localeCompare(b.name)),
        });

        const cluster = d3.cluster().size([360, radius - 60]);
        cluster(root);

        const link = svg
            .selectAll(".link")
            .data(root.descendants().slice(1))
            .enter()
            .append("path")
            .attr("class", "link")
            .attr(
                "d",
                (d) => `
                M${d.y * Math.cos(((d.x - 90) / 180) * Math.PI)},${
                    d.y * Math.sin(((d.x - 90) / 180) * Math.PI)
                }
                C${
                    ((d.y + d.parent.y) / 2) *
                    Math.cos(((d.x - 90) / 180) * Math.PI)
                },${
                    ((d.y + d.parent.y) / 2) *
                    Math.sin(((d.x - 90) / 180) * Math.PI)
                }
                ${
                    ((d.y + d.parent.y) / 2) *
                    Math.cos(((d.parent.x - 90) / 180) * Math.PI)
                },${
                    ((d.y + d.parent.y) / 2) *
                    Math.sin(((d.parent.x - 90) / 180) * Math.PI)
                }
                ${d.parent.y * Math.cos(((d.parent.x - 90) / 180) * Math.PI)},${
                    d.parent.y * Math.sin(((d.parent.x - 90) / 180) * Math.PI)
                }
            `
            )
            .style("fill", "none")
            .style("stroke", "#ccc");

        const node = svg
            .selectAll(".node")
            .data(root.descendants())
            .enter()
            .append("g")
            .attr(
                "class",
                (d) => "node" + (d.children ? " node--internal" : " node--leaf")
            )
            .attr("transform", (d) => `rotate(${d.x - 90})translate(${d.y})`);

        node.append("circle").attr("r", 2.5);

        node.append("text")
            .attr("dy", "0.31em")
            .attr("x", (d) => (d.x < 180 === !d.children ? 6 : -6))
            .style("text-anchor", (d) =>
                d.x < 180 === !d.children ? "start" : "end"
            )
            .attr("transform", (d) => (d.x >= 180 ? "rotate(180)" : null))
            .text((d) => d.data.name);
    };

    const StatCard = ({ title, value }) => (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-2xl">{value}</p>
        </div>
    );

    return (
        <div className="mt-6 mx-2" ref={containerRef}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <StatCard title="Unique Songs" value={stats.uniqueSongs} />
                <StatCard title="Unique Albums" value={stats.uniqueAlbums} />
                <StatCard title="Unique Artists" value={stats.uniqueArtists} />
            </div>
            <div className="m-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search for a song"
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={selectedSong}
                        onChange={(e) => setSelectedSong(e.target.value)}
                        list="song-list"
                    />
                    <svg
                        className="absolute right-3 top-3 h-6 w-6 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
                <datalist id="song-list">
                    {csvData.map((song, index) => (
                        <option key={index} value={song.Track} />
                    ))}
                </datalist>
            </div>
            <svg ref={svgRef}></svg>
        </div>
    );
};

export default Stats;
