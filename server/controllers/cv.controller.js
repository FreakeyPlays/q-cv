import cvSchema from "../models/cv.model.js";
import asyncHandler from "express-async-handler";
import { apiResponse } from "./response.js";

const setCv = asyncHandler( async(req, res) =>{

    //A CV-Name is required for it to be created in the DB
    if(!req.body.cvName){
        apiResponse(res, false, 400, "Please provide a CV name");
        throw new Error('Please add a name field');
    }

    const entry = await cvSchema.create({
        cvName: req.body.cvName,
        date: new Date().now().toISOString.split("T")[0],
        userData: req.body.userData,
        education: req.body.education,
        career: req.body.career,
        skills: req.body.skills,
        projects: req.body.projects
    });

    apiResponse(res, true, 201, "Added CV", entry);
});

const deleteCV = asyncHandler(async(req, res) => {
    const CV = await cvSchema.findById(req.params.id);

    if(!CV) {
        apiResponse(res, false, 404, "CV not found");
        throw new Error('CV not found')
    }

    await skillSet.remove();
    apiResponse(res, true, 200, "Deleted CV", CV);
});

export {
    setCv,
    deleteCV
}
