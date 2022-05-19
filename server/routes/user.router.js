import express from "express";
import {createUser, getUsers} from '../controllers/user.controller.js';

const userRouter = express.Router();
const userRoute = '/';

userRouter.route(userRoute).post(createUser).get(getUsers);

export default userRouter;