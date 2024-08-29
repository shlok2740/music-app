import React, { useState, useEffect } from "react";
import Papa from "papaparse";

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

                        // Set table data and columns
                        setTableData(results.data);
                        setColumns(results.meta.fields);

                        // Store the parsed data in localStorage
                        try {
                            localStorage.setItem(
                                "csvData",
                                JSON.stringify(results.data)
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
        // Load data from localStorage when the component mounts
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
                    htmlFor="csv-file-input"
                    className="block w-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300 ease-in-out"
                >
                    {fileName ? "Change File" : "Choose CSV File"}
                </label>
                <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    id="csv-file-input"
                    className="hidden"
                />
            </div>
            {fileName && (
                <p className="mt-2 text-sm text-gray-600">
                    Selected file:{" "}
                    <span className="font-semibold">{fileName}</span>
                </p>
            )}
            {isUploading && (
                <div className="mt-4 flex items-center justify-center">
                    <svg
                        className="animate-spin h-5 w-5 mr-3 text-blue-600"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                    <span className="text-blue-600">
                        Uploading and parsing...
                    </span>
                </div>
            )}
            {error && (
                <p className="mt-4 text-sm text-red-600">Error: {error}</p>
            )}
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
                                    {row[column]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-4 flex flex-wrap justify-center items-center">
                <button
                    onClick={() => paginate(Math.max(1, startPage - 5))}
                    disabled={currentPage <= 5}
                    className="m-1 px-2 sm:px-3 py-1 text-xs sm:text-sm rounded bg-gray-200 disabled:opacity-50"
                >
                    &lt;&lt;
                </button>
                <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="m-1 px-2 sm:px-3 py-1 text-xs sm:text-sm rounded bg-gray-200 disabled:opacity-50"
                >
                    &lt;
                </button>
                {pageNumbers.map((number) => (
                    <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`m-1 px-2 sm:px-3 py-1 text-xs sm:text-sm rounded ${
                            currentPage === number
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200"
                        }`}
                    >
                        {number}
                    </button>
                ))}
                <button
                    onClick={() =>
                        paginate(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="m-1 px-2 sm:px-3 py-1 text-xs sm:text-sm rounded bg-gray-200 disabled:opacity-50"
                >
                    &gt;
                </button>
                <button
                    onClick={() => paginate(Math.min(totalPages, endPage + 1))}
                    disabled={endPage === totalPages}
                    className="m-1 px-2 sm:px-3 py-1 text-xs sm:text-sm rounded bg-gray-200 disabled:opacity-50"
                >
                    &gt;&gt;
                </button>
            </div>
        </div>
    );
};

export default CSV;
