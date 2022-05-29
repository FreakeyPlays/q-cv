import axios from "axios";

const basePath = 'http://localhost:5000/api/careers';

export const careerDataService = {
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