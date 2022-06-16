import Titlebar from "../../components/titlebar/Titlebar";
import { useState, useEffect, useRef } from 'react';
import { cvDataService } from '../../services/cv.service.js';
import { faPen, faTrash} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { extractCareer, extractEducation, extractSkills, extractProjects } from "./dashboard.extract.functions.js";
import "./dashboard.css";

const Dashboard = () => {

    const [userCvIdList, fillUserCvIdList] = useState([]); //list of object id's which are used to get the CVs of the current user.
    const receivedData = useRef(false);
    const [cvDataObjectList, setCvDataObjectList] = useState([]); //list of cv-objects fetched
    //const receivedIdList = useRef(false);
    const [showAll, setShowAll] = useState(false);

    //for testing
    const getUserCvIds = ()=>{
        //later: get id-list from user
        fillUserCvIdList(['62a21e2c7e355fcfbece6dd1', '62a750e4a6cd7afb70959423']);
    }

    useEffect( ()=>{
        if(receivedData.current === false){
            getUserCvIds();
            cvDataService.getAll()
                .then(response => setCvDataObjectList(response.data.response))
                .catch( e => console.error(e.message));
            receivedData.current = true;
        }
    });

    const formatDate = (date, div) =>{
        console.log(date)
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
        for(let uid of userCvIdList){
            if(uid === id || showAll) return true;
        }
        return false;
    }

    const updateCv = (e) => {
        //TODO: Go to update page and fill in data of selected cv -> hand over cv obj or cv _id
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
                    if(!checkForIdInUserIdList(item._id))return(<></>)

                    return(
                    <div key={index} className='careerItem' data={index}>
                        <div className='headWrapper'>
                            <h3>{item.cvName}</h3>
                            <div className='interaction'>
                                <div data={index} onClick={updateCv}>
                                    <FontAwesomeIcon className='editIcon' icon={faPen} />
                                </div>
                                <div data={index} onClick={ deleteCv }>
                                    <FontAwesomeIcon className='editIcon' icon={faTrash} />
                                </div>
                            </div>
                        </div>
                        
                        <div className='companyWrapper'>
                        <div > <h4>Education:</h4> {extractEducation(item)}</div><br/>
                        <div ><h4>Career:</h4> {extractCareer(item)}</div><br/>
                        <div><h4>Skills:</h4> {extractSkills(item)}</div><br/>
                        <div><h4>Projects:</h4> {extractProjects(item)}</div><br/>
                            <div>updated: { formatDate(new Date(item.date))}</div><br/>
                            <div></div>
                        </div>
                    </div>
                    )
                })
            }
            </div>
        </>
    )
}

export default Dashboard;