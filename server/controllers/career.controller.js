import Skill from '../models/career.model.js'; 
import asyncHandler from 'express-async-handler';


// @desc Set skills
// @route GET /api/skills
// @access Private
const getCareers = asyncHandler( async(req, res) =>{
    const careerSet = await Skill.find();
    res.status(200).json(careerSet);
});

// @desc Set skills
// @route GET /api/skills
// @access Private
const getCareerById = asyncHandler( async(req, res) =>{
    const career = await findById(req.params.id);
    res.status(200).json(career);
});

// @desc delete skills #id
// @route DELETE /api/skills
// @access Private
const deleteCareer = asyncHandler(async(req, res) => {
    const career = await Skill.findById(req.params.id);
    if(!career) {
        res.status(400);
        throw new Error('Career not found')
    }
    await career.remove();
    res.status(200).json({id: req.params.id});
});

export {
    getCareers,
    getCareerById,
    deleteCareer
};
