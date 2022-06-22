import User from '../models/user.model.js';
import asyncHandler from 'express-async-handler';

const createUser = asyncHandler( async(req,res) =>{
    //gets data from request
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const eMail = req.body.eMail;
    const password = req.body.password;
    const isAdmin = req.body.isAdmin;

    //check if any Parameter is missing
    if(!firstName || !lastName || !eMail || !password){
        res.status(400).json({ //response error message
            ok: false,
            status: 400,
            message:"A required parameter is missing or incorrect"
        });
        throw new Error("A required parameter is missing or incorrect");
    }

    //create the new User
    const newUser = await User.create({
        firstName, lastName, eMail, password, isAdmin
    })

    //response message
    res.json({
        ok: true,
        status: 200,
        message: "User created, Admin: " + isAdmin,

    })
});

//function for returning all users without any parameter
const getUsers = asyncHandler( async(req,res) =>{
    const user = await User.find();

    res.status(200).json({
        ok:true,
        status: 200,
        message:"Returned all Users",
        user
    })
});

//get user with id 
const getUser = asyncHandler( async(req,res) =>{
    const user = await User.findById(req.params.id);

    if(!user){
        res.status(400).json({
            ok:false,
            status: 400,
            message:"Could not find User with ID:" +req.params.id
        });
        throw new Error("Could not find User with ID:" +req.params.id);
    }

    res.status(200).json({
        ok: true,
        status: 200,
        message: "Returned User",
        user
    });
})

//function for delete --> gets userid within the url ../user/{id}
const deleteUser = asyncHandler( async(req,res) =>{
    const delUser = await User.findById(req.params.id);

    if(!delUser){ //if user with id doesnt exist --> error response message
        res.status(400).json({
            ok:false,
            status:400,
            message:"No User found with ID: " + req.params.id
        });
        throw new Error("No User found with ID: " + req.params.id);
    }

    //delete user with response message
    await delUser.remove();
    res.status(200).json({
        ok:true,
        status: 200,
        message: "Succesfull deleted User",
        delUser
    });
});

//update user with nearly same procedure like delete
const updateUser = asyncHandler( async(req,res) =>{
    const updUser = await User.findByIdAndUpdate(req.params.id, req.body, {new:true});

    if(!updUser){
        res.status(400).json({
            ok: false,
            status: 400,
            message: "No User found for update with ID: " +req.params.id
        });
        throw new Error("No User found for update with ID: " +req.params.id);
    }

    res.status(200).json({
        ok:true,
        status: 200,
        message: "Updated User",
        updUser
    });
})

//set an new Education ID inside User Array
const setEducation = asyncHandler( async(req,res) =>{
    const user = await User.findById(req.params.id,);
    user.education.push(req.params.educationID);

    const updated = await User.findByIdAndUpdate(user.id, user, {new:true});

    if(!updated){
        res.status(400).json({
            ok: false,
            status: 400,
            message: "No User found for update with ID: " +user.id
        });
        throw new Error("No User found for update with ID: " +user.id);
    }

    res.status(200).json({
        ok:true,
        status: 200,
        message: "Added Education",
        updated
    });
})

const delEducation = asyncHandler( async(req,res) =>{
    const user = await User.findById(req.params.id,);
    var index = user.education.indexOf(req.params.educationID);
    user.education.splice(index,1);

    const updated = await User.findByIdAndUpdate(user.id, user, {new:true});

    if(!updated){
        res.status(400).json({
            ok: false,
            status: 400,
            message: "No User found for update with ID: " +user.id
        });
        throw new Error("No User found for update with ID: " +user.id);
    }

    res.status(200).json({
        ok:true,
        status: 200,
        message: "Deleted Education",
        updated
    });
})

const setSkill = asyncHandler( async(req,res) =>{
    const user = await User.findById(req.params.id,);
    user.skills.push(req.params.skillID);

    const updated = await User.findByIdAndUpdate(user.id, user, {new:true});

    if(!updated){
        res.status(400).json({
            ok: false,
            status: 400,
            message: "No User found for update with ID: " +user.id
        });
        throw new Error("No User found for update with ID: " +user.id);
    }

    res.status(200).json({
        ok:true,
        status: 200,
        message: "Added Skill",
        updated
    });
})

const delSkill = asyncHandler( async(req,res) =>{
    const user = await User.findById(req.params.id);
    var index = user.skills.indexOf(req.params.skillID);
    user.skills.splice(index,1);

    const updated = await User.findByIdAndUpdate(user.id, user, {new:true});

    if(!updated){
        res.status(400).json({
            ok: false,
            status: 400,
            message: "No User found for update with ID: " +user.id
        });
        throw new Error("No User found for update with ID: " +user.id);
    }

    res.status(200).json({
        ok:true,
        status: 200,
        message: "Deleted Skill",
        updated
    });
})

const setCareer = asyncHandler( async(req,res) =>{
    const user = await User.findById(req.params.id,);
    user.career.push(req.params.careerID);

    const updated = await User.findByIdAndUpdate(user.id, user, {new:true});

    if(!updated){
        res.status(400).json({
            ok: false,
            status: 400,
            message: "No User found for update with ID: " +user.id
        });
        throw new Error("No User found for update with ID: " +user.id);
    }

    res.status(200).json({
        ok:true,
        status: 200,
        message: "Added Career",
        updated
    });
})

const delCareer = asyncHandler( async(req,res) =>{
    const user = await User.findById(req.params.id);
    var index = user.career.indexOf(req.params.careerID);
    user.career.splice(index,1);

    const updated = await User.findByIdAndUpdate(user.id, user, {new:true});

    if(!updated){
        res.status(400).json({
            ok: false,
            status: 400,
            message: "No User found for update with ID: " +user.id
        });
        throw new Error("No User found for update with ID: " +user.id);
    }

    res.status(200).json({
        ok:true,
        status: 200,
        message: "Deleted Career",
        updated
    });
})

const setProject = asyncHandler( async(req,res) =>{
    const user = await User.findById(req.params.id);
    user.projects.push(req.params.projectID);

    const updated = await User.findByIdAndUpdate(user.id, user, {new:true});

    if(!updated){
        res.status(400).json({
            ok: false,
            status: 400,
            message: "No User found for update with ID: " +user.id
        });
        throw new Error("No User found for update with ID: " +user.id);
    }

    res.status(200).json({
        ok:true,
        status: 200,
        message: "Added Project",
        updated
    });
})

const delProject = asyncHandler( async(req,res) =>{
    const user = await User.findById(req.params.id);
    var index = user.projects.indexOf(req.params.projectID);
    user.projects.splice(index,1);

    const updated = await User.findByIdAndUpdate(user.id, user, {new:true});

    if(!updated){
        res.status(400).json({
            ok: false,
            status: 400,
            message: "No User found for update with ID: " +user.id
        });
        throw new Error("No User found for update with ID: " +user.id);
    }

    res.status(200).json({
        ok:true,
        status: 200,
        message: "Deleted Project",
        updated
    });
})

export{
    createUser,
    getUsers,
    deleteUser,
    updateUser,
    getUser,
    setEducation,
    delEducation,
    setSkill,
    delSkill,
    setCareer,
    delCareer,
    setProject,
    delProject
};