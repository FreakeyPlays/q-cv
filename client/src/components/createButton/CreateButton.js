import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import "./CreateButton.css"

const CreateButton = (props) => {
    return(
        <div className="createButton" onClick={props.function}>
            <FontAwesomeIcon icon={faPlus} size="2x" />
        </div>
    )
}

export default CreateButton;