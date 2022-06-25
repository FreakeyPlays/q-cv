import express from "express";
import { getAllProjects, getAllUserProjects, getProject, setProject, deleteProject, updateProject } from "../controllers/project.controller.js";

const projectRouter = express.Router();
const projectRoute = '/';

projectRouter.route(projectRoute).post(setProject).get(getAllProjects);
projectRouter.route(projectRoute+"all/:id").get(getAllUserProjects);
projectRouter.route(projectRoute+":id").get(getProject).put(updateProject).delete(deleteProject);

export default projectRouter;