import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiMusic, FiFileText, FiUpload, FiMenu } from "react-icons/fi";

const navItems = [
    { name: "Home", icon: FiHome, path: "/" },
    { name: "My Music", icon: FiMusic, path: "/my-music" },
    { name: "Summary", icon: FiFileText, path: "/summary" },
    { name: "Stats", icon: FiFileText, path: "/stats" },
    { name: "Add CSV", icon: FiUpload, path: "/add-csv" },
];

const NavItem = ({ name, icon: Icon, path, isActive, onClick }) => (
    <Link to={path} onClick={onClick}>
        <li
            className={`flex items-center space-x-2 p-2 rounded-lg transition-colors duration-200 ${
                isActive
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:bg-blue-100"
            }`}
        >
            <Icon className="w-5 h-5" />
            <span className="md:hidden lg:inline">{name}</span>
        </li>
    </Link>
);

const Sidebar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            <button
                className="md:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-blue-500 text-white"
                onClick={toggleSidebar}
            >
                <FiMenu className="w-6 h-6" />
            </button>
            <div
                className={`fixed inset-y-0 left-0 transform ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } md:relative md:translate-x-0 transition duration-200 ease-in-out md:flex md:flex-col w-64 h-screen p-6 shadow-lg bg-white text-gray-800 z-10`}
            >
                <h1 className="text-3xl font-bold mb-8 text-blue-500">
                    SOUNDBOX
                </h1>
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
            </div>
        </>
    );
};

export default Sidebar;
