import cvSchema from "../models/cv.model.js";
import asyncHandler from "express-async-handler";
import { apiResponse } from "./response.js";

function CheckForError(CV, res){
    if(!CV){
        apiResponse(res, false, 404, "CV not found, check the used id");
        throw new Error('CV not found, check the used id');
    }
}

// @desc get CVs
// @route GET /api/Cvs
// @access Private
const getCVs = asyncHandler( async(req, res) =>{
    const CV = await cvSchema.find();
    apiResponse(res, true, 200, "Returned all CVs", CV);
});

// @desc get CV by id
// @route GET /api/Cvs/:id
// @access Private
const getCVById = asyncHandler( async(req, res) =>{
    const CV = await cvSchema.findById(req.params.id);
    CheckForError(CV, res);
    apiResponse(res, true, 200, "Returned requested CV", CV);
});

// @desc update CV #id
// @route PUT /api/Cvs/:id
// @access Private
const updateCV = asyncHandler( async(req, res) =>{
    const updatedCV = await cvSchema.findByIdAndUpdate(req.params.id, req.body, {new: true});
    CheckForError(updatedCV, res);
    apiResponse(res, true, 200, "Updated Skill", updatedCV);
});

// @desc Set CV
// @route POST /api/Cvs
// @access Private
const setCv = asyncHandler( async(req, res) =>{

    //A CV-Name is required for it to be created in the DB
    if(!req.body.cvName){
        apiResponse(res, false, 400, "Please provide a CV name");
        throw new Error('Please add a name field');
    }

    const entry = await cvSchema.create({
        ownerId: req.body.ownerId,
        cvName: req.body.cvName,
        date: req.body.date,
        userData: req.body.userData,
        education: req.body.education,
        career: req.body.career,
        skills: req.body.skills,
        projects: req.body.projects,
        sharepointLink: req.body.sharepointLink
    });

    apiResponse(res, true, 201, "Added CV", entry);
});

// @desc delete CV #id
// @route delete /api/Cvs/:id
// @access Private
const deleteCV = asyncHandler(async(req, res) => {
    const CV = await cvSchema.findById(req.params.id);
    CheckForError(CV, res);
    await CV.remove();
    apiResponse(res, true, 200, "Deleted CV", CV);
});

export {
    getCVs,
    getCVById,
    updateCV,
    setCv,
    deleteCV
}
