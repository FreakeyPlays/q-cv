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
    }, [showAll, searchFilter]);

    console.log(searchFilter);
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