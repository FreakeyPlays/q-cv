import express from "express";
import { getAllProjects, getProject, setProject } from "../controllers/project.controller.js";

const projectRouter = express.Router();
const projectRoute = '/';

projectRouter.route(projectRoute).post(setProject).get(getAllProjects);
projectRouter.route(projectRoute+":id").get(getProject);

export default projectRouter;