import React, {
    useEffect,
    useState,
    useRef,
    useMemo,
    useCallback,
} from "react";
import * as d3 from "d3";
import { debounce } from "lodash";

const StatCard = React.memo(({ title, value }) => (
    <div className="bg-white p-4 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-2xl">{value}</p>
    </div>
));

const Stats = () => {
    const [stats, setStats] = useState({
        uniqueSongs: 0,
        uniqueAlbums: 0,
        uniqueArtists: 0,
    });
    const [csvData, setCsvData] = useState([]);
    const [selectedSong, setSelectedSong] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const svgRef = useRef();
    const containerRef = useRef();

    const memoizedStats = useMemo(() => {
        const data = JSON.parse(localStorage.getItem("csvData") || "[]");
        const uniqueSongs = new Set(data.map((row) => row.Track)).size;
        const uniqueAlbums = new Set(data.map((row) => row.Album)).size;
        const uniqueArtists = new Set(data.map((row) => row.Artist)).size;

        return {
            uniqueSongs,
            uniqueAlbums,
            uniqueArtists,
            csvData: data,
        };
    }, []);

    useEffect(() => {
        setStats({
            uniqueSongs: memoizedStats.uniqueSongs,
            uniqueAlbums: memoizedStats.uniqueAlbums,
            uniqueArtists: memoizedStats.uniqueArtists,
        });
        setCsvData(memoizedStats.csvData);
    }, [memoizedStats]);

    const createDendrogram = useCallback(() => {
        const container = containerRef.current;
        const width = container.clientWidth;
        const height = Math.min(width, window.innerHeight - 30);
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
                song.Artist === selectedSongData.Artist &&
                song.Track !== selectedSong
        );

        const uniqueSongs = new Set();
        const root = d3.hierarchy({
            name: selectedSong,
            children: relatedSongs
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
            .attr("d", (d) => {
                const startAngle = ((d.x - 90) / 180) * Math.PI;
                const startRadius = d.y;
                const endAngle = ((d.parent.x - 90) / 180) * Math.PI;
                const endRadius = d.parent.y;
                const midRadius = (startRadius + endRadius) / 2;
                return `
          M${startRadius * Math.cos(startAngle)},${
                    startRadius * Math.sin(startAngle)
                }
          C${midRadius * Math.cos(startAngle)},${
                    midRadius * Math.sin(startAngle)
                }
          ${midRadius * Math.cos(endAngle)},${midRadius * Math.sin(endAngle)}
          ${endRadius * Math.cos(endAngle)},${endRadius * Math.sin(endAngle)}
        `;
            })
            .style("fill", "none")
            .style("stroke", "#111fff");

        const node = svg
            .selectAll(".node")
            .data(root.descendants())
            .enter()
            .append("g")
            .attr(
                "class",
                (d) => `node${d.children ? " node--internal" : " node--leaf"}`
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
    }, [selectedSong, csvData]);

    useEffect(() => {
        setIsLoading(true);
        if (selectedSong && csvData.length > 0) {
            createDendrogram();
        }
        setIsLoading(false);
    }, [selectedSong, csvData, createDendrogram]);

    const debouncedSetSelectedSong = useMemo(
        () => debounce((value) => setSelectedSong(value), 300),
        []
    );

    return (
        <div className="mt-6 mx-2" ref={containerRef}>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <h2 className="text-2xl font-bold mb-4 text-center text-indigo-600">
                        Overview
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                        <StatCard
                            title="Unique Songs"
                            value={stats.uniqueSongs}
                        />
                        <StatCard
                            title="Unique Albums"
                            value={stats.uniqueAlbums}
                        />
                        <StatCard
                            title="Unique Artists"
                            value={stats.uniqueArtists}
                        />
                    </div>
                    <h2 className="text-2xl font-bold mb-4 text-indigo-600">
                        Connection to your song
                    </h2>
                    <h4 className="text-lg font-bold mb-4">
                        Find out about the song which has the same artist as
                        your song
                    </h4>
                    <div className="m-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search for a song"
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                onChange={(e) =>
                                    debouncedSetSelectedSong(e.target.value)
                                }
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
                </>
            )}
        </div>
    );
};

export default Stats;
