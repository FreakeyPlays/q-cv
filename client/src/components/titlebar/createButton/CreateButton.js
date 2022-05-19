import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import "./CreateButton.css"
import { Link } from "react-router-dom";

const CreateButton = (props) => {
    return(
        <Link to={props.link}>
            <div className="createButton" onClick={props.function ? props.function : undefined}>
                <FontAwesomeIcon icon={faPlus} size="2x" />
            </div>
        </Link>
    )
}

export default CreateButton;