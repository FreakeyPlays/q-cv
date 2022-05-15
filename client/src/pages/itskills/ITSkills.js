import { useState, useEffect } from 'react';
import { skillDataService } from '../../services/skills.services.js';

const ITSkills = () => {

    const [skill, setSkill] = useState([]);

    useEffect( ()=>{
        skillDataService.getAll()
            .then(response => setSkill(response.data))
            .catch( e => console.error(e.message));
    })

    return(
        <>
            <h1>IT-Skills</h1>
            <table>
            <tr>
                <th>Skill</th>
                <th>_id</th>
            </tr>
            
                {
                skill.map( (item, index) =>{
                    return (
                        <tr>
                            <td key={index}> {item.name}</td>
                            <td key={index}> {item._id}</td>
                        </tr>
                    );
                })
            }
            </table>
        </>
    )
}

export default ITSkills;