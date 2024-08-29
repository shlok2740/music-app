import React, { useState, useEffect } from "react";
import ReactSearchBox from "react-search-box";

const Searchbar = () => {
    const [searchData, setSearchData] = useState([]);

    useEffect(() => {
        const storedData = localStorage.getItem("csvData");
        if (storedData) {
            const csvData = JSON.parse(storedData);
            const formattedData = csvData.map((item, index) => ({
                key: index.toString(),
                value: Object.values(item).join(' ')
            }));
            setSearchData(formattedData);
        }
    }, []);

    const handleOnSelect = (record) => {
        console.log("Selected record:", record);
        // You can add more functionality here, like updating the UI or filtering the table
    };

    return (
        <ReactSearchBox
            placeholder="Find your music"
            data={searchData}
            onSelect={handleOnSelect}
            fuseConfigs={{
                threshold: 0.3,
            }}
        />
    );
};

export default Searchbar;
