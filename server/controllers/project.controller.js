import Project from "../models/project.model.js";
import asyncHandler from "express-async-handler";

// @desc Set project
// @route POST /api/project/
// @access Private
const setProject = asyncHandler( async (req, res) => {
    const title = req.body.title;
    const customer = req.body.customer;
    const industry = req.body.industry;
    const country = req.body.country;
    const position = req.body.position;
    const startDate = Date.parse(req.body.startDate);
    const endDate = Date.parse(req.body.endDate);
    const description = req.body.description;
    const activities = req.body.activities;
    const location = req.body.location;
    const teamSize = req.body.teamSize;
    const assignedUser = req.body.assignedUser;

    if( !title || !customer || !industry || 
        !country || !position || !startDate || 
        !endDate || !description || !location ||
        !teamSize || !assignedUser ){
        
        res.status(400).json({
            ok: false,
            status: 400,
            message: "A required parameter is missing or incorrect"
        });
        throw new Error("A required parameter is missing or incorrect");
    }

    const entry = await Project.create({
        title,
        customer,
        industry,
        country,
        position,
        startDate,
        endDate,
        description,
        location,
        teamSize,
        assignedUser,
        activities: activities ? activities : []
    })

    res.json({
        ok: true,
        status: 200,
        message: "Project created",
        project: entry
    });
})

// @desc Get all projects
// @route GET /api/project/
// @access Private
const getAllProjects = asyncHandler( async (req, res) => {
    const projects = await Project.find();

    res.status(200).json({
        ok: true,
        status: 200,
        message: "Returned all Projects",
        projects
    })
})

// @desc Get project by ID
// @route GET /api/project/:id
// @access Private
const getProject = asyncHandler( async (req, res) => {
    const project = await Project.findById(req.params.id);

    if(!project){
        res.status(400).json({
            ok: false,
            status: 400,
            message: "Could not finy Project by ID"
        });

        throw new Error("Could not finy Project by ID");
    }

    res.status(200).json({
        ok: true,
        status: 200,
        message: "Returned Project",
        project
    })
})

// @desc Delete project by ID
// @route /api/project/:id
// @access Private
const deleteProject = asyncHandler( async (req, res) => {
    const project = await Project.findById(req.params.id);

    if(!project) {
        res
            .status(400)
            .json({
                ok: false,
                status: 400,
                message: "No Project found with ID: " + req.params.id
            });
        
        throw new Error("No Project found with ID: " + req.params.id );
    }

    await project.remove();
    res
        .status(200)
        .json({
            ok: true,
            status: 200,
            message: "Deleted Project",
            project
        });
})

export {
    setProject,
    getAllProjects,
    getProject,
    deleteProject
}
