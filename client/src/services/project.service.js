import axios from "axios";
import { userDataService } from "./user.services.js"

const ADDRESS = process.env.REACT_APP_URL;
const PORT = process.env.REACT_APP_API_PORT;
const basePath = "http://" + ADDRESS + ":" + PORT + "/api/projects"

export const projectDataService = {
    getAll(){
        return axios.get(basePath);
    },

    get(id){
        return axios.get(basePath + `/${id}`);
    },

    create(body){
        let response = axios.post(basePath + "/", body)
            .then(res => {
                userDataService.setProject({"_id": res.data.response.assignedUser, "projectID": res.data.response._id});
                return res;
            });
        return response;
    },

    copy(data){
        let response = axios.post(basePath + "/", data)
            .then(res => {
                userDataService.setProject({"_id": res.data.response.assignedUser, "projectID": res.data.response._id});
                return res;
            })
        return response;
    },

    delete(id){
        let response = axios.delete(basePath + `/${id}`)
            .then(res => {
                userDataService.delProject({"_id": res.data.response.assignedUser, "projectID": id})
            });
        return response;
    },

    update(data){
        return axios.put(basePath + `/${data._id}`, data);
    }
}
