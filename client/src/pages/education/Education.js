import { useEffect, useState } from "react";
import EducationPost from "../../components/education/EducationPost.js";
import Titlebar from "../../components/titlebar/Titlebar.js";
import { educationDataService } from "../../services/education.service.js";
import DeletePopup from "../../components/popup/deletePopup/DeletePopup.js";
import EditPopup from "../../components/popup/editPopup/EditPopup.js";
import educationInputs from "./education.inputs.js";

import "./Education.css";
import CreatePopup from "../../components/popup/createPopup/CreatePopup.js";

const currentUserID = "627d6e4624b23d01f548f867";

const Education = () => {
    const [education, setEducation] = useState([]);
    const [dataReceived, setDataReceived] = useState(false);

    const [item, setItem] = useState({
        title: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: ""
    });
    const resetItem = () => {
        setItem({
            title: "",
            degree: "",
            fieldOfStudy: "",
            startDate: "",
            endDate: ""
        });
    }

    const [newItemPopup, setNewItemPopup] = useState(false);
    const [deleteItemPopup, setDeleteItemPopup] = useState(false);
    const [updateItemPopup, setUpdateItemPopup] = useState(false);

    const [selectedID, setSelectedID] = useState("");

    useEffect(() => {
        if(!dataReceived.current){
            educationDataService.getAll({"owner": currentUserID})
                .then(res => {
                    setEducation(res.data.response);
                    setDataReceived(true);
                })
                .catch(e => console.error(e.message));
        }
    }, [dataReceived, deleteItemPopup, updateItemPopup, newItemPopup, item]);

    const createEducationItem = (evt) => {
        evt.preventDefault();
        item["assignedUser"] = currentUserID;
        educationDataService.create(item)
            .then(() => {
                setNewItemPopup(false);
                setDataReceived(false);
                resetItem();
            })
            .catch(e => console.warn(e.message))
    }

    const updateEducationItem = (evt) => {
        evt.preventDefault();
        educationDataService.update(item)
            .then(() => {
                setUpdateItemPopup(false);
                setSelectedID("");
                setDataReceived(false);
                resetItem();
            })
            .catch(e => console.warn(e.message));
    }

    const deleteEducationItem = (evt) => {
        evt.preventDefault();
        educationDataService.delete(selectedID)
            .then(() => {
                setDeleteItemPopup(false);
                setSelectedID("");
                setDataReceived(false);
            })
            .catch(e => console.warn(e.message));
    }

    return(
        <>
            <Titlebar 
                searchbar={false}
                showAll={false}
                function={() => setNewItemPopup(true)}
                path=""
            />

            <div className="educationContainer">
                {education.splice(0).reverse().map((item, index) => {
                        return(
                            <EducationPost 
                                item={item} 
                                setIdFunc={setSelectedID}
                                setDeleteFunc={setDeleteItemPopup}
                                setUpdateFunc={setUpdateItemPopup}
                                setItemFunc={setItem}
                                key={index} 
                            />
                        )
                    })}
            </div>

            <CreatePopup 
                triggerVar={newItemPopup} 
                setTriggerFunc={setNewItemPopup}
                onSubmitFunc={createEducationItem}
                setUpdateItem={setItem}
                inputs={educationInputs}
                item={item}
            />

            <EditPopup 
                triggerVar={updateItemPopup} 
                setTriggerFunc={setUpdateItemPopup}
                onSubmitFunc={updateEducationItem}
                setUpdateItem={setItem}
                inputs={educationInputs}
                item={item}
            />

            <DeletePopup 
                triggerVar={deleteItemPopup} 
                setTriggerFunc={setDeleteItemPopup}
                deleteFunc={deleteEducationItem}
            />
        </>
    )
}

export default Education;