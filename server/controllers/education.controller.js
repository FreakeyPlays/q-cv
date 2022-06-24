import Education from "../models/education.model.js";
import asyncHandler from "express-async-handler";
import { apiResponse } from "./response.js";

// @desc Create a education
// @route POST /api/education/
// @access Private
const setEducation = asyncHandler( async (req, res) => {
    const title = req.body.title;
    const degree = req.body.degree;
    const fieldOfStudy = req.body.fieldOfStudy;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const assignedUser = req.body.assignedUser;

    if( !title || !degree || !startDate ||
        !endDate || !assignedUser){
        
        apiResponse(res, false, 400, "A required parameter is missing or incorrect");
        throw new Error("A required parameter is missing or incorrect");
    }

    const entry = await Education.create({
        title,
        degree,
        fieldOfStudy,
        startDate,
        endDate,
        assignedUser
    });

    apiResponse(res, true, 201, "Education created", entry);
})

// @desc Get all educations
// @route GET /api/education/
// @access Private
const getAllEducations = asyncHandler( async (req, res) => {
    const owner = req.query.owner;

    if(!owner){
        apiResponse(res, false, 400, "Missing owner ID");
        throw new Error("Missing owner ID");
    }

    const education = await Education.find({ assignedUser: owner });

    if(education === undefined){
        apiResponse(res, false, 404, "No Educations found");
        throw new Error("No Educations found");
    }

    apiResponse(res, true, 200, "Returned all Educations of Owner", education);
})

// @desc Get education by ID
// @route GET /api/education/:id
// @access Private
const getEducation = asyncHandler( async (req, res) => {
    const education = await Education.findById(req.params.id);

    if(!education){
        apiResponse(res, false, 404, "Could not find Education by ID");
        throw new Error("Could not find Education by ID");
    }

    apiResponse(res, true, 200, "Returned Education", education);
})

// @desc Update education by ID
// @route PUT /api/education/:id
// @access Private
const updateEducation = asyncHandler( async (req, res) => {
    const education = await Education.findByIdAndUpdate(req.params.id, req.body, {new: true});

    if(!education) {
        apiResponse(res, false, 404, "No Education found with ID: " + req.params.id);
        throw new Error("No Education found with ID: " + req.params.id );
    }

    apiResponse(res, true, 200, "Updated Education", education);
})

// @desc Delete education by ID
// @route DELETE /api/education/:id
// @access Private
const deleteEducation = asyncHandler( async (req, res) => {
    const education = await Education.findById(req.params.id);

    if(!education) {
        apiResponse(res, false, 404, "No Education found with ID: " + req.params.id);        
        throw new Error("No Education found with ID: " + req.params.id );
    }

    await education.remove();
    apiResponse(res, true, 200, "Deleted Education", education);
})

export {
    setEducation,
    getAllEducations,
    getEducation,
    updateEducation,
    deleteEducation
}