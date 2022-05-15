import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormInput from "../../components/formInput/FormInput";
import { projectDataService } from "../../services/project.service";
import { ProjectInputs } from "./project.input";

import "./CreateProject.css";

const CreateProject = () => {
    const { id } = useParams();
    // const [project, setProject] = useState();
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
        skills: "",
        location: "",
        teamSize: ""
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
    }

    function handleOnChange(e){
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    console.log(values)

    return(
        <div className="createProjectFormContainer">
            <form onSubmit={handleSubmit}>
                <h1>Create Project</h1>
                <div className="createProjectItems">
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

export default CreateProject;