import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/Home";
import MyMusic from "./components/MyMusic";
import Sidebar from "./components/Sidebar";
import Stats from "./components/Stats";
import Summary from "./components/Summary";
import CSV from "./csv/CSV";

const routes = [
    { path: "/", element: <Home /> },
    { path: "/my-music", element: <MyMusic /> },
    { path: "/summary", element: <Summary /> },
    { path: "/stats", element: <Stats /> },
    { path: "/add-csv", element: <CSV /> },
];

function App() {
    return (
        <Router>
            <div className="flex h-screen bg-gray-100 font-one">
                <aside className="sticky top-0 h-screen">
                    <Sidebar />
                </aside>
                <main className="flex-1 overflow-y-auto">
                    <Routes>
                        {routes.map(({ path, element }) => (
                            <Route key={path} path={path} element={element} />
                        ))}
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
