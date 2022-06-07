import axios from "axios";

const ADDRESS = process.env.REACT_APP_URL;
const PORT = process.env.REACT_APP_API_PORT;
const basePath = "http://" + ADDRESS + ":" + PORT + "/api/careers";

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