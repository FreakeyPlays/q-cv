import Titlebar from "../../components/titlebar/Titlebar";
import { useState, useEffect, useRef } from 'react';
import { cvDataService } from '../../services/cv.service.js';
import { faPen, faTrash} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { extractCareer, extractEducation, extractSkills, extractProjects } from "./dashboard.extract.functions.js";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    let navigate = useNavigate();

    const receivedData = useRef(false);
    const [uId, setUID] = useState("");
    const [cvDataObjectList, setCvDataObjectList] = useState([]); //list of cv-objects fetched
    //const receivedIdList = useRef(false);
    const [showAll, setShowAll] = useState(false);
    
    //for testing
    const getOwnerId = ()=>{
        //later: get id-list from user
        setUID("62961e08f9b16e4ba142dd05"); // _id des users Marc
    }

    useEffect( ()=>{
        if(receivedData.current === false){
            getOwnerId();
            cvDataService.getAll()
                .then(res => setCvDataObjectList(res.data.response))
                .catch( e => console.error(e.message));
            receivedData.current = true;
        }
    });

    const formatDate = (date, div) =>{
        let day = date.getDate();
        let month = date.getMonth() +1;
        let year = date.getFullYear();
        let divider = div === undefined ? "." : div;
        return ((day > 9? day : ("0"+day))+ divider + (month > 9? month : ("0"+month)) + divider + year + " ");
    }

    const deleteCv = (e) => {
        let id = cvDataObjectList[e.currentTarget.getAttribute("data")]._id;
        cvDataService.delete(id)
        .then(res => {
            window.location.reload(false);
            receivedData.current = false;
        })
        .catch( e => console.error(e.message));;
    }

    const checkForIdInUserIdList = (id) => {
        if(uId === id || showAll) return true;
        return false;
    }

    const updateCv = (e) => {
        let id = cvDataObjectList[e.currentTarget.getAttribute("data")]._id;
        navigate("/create-cv/"+id);
    }

    return(
        <>
            <Titlebar 
                setStateFunction={(newVal) => setShowAll(newVal)}
                searchbar={false} 
                showAll={true}
                path="/create-cv" 
            />
            <div className="itemWrapper">
            {
            cvDataObjectList.map( (item, index) => {
                    if(!checkForIdInUserIdList(item.ownerId))return(<> </>)

                    return(
                    <>
                    <div key={index} className='careerItem' data={index}>
                        <div className='headWrapper'>
                            <h2>{item.cvName}</h2>
                            <div className='interaction'>
                                <div data={index} onClick={ updateCv }>
                                    <FontAwesomeIcon className='editIcon' icon={faPen} />
                                </div>
                                <div data={index} onClick={ deleteCv }>
                                    <FontAwesomeIcon className='editIcon' icon={faTrash} />
                                </div>
                            </div>
                        </div>
                        
                        <div className='companyWrapper'>
                            <div className ="fEdu"> <h3>Education</h3> <p>{extractEducation(item)}</p></div>
                            <div className ="fCar"><h3>Career</h3><p>{extractCareer(item)}</p></div>
                            <div className ="fSki"><h3>Skills</h3> <p>{extractSkills(item)}</p></div>
                            <div className ="fPro"><h3>Projects</h3> <div>{extractProjects(item)}</div></div>
                            <div className="flastUpdate">updated: {formatDate(new Date(item.date))}</div>
                        </div>
                    </div>
                    </>
                    )
                })
            }
            </div>
        </>
    )
}

export default Dashboard;