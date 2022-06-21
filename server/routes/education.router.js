import express from "express";
import { setEducation, getAllEducations, getEducation, updateEducation, deleteEducation } from "../controllers/education.controller.js";

const educationRouter = express.Router();
const educationRoute = '/';

educationRouter.route(educationRoute).post(setEducation).get(getAllEducations);
educationRouter.route(educationRoute+":id").get(getEducation).put(updateEducation).delete(deleteEducation);

export default educationRouter;