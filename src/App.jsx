import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Sidebar from "./components/Sidebar";
import MyMusic from "./components/MyMusic";
import Summary from "./components/Summary";
import CSV from "./csv/CSV";

function App() {
    return (
        <Router>
            <div className="flex h-screen bg-gray-100 font-one">
                <aside className="sticky top-0 h-screen">
                    <Sidebar />
                </aside>
                <main className="flex-1 overflow-y-auto">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/my-music" element={<MyMusic />} />
                        <Route path="/summary" element={<Summary />} />
                        <Route path="/add-csv" element={<CSV />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
