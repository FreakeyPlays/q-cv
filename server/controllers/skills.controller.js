import Skill from '../models/skills.model.js'; 
import asyncHandler from 'express-async-handler';
import { apiResponse } from './response.js';

// @desc Set skills
// @route POST /api/skills
// @access Private
const setSkills = asyncHandler( async(req, res) =>{
    if(!req.body.name){
        apiResponse(res, false, 400, "Please add a name field");
        throw new Error('Please add a name field');
    }

    const entry = await Skill.create({
        name: req.body.name
    });
    apiResponse(res, true, 201, "Added Skill", entry);
});

// @desc Get skills by ID
// @route GET /api/skills/_id
// @access Private
const getSkillById = asyncHandler( async(req, res) =>{
    const skillSet = await Skill.findById(req.params.id);
    if(!skillSet) {
        res.status(400);
        throw new Error('Skillset not found, check the used id');
    }
    res.status(200).json(skillSet);
});

// @desc Get skills
// @route GET /api/skills
// @access Private
const getSkills = asyncHandler( async(req, res) =>{
    const skillSet = await Skill.find();
    apiResponse(res, true, 200, "Returned all Skills", skillSet);
});

// @desc delete skills #id
// @route PUT /api/skills
// @access Private
const updateSkill = asyncHandler( async(req, res) =>{
    const skillSet = await Skill.findById(req.params.id);

    if(!skillSet) {
        apiResponse(res, false, 404, "Skill not found, check the used id");
        throw new Error('Skillset not found, check the used id')
    }

    const updatedSkillSet = await Skill.findByIdAndUpdate(req.params.id, req.body, {new: true,});
    apiResponse(res, true, 200, "Updated Skill", updatedSkillSet);
});

// @desc delete skills #id
// @route DELETE /api/skills
// @access Private
const deleteSkill = asyncHandler(async(req, res) => {
    const skillSet = await Skill.findById(req.params.id);

    if(!skillSet) {
        apiResponse(res, false, 404, "Skill not found");
        throw new Error('Goal not found')
    }

    await skillSet.remove();
    apiResponse(res, true, 200, "Deleted Skill", skillSet);
});

export {
    setSkills,
    getSkills,
    updateSkill,
    deleteSkill,
    getSkillById
};
