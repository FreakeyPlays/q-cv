import express from "express";
import {createUser, deleteUser, getUser, getUsers, updateUser} from '../controllers/user.controller.js';

const userRouter = express.Router();
const userRoute = '/';

userRouter.route(userRoute).post(createUser).get(getUsers);
userRouter.route(userRoute+":id").delete(deleteUser).put(updateUser).get(getUser);

export default userRouter;