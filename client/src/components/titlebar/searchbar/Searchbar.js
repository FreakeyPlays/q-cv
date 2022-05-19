import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputBase from "@material-ui/core/InputBase";

import "./Searchbar.css";

const Searchbar = (props) => {
    return(
        <div className="searchbar">
            <div className="searchIconContainer">
                <FontAwesomeIcon icon={faSearch} className="searchIcon" />
            </div>
            <InputBase placeholder="Search..." className="searchbarInput" onChange={e => props.setSearchFunction(e.target.value)}>

            </InputBase>
        </div>
    )
}

export default Searchbar;