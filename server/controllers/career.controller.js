import Career from '../models/career.model.js'; 
import asyncHandler from 'express-async-handler';


const setCareer = asyncHandler( async(req, res) =>{
    const title = req.body.title;
    const company = req.body.company;
    const location = req.body.location;
    const position = req.body.position;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const jobDescription = req.body.jobDescription;

    if(!title || !company || !startDate) {
        res.status(400).json({
            ok: false,
            status: 400,
            message: "A required parameter is missing or incorrect"
        });
        throw new Error("A required parameter is missing or incorrect");
    }

    const entry = await Career.create({
        title,
        company,
        location,
        position,
        startDate,
        endDate,
        jobDescription
    })

    res.json({
        ok: true,
        status: 200,
        message: "Career entry created",
        _id: entry._id,
        career: entry
    });
});

// @desc Set skills
// @route GET /api/skills
// @access Private
const getCareers = asyncHandler( async(req, res) =>{
    const careerSet = await Career.find();
    res.status(200).json(careerSet);
});

// @desc Set skills
// @route GET /api/skills
// @access Private
const getCareerById = asyncHandler( async(req, res) =>{
    const career = await Career.findById(req.params.id);
    res.status(200).json(career);
});

const updateCareer = asyncHandler( async (req, res) => {
    const career = await Career.findByIdAndUpdate(req.params.id, req.body, {new: true});

    if(!career) {
        res
            .status(400)
            .json({
                ok: false,
                status: 400,
                message: "No Career found with ID: " + req.params.id
            });
        
        throw new Error("No Project found with ID: " + req.params.id );
    }

    res
        .status(200)
        .json({
            ok: true,
            status: 200,
            message: "Updated Career",
            career: career
        });
})

// @desc delete skills #id
// @route DELETE /api/skills
// @access Private
const deleteCareer = asyncHandler(async(req, res) => {
    const career = await Career.findById(req.params.id);
    if(!career) {
        res.status(400);
        throw new Error('Career not found')
    }
    await career.remove();
    res.status(200).json({id: req.params.id});
});

export {
    setCareer,
    getCareers,
    getCareerById,
    updateCareer,
    deleteCareer
};