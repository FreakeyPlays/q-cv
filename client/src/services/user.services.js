import axios from "axios";

const basePath = "http://localhost:5000/api/user"

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
    }

}