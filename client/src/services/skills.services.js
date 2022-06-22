import axios from "axios";

const ADDRESS = process.env.REACT_APP_URL;
const PORT = process.env.REACT_APP_API_PORT;
const basePath = "http://" + ADDRESS + ":" + PORT + "/api/skills";

export const skillDataService = {

    getAll(){
        return axios.get(basePath);
    },

    newSkill(data){
        return axios.post(basePath, data);
    },

    updateSkill(id, data){
        return axios.put(basePath + `/${id}`, data);
    },

    deleteSkill(id){
        return axios.delete(basePath + `/${id}`);
    }
}
