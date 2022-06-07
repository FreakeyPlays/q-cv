import axios from "axios";

const basePath = 'http://localhost:5000/api/careers';

export const careerDataService = {
    getAll(){
        return axios.get(basePath);
    },

    newCareerItem(data){
        return axios.post(basePath, data);
    },

    updateCareerItem(id, data){
        return axios.put(basePath + `/${id}`, data);
    },

    deleteCareerItem(id){
        return axios.delete(basePath + `/${id}`);
    }
}