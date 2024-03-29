import Titlebar from "../../components/titlebar/Titlebar";
import React, { useState, useEffect, useRef } from 'react';
import { cvDataService } from '../../services/cv.service.js';
import UserService from "../../services/keycloakUser.service.js";
import {  faDownload, faPen, faTrash} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { extractCareer, extractEducation, extractSkills, extractProjects } from "./dashboard.extract.functions.js";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    let navigate = useNavigate();

    //Holds the UID 
    const [userId, setUID] = useState("");
    UserService.getLoggedInUID()
    .then( res => setUID( res ) )
    .catch( e => console.error(e.message) );

    const receivedData = useRef(false);
    const gotId = useRef(false);
    const [cvDataObjectList, setCvDataObjectList] = useState([]); //list of cv-objects fetched
    //const receivedIdList = useRef(false);
    const [showAll, setShowAll] = useState(false);

    useEffect( ( ) => {
        if(!gotId.current){
            UserService.getLoggedInUID()
            .then( res => { 
                setUID( res )
                gotId.current = true;
            } )
            .catch( e => console.error(e.message) );
        }
    });

    useEffect( ()=>{
        if(receivedData.current === false){
            cvDataService.getAll()
                .then(res => {
                    let tmp = res.data.response;
                    tmp.sort( (a, b) => {
                        let da = new Date(a.date);
                        let db = new Date(b.date);
                        return db - da; //da-db would ab ascending
                    });
                    setCvDataObjectList(tmp);
                })
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
        if(userId === id || showAll) return true;
        return false;
    }

    const updateCv = (e) => {
        let id = cvDataObjectList[e.currentTarget.getAttribute("data")]._id;
        navigate("/create-cv/"+id);
    }

    const belongsOrAdmin = (id) =>{
        if(UserService.getIsAdmin() || id === userId )return true;
        return false;
    }

    const onDownload = (url) => {
        if (!url) alert("No SharePoint Link exists in this CV.");
        else window.open(url, '_blank').focus();
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
                    return !checkForIdInUserIdList(item.ownerId) ? (<React.Fragment key={index}></React.Fragment>)
                    : ( <div key={index} className='careerItem' data={index}>
                            <div className='headWrapper'>
                                <h2>{item.cvName}</h2>
                                <div className='interaction'>
                                <div data={index} onClick={ () => onDownload(item.sharepointLink) }>
                                    <FontAwesomeIcon className='editIcon' icon={faDownload} />
                                </div>
                                {belongsOrAdmin(item.ownerId) ?( <>
                                        <div data={index} onClick={ updateCv }>
                                            <FontAwesomeIcon className='editIcon' icon={faPen} />
                                        </div>
                                        <div data={index} onClick={ deleteCv }>
                                            <FontAwesomeIcon className='editIcon' icon={faTrash} />
                                        </div>
                                    </>
                                    ) : (<>

                                    </>)
                                    }
                                </div>
                            </div>

                            <div className='companyWrapper'>
                                <div className ="fEdu"> <h3>Education</h3> {extractEducation(item)}</div>
                                <div className ="fCar"><h3>Career</h3><p>{extractCareer(item)}</p></div>
                                <div className ="fSki"><h3>Skills</h3> <p>{extractSkills(item)}</p></div>
                                <div className ="fPro"><h3>Projects</h3> <div>{extractProjects(item)}</div></div>
                                <div className="flastUpdate">updated: {formatDate(new Date(item.date))}</div>
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