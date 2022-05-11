import React from "react";
import Menu from "./components/menu/Menu";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./pages/dashboard/Dashboard";
import UserData from "./pages/userdata/UserData";
import Education from "./pages/education/Education";
import Career from "./pages/career/Career";
import ITSkills from "./pages/itskills/ITSkills";
import Projects from "./pages/projects/Projects";
import CreateCV from "./pages/createcv/CreateCV";

import "./App.css"

const App = () => {
    return (
        <Router>
            <Menu>
                <Routes>
                    <Route path="/" exact element={<Dashboard />} />
                    <Route path="/user-data" element={<UserData />} />
                    <Route path="/education" element={<Education />} />
                    <Route path="/career" element={<Career />} />
                    <Route path="/it-skills" element={<ITSkills />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/create-cv" element={<CreateCV />} />
                </Routes>
            </Menu>
        </Router>
    );
}

export default App;