import Titlebar from "../../components/titlebar/Titlebar";
import { useState, useEffect, useRef } from 'react';
import { cvDataService } from '../../services/cv.service.js';

const Dashboard = () => {

    const dataDump = 0;
    const [userCvIdList, fillUserCvIdList] = useState([]); //list of object id's which are used to get the CVs of the current user.
    const receivedData = useRef(False);
    const [cvDataObjectList, setCvDataObjectList] = useState([]); //list of cv-objects fetched

    //for testing
    const getUserCvIds = ()=>{
        //later: get id-list from user.
        let fetchedIds = ['62a6f37507b0e590de6f1b04', '62a21e2c7e355fcfbece6dd1'] //test id's
        fillUserCvIdList(fetchedIds) 
    }

    useEffect( ()=>{
        if(receivedData.current === false){
            getUserCvIds();
            userCvIdList.map( (item, index) =>{
                //iterating over userCvIdList and fetching each CV-Obj with given id
                    cvDataService.get(item)                    
                        .then(response => setCvDataObjectList([...cvDataObjectList, response.data.response]))
                        .catch( e => console.error(e.message));
                        
                        dataDump = index;
                } 
                
            )

            


            
            receivedData.current = true;
        }
    });

    return(
        <>
            <Titlebar 
                searchbar={false} 
                showAll={false}
                path="/create-cv" 
            />
        </>
    )
}

export default Dashboard;