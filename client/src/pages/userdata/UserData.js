import { Button } from "@material-ui/core";
import React, {useState, useEffect, useRef} from "react";
import FormInput from "../../components/formInput/FormInput";
import { userDataService } from "../../services/user.services";
import { userInput } from "./userInput.js";
import "./UserData.css";
import UserService from "../../services/keycloakUser.service";

const UserData = () => {
    const [userId, setUserId] = useState("");
    UserService.getLoggedInUID().then(data=>setUserId(data));

    //Use State Variables
    const activeUser = useRef(false);
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

    //if question for prevent infinity loop of getting the same user
    useEffect(() =>{
        if(activeUser.current === false && userId !== ""){
            userDataService.getUser(userId).then(response=>{
                setUser(response.data.user)
            }).catch( e =>{
                console.warn(e)
            })
            activeUser.current = true;
        } 
    },[userId,activeUser])

    //Update function for user data inside DB
    function updateUser(e){
        e.preventDefault();
        let cache = {};

        //Adding the new Data to cache 
        for(let i = 0; i < 7; i++){ 
            cache[e.target[i].name] = e.target[i].value;
        }

        cache["_id"] = userId;

        //Array Section --> split up strings
        let cacheSprachen = cache["sprachen"].split(",");
        cache["sprachen"] = [];
        for (let sprache of cacheSprachen){
            if(sprache.length > 0){
                cache["sprachen"].push(sprache.trim());
            }
        }

        let cacheSchwerpunkte = cache["beratungsschwerpunkte"].split(",");
        cache["beratungsschwerpunkte"] = [];
        for(let schwerp of cacheSchwerpunkte){
            if(schwerp.length > 0){
                cache["beratungsschwerpunkte"].push(schwerp.trim());
            }
        }

        let cacheRollen = cache["projektRollen"].split(",");
        cache["projektRollen"] = [];
        for(let rolle of cacheRollen){
            if(rolle.length > 0){
                cache["projektRollen"].push(rolle.trim());
            }
        }

        const kc_body = {
            email: cache["eMail"],
            firstName: cache["firstName"],
            lastName: cache["lastName"]
        }

        userDataService.updateUser(cache)
            .then(() => {
                UserService.updateKeycloakUser(UserService.getKCUID(), kc_body)
                    .then(() =>{
                        window.location.reload(false);
                    })
                    .catch(e => {
                        console.warn(e);
                    })
            })
            .catch((e) => {
                console.warn("Update fehlgeschlagen!")
            });
        activeUser.current = false;
    }

    function handleChange(e){
        setUser({...user, [e.target.name]: e.target.value});
    }

    return(
        <div className="main">
            <form className="contentContainer" onSubmit={updateUser}>
                {userInput.map((item) =>{
                    return(
                        <div key={item.id} className="inputContent">
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
