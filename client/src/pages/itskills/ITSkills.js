import { useState, useEffect, useRef } from 'react';
import { skillDataService } from '../../services/skills.services.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash, faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'
import Popup from '../../components/popup/Popup.js';
import TextField from '@material-ui/core/TextField'
import "./ITSkills.css";
import { Button } from '@material-ui/core';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import Titlebar from "../../components/titlebar/Titlebar";
import UserService from "../../services/keycloakUser.service.js" 
import {userDataService} from "../../services/user.services.js"

const ITSkills = () => {
    const[buttonPopup, setButtonPopup] = useState(false);
    const[newSkillName, setNewSkillName] = useState('');

    const [skill, setSkill] = useState([]);//skill onjects form the db (name, _id)
    const receivedData = useRef(false);

    const [uSkills, setUSkills] = useState([]); //only names of the owned skills of the user
    
    const[updatePopup, setUpdatePopup] = useState(false);
    const[updateTargetId, setUpdateTargetId] = useState('');
    const[newUpdateSkillName, setNewUpdateSkillName] = useState('');
    const[oldUneditedName, setOldUneditedName] = useState('');
    const[userId, setUserId] = useState('');
    const isAdmin = useRef(false);

    isAdmin.current = UserService.getIsAdmin();
    console.log(isAdmin.current);
    UserService.getLoggedInUID()
    .then( res => setUserId( res ) )
    .catch( e => console.error(e.message) )

    const handleUpdateSubmit = (e) =>{
        e.preventDefault();
        if(updateTargetId){
            skillDataService.updateSkill(updateTargetId,{
                "name":newUpdateSkillName
            }).then((res)=>{
                console.log(res.params);
                window.location.reload(false);
                receivedData.current = false;
            })
        }
    }

    const theme = createTheme({
        palette: {
            secondary: {
                main: '#333'
            }
          },
    });

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(newSkillName){
            skillDataService.newSkill({
                "name":newSkillName
            })
            window.location.reload(false);
            receivedData.current = false;
        }
    }

    useEffect( ()=>{
        if(userId !== '' && receivedData.current === false){
            skillDataService.getAll()
                .then(response => {
                    setSkill(response.data.response)
                    userDataService.getUser(userId)
                        .then(res => {
                            for(let s of response.data.response){
                                for(let us of res.data.user.skills){
                                    if(us === s._id){
                                        uSkills.push(s.name);
                                    }
                                    }
                                }
                                setUSkills([...uSkills]);
                            }
                        )
                    }
                )
                .catch( e => console.error( e.message ) );
            receivedData.current = true;
        }
    },[userId, skill, uSkills]);

const removeSkillFromUser = (e)  => {
    let name = e.currentTarget.getAttribute("data");
    let id;
    for( let s of skill){
        if(s.name === name)id = s._id
    }

    if(id)userDataService.delSkill({_id: userId, skillID: id})
    .then( res => window.location.reload(false))
    .catch( e => console.error( e.message ) );// Logged in user und skill id übergeben, check user.service.js dafür
}

const addSkillToUser = (e) => {
    let id = skill[e.currentTarget.getAttribute("data")]._id
    if(id)userDataService.setSkill({_id: userId, skillID: id})
    .then(res => {console.log(res)
    window.location.reload(false)})
    .catch(e => console.error(e.message))
}

const userHasSkill = ( sk ) => {
    for( let s of uSkills){
        if(s === sk)return true;
    }
    return false;
}
    return(
        <>
            <Titlebar 
                path = "/it-skills"
                function = {() => setButtonPopup(true)}
            />

            <div className="pageContent">
            <div className='userItems'>
            <div className='listTitle'><h2>My skills</h2></div>
                {
                uSkills.map( (item, index) =>{
                    return (
                        <div key={index} className="skillItem">
                            {item}
                            <div className='interaction'>
                                <div data={item} onClick={ removeSkillFromUser }>
                                    <FontAwesomeIcon className='skillIcon' icon={faMinus} />
                                </div>
                            </div>
                        </div>
                    );
                })
            }
            </div>
            

            
            <div className='allItems'>
            <div className='listTitle'><h2>General List</h2></div>
                {
                skill.map( (item, index) =>{
                    return (
                        <div key={index} className="skillItem">
                            {item.name} 
                            <div className='interaction'>
                            
                            {!userHasSkill(item.name)?<div data={index} onClick={ addSkillToUser }>
                                <FontAwesomeIcon className='skillIcon' icon={faPlus}  />
                            </div>:<></>}
                            {isAdmin.current?<div data={index} onClick={ (e) =>  {
                                        setUpdateTargetId(skill[e.currentTarget.getAttribute("data")]._id);
                                        console.log("Item with id has been clicked: " + updateTargetId);
                                        setUpdatePopup(true);
                                        setOldUneditedName(skill[e.currentTarget.getAttribute("data")].name);
                                    }
                                }>
                                    <FontAwesomeIcon className='skillIcon' icon={faPen} /> 
                                </div>: <></>}
                                {isAdmin.current?
                                <div data={index} onClick={ (e) =>  {
                                            let id = skill[e.currentTarget.getAttribute("data")]._id;
                                            skillDataService.deleteSkill(id).then(res => {
                                                window.location.reload(false);
                                                receivedData.current = false;
                                            }).catch( e => console.error(e.message) )
                                        }
                                    }>
                                    <FontAwesomeIcon className='skillIcon' icon={faTrash} />
                                </div>:<></>}
                            </div>
                        </div>
                    );
                })
            }
            </div>
                       
            <Popup trigger ={buttonPopup}  setTrigger={setButtonPopup}>
                <h3>New Skill</h3>
                    <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                        <MuiThemeProvider theme={theme}>
                            <TextField 
                            label='required' 
                            required
                            color='secondary'
                            onChange={ (e) => setNewSkillName(e.target.value)} 
                            ></TextField>
                            <Button 
                            type='submit'
                            color='secondary'
                            variant='contained'
                            >Submit</Button>
                        </MuiThemeProvider>
                    </form>
            </Popup>

            <Popup trigger={updatePopup} setTrigger={setUpdatePopup}>
                <h3>Rename Skill</h3>
                <form noValidate autoComplete='off' onSubmit={handleUpdateSubmit}>
                    <MuiThemeProvider theme={theme}>
                        <TextField 
                        label='required' 
                        required
                        color='secondary'
                        defaultValue={oldUneditedName}
                        variant="filled"
                        onChange={ (e) => setNewUpdateSkillName(e.target.value)}
                        ></TextField>
                        <Button 
                        type='submit'
                        color='secondary'
                        variant='contained'>
                            change
                        </Button>
                    </MuiThemeProvider>
                </form>
            </Popup> 

            </div>   
        </>
    )
}

export default ITSkills;