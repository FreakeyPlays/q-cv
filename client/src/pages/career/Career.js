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

const Career = () => {

const [careerSet, setCareerSet] = useState([]);
const receivedData = useRef(false);

const [updatePopup, setUpdatePopup] = useState(false);
const [newItemPopup, setNewItemPopup] = useState(false);
const [deleteItemPopup, setDeleteItemPopup] = useState(false);

//Holds the object-id
const [_idOfItemToDelete, set_idOfItemToDelete] = useState('');
const [selectForUpdate, setSelectForUpdate] = useState('');

//Holds the index of the Item in the careerSetArray
const itemToDelete = useRef(-1);

const [updatedCareerItem, setUpdateItem] = useState({
    title:"",
    company: "",
    location: "",
    position: "",
    startDate: "",
    endDate: "",
    jobDescription: ""
});

useEffect( ()=>{
    if(receivedData.current === false){
        careerDataService.getAll()
            .then(response => setCareerSet(response.data))
            .catch( e => console.error(e.message));
        receivedData.current = true;
        }
});

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
        careerDataService.newCareerItem(data)
        .then(window.location.reload(false))
        .catch(e => console.error(e.message));
    };

    const openUpdatePopup = (e) => {
        let index = e.currentTarget.getAttribute("data");
        let uData ={
            title: careerSet[index].title,
            company: careerSet[index].company,
            location: careerSet[index].location,
            position: careerSet[index].position,
            startDate: careerSet[index].startDate,
            endDate: careerSet[index].endDate,
            jobDescription: careerSet[index].jobDescription
        }
        setUpdatePopup(true);
        setSelectForUpdate(careerSet[e.currentTarget.getAttribute("data")]._id);
        setUpdateItem(uData);
    }

    const deleteCareerItem = () =>  {
            careerDataService.deleteCareerItem(_idOfItemToDelete).then(res => {
            window.location.reload(false);
            receivedData.current = false;
            }).catch( e => console.error(e.message) )
    }

    const openDeletePopup = (e) =>{
        setDeleteItemPopup(true);
        //gets reference to position in Array
        itemToDelete.current = e.currentTarget.getAttribute("data");
        set_idOfItemToDelete(careerSet[e.currentTarget.getAttribute("data")]._id)
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
                            <h3>{item.title}</h3>
                            <div className='interaction'>
                            <div data={index} onClick={ openUpdatePopup }>
                                    <FontAwesomeIcon className='skillIcon' icon={faPen} />
                                </div>
                                <div data={index} onClick={ openDeletePopup }>
                                    <FontAwesomeIcon className='skillIcon' icon={faTrash} />
                                </div>
                            </div>
                        </div>
                        
                        <div className='companyWrapper'>
                            <div >Name of Company/Institution: {item.company}</div>
                            <div >Location: {item.location}</div>
                        </div>
                        <div>As: {item.position}</div>
                        <div>What: {item.jobDescription}</div>
                        <div>
                            When: {new Date(item.startDate).toDateString()}
                            -
                            {new Date(item.endDate).toDateString()}
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


//deleteItemPopup
export default Career;