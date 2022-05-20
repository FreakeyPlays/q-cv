import express from "express";
import {createUser, deleteUser, getUsers, updateUser} from '../controllers/user.controller.js';

const userRouter = express.Router();
const userRoute = '/';

userRouter.route(userRoute).post(createUser).get(getUsers);
userRouter.route(userRoute+":id").delete(deleteUser).put(updateUser);

export default userRouter;