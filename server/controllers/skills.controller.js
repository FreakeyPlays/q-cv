import Skill from '../models/skills.model.js';
import User from '../models/user.model.js';
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
    removeSkillIdFromUsers(req.params.id);
    if(!skillSet) {
        apiResponse(res, false, 404, "Skill not found");
        throw new Error('Goal not found')
    }

    await skillSet.remove();
    apiResponse(res, true, 200, "Deleted Skill", skillSet);
});

const removeSkillIdFromUsers = asyncHandler(async(id) => {
    const allUser = await User.find();
    for(let u of allUser){
        var index = u.skills.indexOf(id);
        if(index){
            u.skills.splice(index,1);
            await User.findByIdAndUpdate(u.id, u, {new:true});
        }
    }

    
});

//This Method Checks every User for Skill IDs, which do not exist in the Skill-DB
//and removes them from the User.
const clearAllUsersFromNonExistingSkillIds = asyncHandler(async(id) =>{
    for(let u of allUser){
        for(let us of u.skills){
            const skillSet = await Skill.findById(us);

            if(!skillSet){
                var index = u.skills.indexOf(us);
                u.skills.splice(index,1);
                await User.findByIdAndUpdate(u.id, u, {new:true});
            }
        }
    }
});

export {
    setSkills,
    getSkills,
    updateSkill,
    deleteSkill,
    getSkillById
};