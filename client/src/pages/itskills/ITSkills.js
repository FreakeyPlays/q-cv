import { useState, useEffect, useRef } from 'react';
import { skillDataService } from '../../services/skills.services.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons'
import "./ITSkills.css";

const ITSkills = () => {
    
    const [skill, setSkill] = useState([]);
    const receivedData = useRef(false);

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
            <div className='addSkillIcon'><FontAwesomeIcon className='skillPlusIcon' icon={faPlus} /></div>
        </>
    )
}

export default ITSkills;