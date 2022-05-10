import express from "express";
import { updateSkills, getSkills, setSkills } from "../controllers/skills.controller.js"

const skillRouter = express.Router();
const skillRoute = '/';

skillRouter.route(skillRoute).get(getSkills).post(setSkills);
skillRouter.route(skillRoute+":id").put(updateSkills);

export default skillRouter;

//module.exports = skillRouter;