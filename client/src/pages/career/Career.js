import { useState, useEffect, useRef } from 'react';
import { careerDataService } from '../../services/career.service.js';
import Titlebar from "../../components/titlebar/Titlebar";
import './Career.css'
import { faPen, faTrash} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Career = () => {

const [careerSet, setCareerSet] = useState([]);
const receivedData = useRef(false);

    useEffect( ()=>{
        if(receivedData.current === false){
            careerDataService.getAll()
                .then(response => setCareerSet(response.data))
                .catch( e => console.error(e.message));
            receivedData.current = true;
            }
    });

    return(
        <>
        <Titlebar
        searchbar={false} 
        showAll={false}
        path="/career/create" 
        />
        <div className='itemWrapper'>
            {
                careerSet.map( (item, index) => {
                    return(
                    <>
                    <div key = {index} className='careerItem' data={index}>
                        <h3>{item.title}</h3>
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
                        

                        <div className='interaction'>
                            <div data={index} onClick={ (e) =>  {

                                    }
                                }>
                                    <FontAwesomeIcon className='skillIcon' icon={faPen} />
                                </div>
                                <div data={index} onClick={ (e) =>  {

                                    }
                                }>
                                    <FontAwesomeIcon className='skillIcon' icon={faTrash} />
                                </div>
                            </div>


                    </div>
                    </>
                    )

                })
            }
        </div>
        </>
    )
}

export default Career;