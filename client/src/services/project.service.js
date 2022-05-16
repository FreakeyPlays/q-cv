import axios from "axios";

const basePath = "http://localhost:5000/api/projects"

export const projectDataService = {
    getAll(){
        return axios.get(basePath);
    },

    get(id){
        return axios.get(basePath + `/${id}`);
    },

    create(data){
        return axios.post(basePath + "/", data);
    },

    edit(data){
        console.log(data);
    },

    copy(data){
        return axios.post(basePath + "/", data);
    }
}