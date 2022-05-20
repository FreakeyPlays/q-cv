import User from '../models/user.model.js';
import asyncHandler from 'express-async-handler';

const createUser = asyncHandler( async(req,res) =>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const eMail = req.body.eMail;
    const password = req.body.password;
    const isAdmin = req.body.isAdmin;

    //check if any Parameter is missing
    if(!firstName || !lastName || !eMail || !password){
        res.status(400).json({
            ok: false,
            status: 400,
            message:"A required parameter is missing or incorrect"
        });
        throw new Error("A required parameter is missing or incorrect");
    }

    const newUser = await User.create({
        firstName, lastName, eMail, password, isAdmin
    })

    res.json({
        ok: true,
        status: 200,
        message: "User created, Admin: " + isAdmin,


    })
});

const getUsers = asyncHandler( async(req,res) =>{
    const user = await User.find();

    res.status(200).json({
        ok:true,
        status: 200,
        message:"Returned all Users",
        user
    })
});

const deleteUser = asyncHandler( async(req,res) =>{
    const delUser = await User.findById(req.params.id); // Hier stimmt was nicht :(

    if(!delUser){
        res.status(400).json({
            ok:false,
            status:400,
            message:"No User found with ID: " + req.params.id
        });
        throw new Error("No User found with ID: " + req.params.id);
    }

    await delUser.remove();
    res.status(200).json({
        ok:true,
        status: 200,
        message: "Succesfull deleted User",
        delUser
    });
});


export{
    createUser,
    getUsers,
    deleteUser
};