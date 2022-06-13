import Titlebar from "../../components/titlebar/Titlebar";
import { useState, useEffect, useRef } from 'react';
import { cvDataService } from '../../services/cv.service.js';
import { faPen, faTrash} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./dashboard.css";
const Dashboard = () => {

    const [userCvIdList, fillUserCvIdList] = useState([]); //list of object id's which are used to get the CVs of the current user.
    const receivedData = useRef(false);
    const [cvDataObjectList, setCvDataObjectList] = useState([]); //list of cv-objects fetched
    const receivedIdList = useRef(false);
    //for testing
    const getUserCvIds = ()=>{
        //later: get id-list from user
        return['62a6f37507b0e590de6f1b04', '62a21e2c7e355fcfbece6dd1'];
    }

    useEffect( ()=>{
        if(receivedData.current === false){
            cvDataService.getAll()
                .then(response => setCvDataObjectList(response.data.response))
                .catch( e => console.error(e.message));
            receivedData.current = true;
        }
    });

    const formatDate = (date, div) =>{
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
        let divider = div === undefined ? "." : div;
        return ((day > 9? day : ("0"+day))+ divider + (month > 9? month : ("0"+month)) + divider + year + " ");
    }

    const extractEducation = (cv) => {
        if(cv.education.length === 0) return (<>
            <div>No skill added.</div>
        </>); 
        return cv.education.map((item, index) => {
            return (<>
                <div key={index}>{item.institution}</div>
            </>)
        });
    }

    const extractCareer = (cv) => {
        if(cv.career.length === 0) return (<>
            <div>No skill added.</div>
        </>); 
        return cv.career.map((item, index) => {
            return (<>
                <div key={index}>{item.company}</div>
            </>)
        });
    }

    const extractSkills = (cv) =>{
        if(cv.skills.length === 0) return (<>
            <div>No skill added.</div>
        </>); 
        return cv.skills.map((item, index) => {
            return (<>
                <div key={index}>{item.name}</div>
            </>)
        });
    }

    const extractProjects = (cv) => {
        if(cv.projects.length === 0) return (<>
            <div>No skill added.</div>
        </>); 
        return cv.projects.map((item, index) => {
            return (<>
                <div key={index}>{item.title}</div>
            </>)
        });
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

    const updateCv = (e) => {

    }

    return(
        <>
            <Titlebar 
                searchbar={false} 
                showAll={false}
                path="/create-cv" 
            />
            <div className="itemWrapper">
            {
            cvDataObjectList.map( (item, index) => {
                    return(
                    <div key={index} className='careerItem' data={index}>
                        <div className='headWrapper'>
                            <h3>{item.cvName}</h3>
                            <div className='interaction'>
                                <div data={index} onClick={updateCv}>
                                    <FontAwesomeIcon className='skillIcon' icon={faPen} />
                                </div>
                                <div data={index} onClick={ deleteCv }>
                                    <FontAwesomeIcon className='skillIcon' icon={faTrash} />
                                </div>
                            </div>
                        </div>
                        
                        <div className='companyWrapper'>
                        <div >Education: {extractEducation(item)}</div><br/>
                        <div >Career: {extractCareer(item)}</div><br/>
                        <div>Skills: {extractSkills(item)}</div><br/>
                        <div>Projects: {extractProjects(item)}</div><br/>
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