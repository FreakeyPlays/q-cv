import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormInput from "../../components/formInput/FormInput";
import { projectDataService } from "../../services/project.service";
import { ProjectInputs } from "./project.input";

import "./ManageProject.css";

const ManageProject = (params) => {
    const { id } = useParams();
    const [refresh, setRefresh] = useState(true);
    const [values, setValues] = useState({
        title: "",
        customer: "",
        industry: "",
        country: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
        activities: "",
        location: "",
        teamSize: "",
        environment: ""
      });
    
    useEffect(() => {
        if(id && refresh){
            projectDataService.get(id)
                .then(response => {
                    let projectToCopy = response.data.project;
                    let tmpValues = {}
                    
                    for(let key of Object.keys(values)){
                        tmpValues[key] = projectToCopy[key];
                    }

                    let tmpActivities =  tmpValues["activities"];
                    tmpValues["activities"] = "";
                    for(let i = 0; i < tmpActivities.length; i++){
                        tmpValues["activities"] += tmpActivities[i];
                        if(i < tmpActivities.length-1){
                            tmpValues["activities"] += ", ";
                        }    
                    }
                    tmpValues["startDate"] = new Date(tmpValues["startDate"]).toISOString().split("T")[0];
                    tmpValues["endDate"] = new Date(tmpValues["endDate"]).toISOString().split("T")[0];

                    setValues(tmpValues);
                    setRefresh(false)
                })
                .catch(() => {setRefresh(false)});
        }
    },[refresh, id, values]);

    function handleSubmit(e){
        e.preventDefault();
        let tmp = {};

        for(let i = 0; i < 12; i++){
            tmp[e.target[i].name] = e.target[i].value;
        }
        //TODO set user
        tmp["assignedUser"] = "627d6e4624b23d01f548f867";

        let tmpActivities = tmp["activities"].split(",");
        tmp["activities"] = [];
        for(let activity of tmpActivities){
            if(activity.length > 0){
                tmp["activities"].push(activity.trim());
            }
        }

        let promise = params.function(tmp);

        promise
            .then(() => window.location.href = "/projects")
            .catch((e) => console.log(e));
    }

    function handleOnChange(e){
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    return(
        <div className="manageProjectFormContainer">
            <form onSubmit={handleSubmit}>
                <h1>{params.title} Project</h1>
                <div className="manageProjectItems">
                    {ProjectInputs.map((input) => (
                        <FormInput
                            key={input.id}
                            {...input}
                            value={values[input.name]}
                            onChange={handleOnChange}
                        />
                    ))}
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default ManageProject;