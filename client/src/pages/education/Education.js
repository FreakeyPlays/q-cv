import { useEffect, useState } from "react";
import EducationPost from "../../components/education/EducationPost.js";
import Titlebar from "../../components/titlebar/Titlebar.js";
import { educationDataService } from "../../services/education.service.js";

import "./Education.css";

const currentUserID = "627d6e4624b23d01f548f867";

const Education = () => {

    const [education, setEducation] = useState([]);

    const [newItemPopup, setNewItemPopup] = useState(true);
    const [deleteItemPopup, setDeleteItemPopup] = useState(true);
    const [updateItemPopup, setUpdateItemPopup] = useState(true);

    useEffect(() => {
        educationDataService.getAll({"owner": currentUserID})
            .then(res => setEducation(res.data.response))
            .catch(e => console.error(e.message));
    })

    return(
        <>
            <Titlebar 
                searchbar={false}
                showAll={false}
                function={setNewItemPopup}
                path=""
            />
            <div className="educationContainer">
                {education.splice(0).reverse().map((item, index) => {
                        return(
                            <EducationPost item={item} key={index} />
                        )
                    })}
            </div>
        </>
    )
}

export default Education;