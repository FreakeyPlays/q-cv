import express from "express";
import {createUser} from '../controllers/user.controller.js';

const userRouter = express.Router();
const userRoute = '/';

userRouter.route(userRoute).post(createUser);

export default userRouter;