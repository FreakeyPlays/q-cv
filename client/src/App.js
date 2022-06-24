import React from "react";
import Menu from "./components/menu/Menu";
import { projectDataService } from "./services/project.service";
import { cvDataService } from "./services/cv.service";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from "./pages/dashboard/Dashboard";
import UserData from "./pages/userdata/UserData";
import Education from "./pages/education/Education";
import Career from "./pages/career/Career";
import ITSkills from "./pages/itskills/ITSkills";
import Projects from "./pages/projects/Projects";
import AdminUserData from "./pages/userdata/AdminUserData";
import UserService from "./services/keycloakUser.service";


import "./App.css"
import ManageProject from "./pages/projects/ManageProject";

const App = () => {
    return (
        <Router>
            <Menu>
                <Routes>
                    <Route path="/" index element={<Dashboard />} />
                    <Route path="/user-data" element={<UserData />} />
                    <Route path="/education" element={<Education />} />
                    <Route path="/career" element={<Career />} />
                    <Route path="/it-skills" element={<ITSkills />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="projects/create" element={<ManageProject function={projectDataService.create} title="Create" />} />
                    <Route path="projects/copy/:id" element={<ManageProject function={projectDataService.copy} title="Copy" />} />
                    <Route path="projects/edit/:id" element={<ManageProject function={projectDataService.update} title="Edit" />} />
                    <Route path="/create-cv" element={<CreateCV function={cvDataService.create} />} />
                    <Route path="/create-cv/:id" element={<CreateCV function={cvDataService.update} title="Edit"/>} />
                    { UserService.getIsAdmin() ? <Route path="/user" element={<AdminUserData />} /> : <></>}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Menu>
        </Router>
    );
}

export default App;