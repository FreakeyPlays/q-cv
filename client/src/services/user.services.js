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
    }

}