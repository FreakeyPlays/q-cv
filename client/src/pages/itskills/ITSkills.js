import { useState, useEffect, useRef } from 'react';
import { skillDataService } from '../../services/skills.services.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import Popup from '../../components/popup/Popup.js';
import TextField from '@material-ui/core/TextField'
import "./ITSkills.css";
import { Button } from '@material-ui/core';


import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';

const ITSkills = () => {
    
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
                                <div onClick={()=>{
                                    console.log("TODO: DELETE THIS SKILL");
                                }}>
                                    <FontAwesomeIcon className='skillIcon' icon={faTrash} />
                                </div>
                            </div>
                        </div>
                    );
                })
            }
            </div>
            <div className='addSkillIcon'><FontAwesomeIcon className='skillPlusIcon' icon={faPlus} /></div>
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