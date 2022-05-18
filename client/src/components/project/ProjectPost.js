import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClone, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { projectDataService } from "../../services/project.service";
import ProjectPostItems from "./projectPost.items";

import "./ProjectPost.css";
import React from "react";

const isAdmin = false;
const currentUserID = "627d6e4624b23d01f548f867";

function dummyCheckOwner(uid){
    if(uid === currentUserID){
        return true;
    }
    return false;
}

function deleteProject(id, title){
    let wasOkPressed = window.confirm("Do you really want to delete\n"+title);

    if(!wasOkPressed){
        return;
    }

    let promise = projectDataService.delete(id);

    promise
        .then(() => window.location.href = "/projects")
        .catch(e => {
            alert("Error: Something went Wrong!");
            console.warn(e.message);
        })
}

const ProjectPost = ({ item }) => {
    return(
        <div className="projectPost">
            <div className="titleSection">
                <h2 className="projectTitle">{item.title}</h2>
                <div className="projectControls">
                <Link to={"/projects/copy/" + item._id}>
                    <FontAwesomeIcon icon={faClone} />
                </Link>
                {(isAdmin || dummyCheckOwner(item.assignedUser)) ? (
                    <>
                        <Link to={"/projects/edit/" + item._id}>
                            <FontAwesomeIcon icon={faPen} />
                        </Link>
                        <Link to={"/projects"}>
                            <FontAwesomeIcon icon={faTrash} onClick={() => deleteProject(item._id, item.title)} />
                        </Link>
                    </>
                ) : (
                    <>
                    </>
                ) }
                </div>
            </div>
            <div className="dataContainer">
                
                {ProjectPostItems.map(element => {
                    return (
                        element.optional || element.isStored(item) ? (
                            <div key={element.id} className={element.classNames}>
                                <h3>{element.title}</h3>
                                <p>{element.parse(item)}</p>
                            </div>
                        ) : (
                            <React.Fragment key={element.id} />
                        )
                    )
                })}

            </div>
        </div>
    )
}

export default ProjectPost;