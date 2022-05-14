import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputBase from "@material-ui/core/InputBase";

import "./Searchbar.css";

const Searchbar = () => {
    return(
        <div className="searchbar">
            <div className="searchIconContainer">
                <FontAwesomeIcon icon={faSearch} className="searchIcon" />
            </div>
            <InputBase placeholder="Search..." className="searchbarInput">

            </InputBase>
        </div>
    )
}

export default Searchbar;