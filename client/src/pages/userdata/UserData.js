import { Button } from "@material-ui/core";
import React, {useState, useEffect, useRef} from "react";
import FormInput from "../../components/formInput/FormInput";
import { userDataService } from "../../services/user.services";
import { userInput } from "./UserInput.js";
import "./UserData.css";

const UserData = () => {
    const currentUser = "6293a91218be7b568841d1dd";

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
        if(activeUser.current === false){
            retrieveUser();
            activeUser.current = true;
        } 
    })

    //function for getting user by ID (ID hard coded !)
    const retrieveUser = () =>{
        userDataService.getUser(currentUser).then(response=>{
            console.log(response.data)
            setUser(response.data.user)
        }).catch( e =>{
            console.log(e)
        })
    }

    //Update function for user data inside DB
    function updateUser(e){
        e.preventDefault();
        let cache = {};

        //Adding the new Data to cache 
        for(let i = 0; i < 8; i++){ 
            cache[e.target[i].name] = e.target[i].value;
        }

        cache["_id"] = currentUser;

        console.log(cache);

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

        userDataService.updateUser(cache).then(() => window.location.reload(false)).catch((e) => console.log("Update fehlgeschlagen!"));
        retrieveUser();
    }

    function handleChange(e){
        setUser({...user, [e.target.name]: e.target.value});
    }

    return(
        <div className="main">
            <form className="contentContainer" onSubmit={updateUser}>
                {userInput.map((item) =>{
                    return(
                        <div key={item.id} className="content">
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
