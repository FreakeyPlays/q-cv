import React from "react";
import Menu from "./components/menu/Menu";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ITSkills from "./pages/itskills/ITSkills";

import "./App.css";

const App = () => {
    return(
        <Router>
            <Menu>
                <Routes>
                    <Route path="/it-skills" element={<ITSkills />} />
                </Routes>
            </Menu>
        </Router>
    )
}

export default App;