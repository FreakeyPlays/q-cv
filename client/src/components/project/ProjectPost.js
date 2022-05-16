import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClone, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

import "./ProjectPost.css";
import { Link } from "react-router-dom";
import { projectDataService } from "../../services/project.service";

const isAdmin = false;
const currentUserID = "627d6e4624b23d01f548f867";

function dummyCheckOwner(uidArr){
    for(let uid of uidArr){
        if(uid === currentUserID){
            return true;
        }
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
                {(isAdmin || dummyCheckOwner(item.assignedUsers)) ? (
                    <>
                        <Link to={"/projects/edit/" + item._id}>
                            <FontAwesomeIcon icon={faPen} />
                        </Link>
                        <a href="/projects">
                            <FontAwesomeIcon icon={faTrash} onClick={() => deleteProject(item._id, item.title)} />
                        </a>
                    </>
                ) : (
                    <>
                    </>
                ) }
                </div>
            </div>
            <div className="dataContainer">
                <div className="projectCustomer">
                    <h3>Customer: </h3>
                    <p>{item.customer}</p>
                </div>
                <div className="projectIndustry">
                    <h3>Industry: </h3>
                    <p>{item.industry}</p>
                </div>
                <div className="projectCountry">
                    <h3>Country: </h3>
                    <p>{item.country}</p>
                </div>
                <div className="projectPosition">
                    <h3>Position: </h3>
                    <p>{item.position}</p>
                </div>
                <div className="projectDuration">
                    <h3>Duration: </h3>
                    <p>{new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}</p>
                </div>
            </div>
            <div className="projectDescription">
                <h3>Description: </h3>
                <p>{item.description}</p>
            </div>
                {item.skills.length > 0 ? (
                    <div>
                        <h3>Skills: </h3>
                        <div className="projectSkills dataContainer">
                            {item.skills.map((name, index) => {
                                return (
                                    <div key={index} className="skill">{name}</div>
                                )
                            })}
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            <div className="dataContainer">
                <div className="projectLocation">
                    <h3>Location: </h3>
                    <p>{item.location}</p>
                </div>
                <div className="projectTeamSize">
                    <h3>Team Size: </h3>
                    <p>{item.teamSize}</p>
                </div>
            </div>
        </div>
    )
}

export default ProjectPost;