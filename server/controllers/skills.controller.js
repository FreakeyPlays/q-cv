import Skill from '../models/skills.model.js'; 
import asyncHandler from 'express-async-handler';

// @desc Set skills
// @route POST /api/skills
// @access Private
const setSkills = asyncHandler( async(req, res) =>{
    if(!req.body.name){
        res.status(400);
        throw new Error('Please add a name field');
    }

    const entry = await Skill.create({
        name: req.body.name
    });
    res.status(200).json(entry);
});

// @desc Set skills
// @route POST /api/skills
// @access Private
const getSkills = asyncHandler( async(req, res) =>{
    const skillSet = await Skill.find();
    res.status(200).json(skillSet);
});

// @desc delete skills #id
// @route PUT /api/skills
// @access Private
const updateSkill = asyncHandler( async(req, res) =>{
    const skillSet = await Skill.findById(req.params.id);
    if(!skillSet) {
        res.status(400);
        throw new Error('Skillset not found, check the used id')
    }
    const updatedSkillSet = await Skill.findByIdAndUpdate(req.params.id, req.body, {new: true,});
    res.status(200).json(updatedSkillSet);
});

// @desc delete skills #id
// @route DELETE /api/skills
// @access Private
const deleteSkill = asyncHandler(async(req, res) => {
    const skillSet = await Skill.findById(req.params.id);
    if(!skillSet) {
        res.status(400);
        throw new Error('Goal not found')
    }
    await skillSet.remove();
    res.status(200).json({id: req.params.id});
});

export {
    setSkills,
    getSkills,
    updateSkill,
    deleteSkill
};
