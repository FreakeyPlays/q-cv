import axios from "axios";
import { deleteUser } from "../../../server/controllers/user.controller";

const basePath = "hhtp://localhost:5000/api/user"

export const userDataService = {
    createUser(){
        return axios.post(basePath + "/" + data);
    },
    getUsers(){
        return axios.get(basePath);
    },
    deleteUser(){
        return axios.delete(basePath + `/${id}`);
    },
    updateUser(){
        return axios.put(basePath + `/${data._id}`, data);
    },
    getUser(){
        return axios.get(basePath + `/${id}`);
    }

}