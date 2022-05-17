import { useState, useEffect, useRef } from 'react';
import { skillDataService } from '../../services/skills.services.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons'
import Popup from '../../components/popup/Popup.js';
import TextField from '@material-ui/core/TextField'
import "./ITSkills.css";
import { Button } from '@material-ui/core';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';


const ITSkills = () => {
    const[buttonPopup, setButtonPopup] = useState(false);
    const[newSkillName, setNewSkillName] = useState('');
    //const[newSkillAddedToDB, setNewSkillAddedToDB] = useState(false);

    const [skill, setSkill] = useState([]);
    const receivedData = useRef(false);
    
    const[updatePopup, setUpdatePopup] = useState(false);
    const[updateTargetId, setUpdateTargetId] = useState('');
    const[newUpdateSkillName, setNewUpdateSkillName] = useState('');
    const[oldUneditedName, setOldUneditedName] = useState('');
    
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
        if(receivedData.current === false){
            skillDataService.getAll()
                .then(response => setSkill(response.data))
                .catch( e => console.error(e.message));
            receivedData.current = true;
        }
    });

    return(
        <>
            <h1>IT-Skills</h1>
            <div className='allItems'>
                {
                skill.map( (item, index) =>{
                    return (
                        <div key={index} className="skillItem">
                            {item.name} 
                            <div className='interaction'>
                            <div data={index} onClick={ (e) =>  {
                                        setUpdateTargetId(skill[e.currentTarget.getAttribute("data")]._id);
                                        console.log("Item with id has been clicked: " + updateTargetId);
                                        setUpdatePopup(true);
                                        setOldUneditedName(skill[e.currentTarget.getAttribute("data")].name);
                                    }
                                }>
                                    <FontAwesomeIcon className='skillIcon' icon={faPen} />
                                </div>
                                <div data={index} onClick={ (e) =>  {
                                            let id = skill[e.currentTarget.getAttribute("data")]._id;
                                            skillDataService.deleteSkill(id).then(res => {
                                                window.location.reload(false);
                                                receivedData.current = false;
                                            })
                                        }
                                    }>
                                    <FontAwesomeIcon className='skillIcon' icon={faTrash} />
                                </div>
                            </div>
                        </div>
                    );
                })
            }
            </div>
            <div className='addSkillIcon' onClick={() => setButtonPopup(true)}>
                <FontAwesomeIcon className='skillPlusIcon' icon={faPlus} />
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
        </>
    )
}

export default ITSkills;