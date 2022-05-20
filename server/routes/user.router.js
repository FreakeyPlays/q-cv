import express from "express";
import {createUser, deleteUser, getUsers} from '../controllers/user.controller.js';

const userRouter = express.Router();
const userRoute = '/';

userRouter.route(userRoute).post(createUser).get(getUsers);
userRouter.route(userRoute+":id").delete(deleteUser);

export default userRouter;