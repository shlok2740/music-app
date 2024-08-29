import React, { useState } from "react";
import Papa from "papaparse";

const CSV = () => {
    const [fileName, setFileName] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState(null);

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

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                CSV File Uploader
            </h2>
            <div className="mb-4">
                <label
                    htmlFor="csv-file-input"
                    className="block w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300 ease-in-out"
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
        </div>
    );
};

export default CSV;
