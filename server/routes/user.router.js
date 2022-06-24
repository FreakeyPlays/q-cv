import express from "express";
import {createUser, delCareer, delEducation, deleteUser, delProject, delSkill, getUser, getUsers, setCareer, setEducation, setProject, setSkill, updateUser} from '../controllers/user.controller.js';

const userRouter = express.Router();
const userRoute = '/';

userRouter.route(userRoute).post(createUser).get(getUsers);
userRouter.route(userRoute+":id").delete(deleteUser).put(updateUser).get(getUser);
userRouter.route(userRoute+":id/eID:educationID").put(setEducation).delete(delEducation);
userRouter.route(userRoute+":id/sID:skillID").put(setSkill).delete(delSkill);
userRouter.route(userRoute+":id/cID:careerID").put(setCareer).delete(delCareer);
userRouter.route(userRoute+":id/pID:projectID").put(setProject).delete(delProject);

export default userRouter;