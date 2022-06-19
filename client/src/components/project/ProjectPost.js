import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClone, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ProjectPostItems from "./projectPost.items";
import UserService from "../../services/keycloakUser.service.js"

import "./ProjectPost.css";

const ProjectPost = ({ item, setIDFunc, deleteFunc }) => {
    const [currentUserID, setCurrentUserId] = useState("");
    UserService.getLoggedInUID().then(data => setCurrentUserId(data));

    const isAdmin = useState(false);
    isAdmin.current = UserService.getIsAdmin();

    const isOwner = useState(false);
    isOwner.current = currentUserID === item.assignedUser ? true : false;

    return(
        <div className="projectPost">
            <div className="titleSection">
                <h2 className="projectTitle">{item.title}</h2>
                <div className="projectControls">
                <Link to={"/projects/copy/" + item._id}>
                    <FontAwesomeIcon icon={faClone} />
                </Link>
                {(isAdmin.current || isOwner.current ) ? (
                    <>
                        <Link to={"/projects/edit/" + item._id}>
                            <FontAwesomeIcon icon={faPen} />
                        </Link>
                        <Link to={"/projects"}>
                            <FontAwesomeIcon icon={faTrash} onClick={() => {
                                setIDFunc(item._id);
                                deleteFunc(true);
                            }} />
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