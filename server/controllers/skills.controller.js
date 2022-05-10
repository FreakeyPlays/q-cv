import Skill from '../models/skills.model.js'; 
import asyncHandler from 'express-async-handler';

// @desc Set goals
// @route POST /api/goals
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

const getSkills = asyncHandler( async(req, res) =>{
    const skills = await Skill.find();
    res.status(200).json(skills);
});

export {
    setSkills,
    getSkills
};
