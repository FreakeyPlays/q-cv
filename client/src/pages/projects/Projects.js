import { useEffect, useState } from "react";
import { projectDataService } from "../../services/project.service";
import ProjectPost from "../../components/project/ProjectPost.js";
import UserService from "../../services/keycloakUser.service.js"
import Titlebar from "../../components/titlebar/Titlebar";
import DeletePopup from "../../components/popup/deletePopup/DeletePopup.js";

import "./Projects.css"

const Projects = () => {

    const [currentUserID, setCurrentUserID] = useState("");
    UserService.getLoggedInUID().then(data => setCurrentUserID(data));

    const [projects, setProjects] = useState([]);
    const [showAll, setShowAll] = useState(false)
    const [searchFilter, setSearchFilter] = useState("");


    const [deleteItemPopup, setDeleteItemPopup] = useState(false);
    const [selectedID, setSelectedID] = useState("");
    const deleteProjectItem = (e) => {
        e.preventDefault();
        projectDataService.delete(selectedID)
            .then(() => {
                setDeleteItemPopup(false);
                setSelectedID("");
            })
            .catch(e => console.warn(e.message));
    }

    useEffect(() => {
        if(showAll){
            projectDataService.getAll()
            .then(({data}) => {
                setProjects(data.response.filter( ({description, title}) => {
                    return description.includes(searchFilter) || title.includes(searchFilter);
                }))
            })
            .catch(e => console.error(e.message));
        }else{
            projectDataService.getAll()
            .then(({data}) => {
                setProjects(data.response.filter( ({assignedUser, description, title}) => {
                    if(assignedUser === currentUserID){
                        return description.includes(searchFilter) || title.includes(searchFilter);
                    }
                    return false;
                }))
            })
            .catch(e => console.error(e.message));
        }
    }, [showAll, searchFilter, currentUserID, deleteItemPopup]);

    return(
        <>
            <Titlebar 
                setStateFunction={(newVal) => setShowAll(newVal)}
                setSearchFunction={(newVal) => setSearchFilter(newVal)}
                searchbar={true} 
                showAll={true}
                path="/projects/create" 
            />
            
            <div className="projectsContainer">
                {projects.splice(0).reverse().map((item, index) => {
                        return(
                            <ProjectPost item={item} key={index} setIDFunc={setSelectedID} deleteFunc={setDeleteItemPopup} />
                        )
                    })}
            </div>

            <DeletePopup 
                triggerVar={deleteItemPopup} 
                setTriggerFunc={setDeleteItemPopup}
                deleteFunc={deleteProjectItem}
            />
        </>
    )
}

export default Projects;