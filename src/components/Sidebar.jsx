import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiMusic, FiFileText, FiUpload } from "react-icons/fi";

const navItems = [
    { name: "Home", icon: FiHome, path: "/" },
    { name: "My Music", icon: FiMusic, path: "/my-music" },
    { name: "Summary", icon: FiFileText, path: "/summary" },
    { name: "Add CSV", icon: FiUpload, path: "/add-csv" },
];

const NavItem = ({ name, icon: Icon, path, isActive }) => (
    <Link to={path}>
        <li
            className={`flex items-center space-x-2 p-2 rounded-lg transition-colors duration-200 ${
                isActive
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:bg-blue-100"
            }`}
        >
            <Icon className="w-5 h-5" />
            <span>{name}</span>
        </li>
    </Link>
);

const ToggleSwitch = ({ isOn, onToggle }) => (
    <label className="flex items-center cursor-pointer group">
        <span className="mr-3 text-sm font-medium transition-colors duration-200 ease-in-out group-hover:text-blue-500">
            {isOn ? "Dark" : "Light"}
        </span>
        <div className="relative">
            <input
                type="checkbox"
                className="sr-only"
                checked={isOn}
                onChange={onToggle}
            />
            <div
                className={`block w-14 h-8 rounded-full transition-colors duration-300 ease-in-out ${
                    isOn ? "bg-blue-600" : "bg-gray-300"
                }`}
            ></div>
            <div
                className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ease-in-out ${
                    isOn
                        ? "transform translate-x-full"
                        : "transform translate-x-0"
                } shadow-md`}
            ></div>
        </div>
    </label>
);


const Sidebar = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const location = useLocation();

    return (
        <div
            className={`w-64 p-6 shadow-lg transition-colors duration-300 ${
                isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
            }`}
        >
            <h1 className="text-3xl font-bold mb-8 text-blue-500">SOUNDBOX</h1>
            <nav>
                <ul className="space-y-2">
                    {navItems.map((item) => (
                        <NavItem
                            key={item.name}
                            {...item}
                            isActive={location.pathname === item.path}
                        />
                    ))}
                </ul>
            </nav>
            <div className="mt-auto pt-6">
                <ToggleSwitch
                    isOn={isDarkMode}
                    onToggle={() => setIsDarkMode(!isDarkMode)}
                />
            </div>
        </div>
    );
};

export default Sidebar;