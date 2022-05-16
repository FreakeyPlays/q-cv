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
            //setNewSkillAddedToDB(true);
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
                                <FontAwesomeIcon className='skillIcon' icon={faPen} />
                                <FontAwesomeIcon className='skillIcon' icon={faTrash} />
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
        </>
    )
}

export default ITSkills;