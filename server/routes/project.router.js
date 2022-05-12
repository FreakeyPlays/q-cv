import express from "express";
import { getAllProjects, setProject } from "../controllers/project.controller.js";

const projectRouter = express.Router();
const projectRoute = '/';

projectRouter.route(projectRoute).post(setProject).get(getAllProjects);

export default projectRouter;