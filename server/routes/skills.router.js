import express from "express";
import { updateSkill, getSkills, setSkills, deleteSkill } from "../controllers/skills.controller.js"

const skillRouter = express.Router();
const skillRoute = '/';

skillRouter.route(skillRoute).get(getSkills).post(setSkills);
skillRouter.route(skillRoute+":id").put(updateSkill).delete(deleteSkill);

export default skillRouter;