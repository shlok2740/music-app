import React, { useState, useEffect } from "react";
import Papa from "papaparse";

const parseDate = (dateStr) => {
    // Replace '.' with '/' to standardize the date format
    const standardizedDateStr = dateStr.replace(/\./g, "/");

    // Parse the date string into a Date object
    const dateObj = new Date(standardizedDateStr);

    // Extract the date and time components
    const date = dateObj.toLocaleDateString("en-US"); // MM/DD/YYYY
    const time = dateObj.toLocaleTimeString("it-IT", {
        minute: "2-digit",
        second: "2-digit",
    });

    return { date, time };
};

const CSV = () => {
    const [fileName, setFileName] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [columns, setColumns] = useState([]);
    const rowsPerPage = 10;

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setFileName(file.name);
        setIsUploading(true);
        setError(null);

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                Papa.parse(e.target.result, {
                    header: true,
                    complete: (results) => {
                        setIsUploading(false);
                        console.log("Parsing complete!");

                        const processedData = results.data.map((row) => {
                            const newRow = { ...row };
                            if (newRow.Timestamp) {
                                const { date, time } = parseDate(
                                    newRow.Timestamp
                                );
                                newRow.date = date;
                                newRow.time = time;
                                delete newRow.Timestamp; // Optionally delete the original timestamp
                            }
                            return newRow;
                        });

                        setTableData(processedData);
                        setColumns(Object.keys(processedData[0] || {}));

                        try {
                            localStorage.setItem(
                                "csvData",
                                JSON.stringify(processedData)
                            );
                            console.log("Data stored in localStorage");
                        } catch (err) {
                            console.error(
                                "Error storing data in localStorage:",
                                err
                            );
                            setError("Failed to store data in localStorage");
                        }
                    },
                    error: (err) => {
                        console.error("Error during parsing:", err);
                        setError(err.message);
                        setIsUploading(false);
                    },
                });
            };

            reader.readAsText(file);
        }
    };

    useEffect(() => {
        const storedData = localStorage.getItem("csvData");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setTableData(parsedData);
            setColumns(Object.keys(parsedData[0] || {}));
        }
    }, []);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="max-w-6xl mx-auto mt-4 sm:mt-10 p-4 sm:p-6 bg-white rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                CSV File Uploader
            </h2>
            <div className="mb-4">
                <label
                    htmlFor="csvFile"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Upload CSV File
                </label>
                <input
                    type="file"
                    id="csvFile"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                />
            </div>
            {isUploading && <p>Uploading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {fileName && <p>File uploaded: {fileName}</p>}
            {tableData.length > 0 && (
                <Table
                    data={tableData}
                    columns={columns}
                    currentPage={currentPage}
                    rowsPerPage={rowsPerPage}
                    paginate={paginate}
                />
            )}
        </div>
    );
};

const Table = ({ data, columns, currentPage, rowsPerPage, paginate }) => {
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(data.length / rowsPerPage);

    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    if (endPage - startPage < 4) {
        startPage = Math.max(1, endPage - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="mt-8 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {column}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {currentRows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((column, colIndex) => (
                                <td
                                    key={colIndex}
                                    className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500"
                                >
                                    {row[column] || ""}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4 flex justify-center">
                <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                >
                    {pageNumbers.map((number) => (
                        <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                currentPage === number
                                    ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                            }`}
                        >
                            {number}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default CSV;
