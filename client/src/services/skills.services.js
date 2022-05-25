import axios from "axios";

const basePath = 'http://localhost:5000/api/skills';

export const skillDataService = {
    getUserSkillSet(){
        let dummyIdArray = ['6282bce71d947c893cf35f39', '6282bcf51d947c893cf35f3c', '62835e98810c7dc0d8c6fbd7'] // remove Later on and get Array from User
        let entryArray = [];
        dummyIdArray.map( (item, index) => {
            console.log(index);
            entryArray.push(axios.get(basePath + "/" + item));
        });
        console.log(entryArray);
    },

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