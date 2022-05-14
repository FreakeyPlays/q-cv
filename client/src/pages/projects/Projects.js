import { useEffect, useState } from "react";
import { projectDataService } from "../../services/project.service";
import ProjectPost from "../../components/project/ProjectPost.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import CreateButton from "../../components/createButton/CreateButton";
import Searchbar from "../../components/searchbar/Searchbar.js";

import "./Projects.css"

const currentUserID = "627d6e4624b23d01f548f867";

function dummyCreate(){
    console.log("Test")
}

const Projects = () => {

    const [projects, setProjects] = useState([]);
    const [showAll, setShowAll] = useState(false)

    useEffect(() => {
        if(showAll){
            projectDataService.getAll()
            .then(response => setProjects(response.data.projects) )
            .catch(e => console.error(e.message));
        }else{
            projectDataService.getAll()
            .then(({data}) => {
                setProjects(data.projects.filter( ({assignedUsers}) => {
                    for(let uid of assignedUsers){
                        if(uid === currentUserID){
                            return true;
                        }
                    }
                    return false;
                }))
            })
            .catch(e => console.error(e.message));
        }
    }, [showAll]);

    return(
        <>
            <div className="projectBar">
                <div className="searchBarContainer">
                    <Searchbar />
                </div>
                <div className="buttonContainer">
                    <div className="buttonWrapper">
                        {showAll ? (
                                <FontAwesomeIcon icon={faUser} size="2x" onClick={() => setShowAll(false)} />
                            ) : (
                                <FontAwesomeIcon icon={faUsers} size="2x" onClick={() => setShowAll(true)} />
                        )}
                        <CreateButton function={() => dummyCreate()} />
                    </div>
                </div>
            </div>
            <div className="projectsContainer">
                {projects.splice(0).reverse().map((item, index) => {
                        return(
                            <ProjectPost item={item} key={index} />
                        )
                    })}
            </div>
        </>
    )
}

export default Projects;