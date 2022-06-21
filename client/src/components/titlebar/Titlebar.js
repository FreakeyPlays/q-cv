import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import CreateButton from "../../components/titlebar/createButton/CreateButton";
import Searchbar from "../../components/titlebar/searchbar/Searchbar.js";

import "./Titlebar.css";
import { useState } from "react";

const Titlebar = (props) => {
    
    const [showAll, setShowAll] = useState(false)

    if(props.function){

    }

    return(
        <div className="titlebar">
            <div className="buttonContainer">
                <div className="buttonWrapper">
                    {props.showAll ? (
                        showAll ? (
                                <FontAwesomeIcon 
                                    icon={faUser} 
                                    size="2x" 
                                    onClick={() => {
                                        props.setStateFunction(false)
                                        setShowAll(false);
                                    }}
                                />
                            ) : (
                                <FontAwesomeIcon 
                                    icon={faUsers} 
                                    size="2x" 
                                    onClick={() => {
                                        props.setStateFunction(true);
                                        setShowAll(true);
                                    }}
                                />
                        )
                    ): (
                        <></>
                    )}

                    <CreateButton link={props.path} function={props.function ? props.function : null} />
                </div>
            </div>
            {props.searchbar ? (
                <div className="searchBarContainer">
                    <Searchbar setSearchFunction={props.setSearchFunction} />
                </div>
            ) : (
                <></>
            )}
        </div>
    )
}

export default Titlebar;