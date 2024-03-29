import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import EducationPostItems from "./educationPost.items";

import "./EducationPost.css";

const EducationPost = ({ item, setIdFunc, setDeleteFunc, setUpdateFunc, setItemFunc }) => {
    
    function parseAndSetItem(item){
        let itemCopy = item;

        itemCopy["startDate"] = itemCopy["startDate"].split("T")[0];
        itemCopy["endDate"] = itemCopy["endDate"].split("T")[0];

        setItemFunc(itemCopy);
    }
    
    return(
        <div className="educationPost">
            <div className="titleSection">
                <h2 className="educationTitle">{item.title}</h2>
                <div className="educationControls">
                    <FontAwesomeIcon 
                        icon={faPen} 
                        onClick={() => {
                            setIdFunc(item._id);
                            parseAndSetItem(item);
                            setUpdateFunc(true);
                        }}
                    />
                    <FontAwesomeIcon 
                        icon={faTrash} 
                        onClick={() => {
                            setIdFunc(item._id);
                            setDeleteFunc(true);
                        }} 
                    />
                </div>
            </div>
            <div className="dataContainer">
                
                {EducationPostItems.map(element => {
                    return (
                        element.required || element.isStored(item) ? (
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

export default EducationPost;