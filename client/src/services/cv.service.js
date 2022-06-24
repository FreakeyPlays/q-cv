import axios from "axios";

const ADDRESS = process.env.REACT_APP_URL;
const PORT = process.env.REACT_APP_API_PORT;
const basePath = "http://" + ADDRESS + ":" + PORT + "/api/cv"

export const cvDataService = {
    getAll(){
        return axios.get(basePath);
    },

    get(id){
        return axios.get(basePath + `/${id}`);
    },

    create(data){
        return axios.post(basePath + "/", data);
    },

    delete(id){
        return axios.delete(basePath + `/${id}`);
    },

    update(data){
        return axios.put(basePath + `/${data._id}`, data);
    }
}
