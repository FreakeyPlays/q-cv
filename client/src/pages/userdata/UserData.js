import { Button } from "@material-ui/core";
import React, {useState, useEffect} from "react";
import FormInput from "../../components/formInput/FormInput";
import { userDataService } from "../../services/user.services";
import { userInput } from "./UserInput.js";
import "./UserData.css";

const UserData = () => {
    //Use State Variables
    const [currentID, setCurID] = useState("");
    //const [activeUser, activateUser] = useState(false); //State variabel for if an user is loaded
    const [user, setUser] = useState({
        firstName:"",
        lasName: "",
        eMail: "",
        password: "",
        sprachen: "",
        kurzprofil: "",
        beratungsschwerpunkte: "",
        projektRollen: ""
    });

    useEffect(() =>{
            retrieveUser();
    })

    const retrieveUser = () =>{
        setCurID("6293a91218be7b568841d1dd"); //Test ID
        userDataService.getUser(currentID).then(response=>{
            console.log(response.data)
            setUser(response.data.user)
        }).catch( e =>{
            console.log(e)
        })
    }

    const updateUser = (e) =>{
        e.preventDefault();

    }

    function handleChange(e){
        setUser({...user, [e.target.name]: e.target.value});
    }

    return(
        <div className="main">
            <form className="contentContainer" onSubmit={updateUser}>
                {userInput.map((item) =>{
                    return(
                        <div className="content">
                            <FormInput key={item.id} {...item} value={user[item.name]} onChange={handleChange} />
                        </div>    
                    )
                })}
                <div className="subButton">
                    <Button type="submit" variant="contained">Änderung speichern</Button>
                </div>
            </form>
        </div>
    )
}
export default UserData; 
