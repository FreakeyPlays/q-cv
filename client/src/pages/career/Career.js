import { useState, useEffect, useRef } from 'react';
import { careerDataService } from '../../services/career.service.js';
import Titlebar from "../../components/titlebar/Titlebar";
import './Career.css'
import { faPen, faTrash} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Popup from '../../components/popup/Popup.js';
import { Button } from '@material-ui/core';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { careerInput } from './career.input.js';
import FormInput from '../../components/formInput/FormInput';
import UserService from "../../services/keycloakUser.service.js";
import {userDataService} from "../../services/user.services.js";

const Career = () => {

    const [careerSet, setCareerSet] = useState([]);
    const [globalCareerSet, setGlobalCareerSet] = useState([]);
    const receivedData = useRef(false);
    const userCarrerIsSet = useRef(false);
    const [updatePopup, setUpdatePopup] = useState(false);
    const [newItemPopup, setNewItemPopup] = useState(false);
    const [deleteItemPopup, setDeleteItemPopup] = useState(false);

    //Holds the UID
    const[userId, setUserId] = useState('');
    UserService.getLoggedInUID()
    .then( res => setUserId( res ) )
    .catch( e => console.error(e.message) );

    //Holds the object-id
    const [_idOfItemToDelete, set_idOfItemToDelete] = useState('');
    const [selectForUpdate, setSelectForUpdate] = useState('');

    //Holds the _id-array of the career-cards owned by the user
    const[userCareerIdList, setUserCareerIdList] = useState([]);

    //Holds the index of the Item in the careerSetArray
    const itemToDelete = useRef(-1);

    const [updatedCareerItem, setUpdateItem] = useState({
        title:"",
        company: "",
        location: "",
        position: "",
        startDate: "",
        endDate: "",
        jobDescription: "",
        assignedUser: userId
    });

    useEffect( ()=>{
        if(!receivedData.current && userId){
            userDataService.getUser(userId)
            .then(userRes => {
                setUserCareerIdList(userRes.data.user.career);
                careerDataService.getAll()
                .then(careerRes => setGlobalCareerSet(careerRes.data))
                .catch( e => console.error(e.message));
            })
            .catch(e => console.error(e.message))
            receivedData.current = true;
        }
    }, [userId]);

    useEffect( () => {
        if(!userCarrerIsSet.current && globalCareerSet.length !== 0 &&  userCareerIdList.length !== 0 ){

            const tmpSet = [];
            for(let gc of globalCareerSet){
                for(let id of userCareerIdList){
                    if(id === gc._id) tmpSet.push(gc);
                }            
            }
            //sorting career cards based on startDate (descending)
            tmpSet.sort( (a, b) => {
                let da = new Date(a.startDate);
                let db = new Date(b.startDate);
                return db - da; //da-db would ab ascending
            });
            setCareerSet(tmpSet);
            
            userCarrerIsSet.current = true;
        }
    }, [globalCareerSet, userCareerIdList]);

    const theme = createTheme({
        palette: {
            secondary: {
                main: '#333'
            }
        }
    });

    const themeErrorBtn = createTheme({
        palette: {
            secondary: {
                main: '#FF0000'
            }
        }
    });

    /**
    * Makes the update API-call
    * @param {*} e 
    */
    const updateItem = (e)=>{
        e.preventDefault();
        let data = {};
        for(let i of e.target){
            data[i.name] = i.value;
        }
        careerDataService.updateCareerItem(selectForUpdate, data)
        .then(window.location.reload(false))
        .catch(e => console.error(e.message));
    }

    /**
    * Makes the POST API-call
    * @param {*} e 
    */
    const postItem = (e)=>{
        e.preventDefault();
        let data = {};
        for(let i of e.target){
            data[i.name] = i.value;
        }
        data["assignedUser"] = userId;
        console.log(data);
        careerDataService.newCareerItem(data)
        .then(res => {
            userDataService.setCareer({_id:userId, careerID: res.data._id}).then().catch(e => console.error(e.message));
            window.location.reload(false);
        })
        .catch(e => console.error(e.message));
    };

    const openUpdatePopup = (e) => {
        let index = e.currentTarget.getAttribute("data");
        let uData ={
            title: careerSet[index].title,
            company: careerSet[index].company,
            location: careerSet[index].location,
            position: careerSet[index].position,
            startDate: new Date(careerSet[index].startDate).toISOString().split('T')[0],
            endDate: new Date(careerSet[index].endDate).toISOString().split('T')[0],
            jobDescription: careerSet[index].jobDescription
        }
        setUpdatePopup(true);
        setSelectForUpdate(careerSet[e.currentTarget.getAttribute("data")]._id);
        setUpdateItem(uData);
    }

    const deleteCareerItem = () =>  {
            userDataService.delCareer({_id: userId, careerID: _idOfItemToDelete})
            .then( res => {
                careerDataService.deleteCareerItem(_idOfItemToDelete)
                .then(res => {
                    window.location.reload(false);
                    receivedData.current = false;
                }).catch( e => {
                    console.warn("Career-Id has been deleted from the user, but not from the career table on the DataBase!");
                    console.error(e.message);
                } )
            })
            .catch( e => console.error(e.message));
    }

    const openDeletePopup = (e) =>{
        setDeleteItemPopup(true);
        //gets reference to position in Array
        itemToDelete.current = e.currentTarget.getAttribute("data");
        set_idOfItemToDelete(careerSet[e.currentTarget.getAttribute("data")]._id)
    }

    /**
     * @param {Date-Object} date 
     * @param {Divider-String} style 
     * @returns a formated date string
     */
    const formatDate = (date, div) =>{
        let day = date.getDate();
        let month = date.getMonth();
        month++;
        let year = date.getFullYear();
        let divider = div === undefined ? "." : div;
        return ((day > 9? day : ("0"+day))+ divider + (month > 9? month : ("0"+month)) + divider + year + " ");
    }

    return(
        <>
        <Titlebar
        searchbar={false} 
        showAll={false}
        path="" 
        function={setNewItemPopup}
        />

        <div className='itemWrapper'>
            {
                careerSet.map( (item, index) => {
                    return(
                    <div key = {index} className='careerItem' data={index}>
                        <div className='headWrapper'>
                            <h2>{item.title}</h2>
                            <div className='interaction'>
                            <div data={index} onClick={ openUpdatePopup }>
                                    <FontAwesomeIcon className='skillIcon' icon={faPen} />
                                </div>
                                <div data={index} onClick={ openDeletePopup }>
                                    <FontAwesomeIcon className='skillIcon' icon={faTrash} />
                                </div>
                            </div>
                        </div>
                        <div className='careerBody'>
                            <div className='formComp col'><h3>Company/Institution</h3><p>{item.company}</p></div>
                            <div className='formLoc col'><h3>Location</h3><p>{item.location}</p></div>
                            <div className='formRole col'><h3>Position</h3><p>{item.position}</p></div>
                            <div className='formActivity col'><h3>Description</h3><p>{item.jobDescription}</p></div>
                            <div className='formTime col'>
                                <h3>Duration</h3> <p>{formatDate(new Date(item.startDate))}
                                {" - "}
                                {formatDate(new Date(item.endDate))}</p>
                            </div>
                        </div>
                    </div>
                    )
                })
            }
        </div>

        <Popup trigger={updatePopup} setTrigger={setUpdatePopup}>
            <h3>Edit</h3>
            <form className='updateContent' noValidate onSubmit={updateItem}>
                {careerInput.map((input) => (
                    <FormInput
                        key={input.id}
                        {...input}
                        value={updatedCareerItem[input.name]}
                        onChange={ (e) => setUpdateItem({...updatedCareerItem, [e.target.name]: e.target.value})} />
                ))}
                <MuiThemeProvider theme={theme}>
                    <Button 
                        type='submit'
                        color='secondary'
                        variant='contained'>
                            Change
                    </Button>
                </MuiThemeProvider>
            </form>
            
        </Popup>

        <Popup trigger={newItemPopup} setTrigger={setNewItemPopup}>
            <h3>Create new entry</h3>
            <form className='updateContent' noValidate onSubmit={postItem}>
                {careerInput.map((input) => (
                    <FormInput
                        key={input.id}
                        {...input}
                        value={updatedCareerItem[input.name]}
                        onChange={ (e) => setUpdateItem({...updatedCareerItem, [e.target.name]: e.target.value})} />
                ))}
                <MuiThemeProvider theme={theme}>
                    <Button 
                        type='submit'
                        color='secondary'
                        variant='contained'>
                            Submit
                    </Button>
                </MuiThemeProvider>
            </form>
        </Popup>

        <Popup trigger={deleteItemPopup} setTrigger={setDeleteItemPopup}>
            <h3>{"Delete this Item?"}</h3>
                <MuiThemeProvider theme={themeErrorBtn}>
                        <Button 
                        onClick={deleteCareerItem}
                        variant="outlined" 
                        color="secondary">
                            DELETE
                        </Button>
                </MuiThemeProvider>
        </Popup>

        </>
    )
}

export default Career;