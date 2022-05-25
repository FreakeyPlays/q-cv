import { useEffect, useState } from "react";
import { projectDataService } from "../../services/project.service";
import ProjectPost from "../../components/project/ProjectPost.js";

import "./Projects.css"
import Titlebar from "../../components/titlebar/Titlebar";

const currentUserID = "627d6e4624b23d01f548f867";

const Projects = () => {

    const [projects, setProjects] = useState([]);
    const [showAll, setShowAll] = useState(false)
    const [searchFilter, setSearchFilter] = useState("");

    console.log(searchFilter);

    useEffect(() => {
        if(showAll){
            projectDataService.getAll()
            .then(response => setProjects(response.data.projects) )
            .catch(e => console.error(e.message));
        }else{
            projectDataService.getAll()
            .then(({data}) => {
                setProjects(data.projects.filter( ({assignedUser}) => {
                    if(assignedUser === currentUserID){
                        return true;
                    }
                    return false;
                }))
            })
            .catch(e => console.error(e.message));
        }
    }, [showAll]);

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
                            <ProjectPost item={item} key={index} />
                        )
                    })}
            </div>
        </>
    )
}

export default Projects;