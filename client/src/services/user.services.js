import axios from "axios";

const ADDRESS = process.env.REACT_APP_URL;
const PORT = process.env.REACT_APP_API_PORT;
const basePath = "http://" + ADDRESS + ":" + PORT + "/api/user";

export const userDataService = {
    createUser(data){
        return axios.post(basePath, data);
    },
    getUsers(){
        return axios.get(basePath);
    },
    deleteUser(id){
        return axios.delete(basePath + `/${id}`);
    },
    updateUser(data){
        return axios.put(basePath + `/${data._id}`, data);
    },
    getUser(id){
        return axios.get(basePath + `/${id}`);
    },
    setEducation(data){
        return axios.put(basePath + `/${data._id}/eID${data.educationID}`);
    },
    delEducation(data){
        return axios.delete(basePath + `/${data._id}/eID${data.educationID}`);
    },
    setSkill(data){
        return axios.put(basePath + `/${data._id}/sID${data.skillID}`);
    },
    delSkill(data){
        return axios.delete(basePath + `/${data._id}/sID${data.skillID}`);
    },
    setCareer(data){
        return axios.put(basePath + `/${data._id}/cID${data.careerID}`);
    },
    delCareer(data){
        return axios.delete(basePath + `/${data._id}/cID${data.careerID}`);
    },
    setProject(data){
        return axios.put(basePath + `/${data._id}/pID${data.projectID}`);
    },
    delProject(data){
        return axios.delete(basePath + `/${data._id}/pID${data.projectID}`);
    }

}