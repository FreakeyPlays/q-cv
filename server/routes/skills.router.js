import express from "express";
import { updateSkill, getSkills, setSkills, deleteSkill, getSkillById } from "../controllers/skills.controller.js"

const skillRouter = express.Router();
const skillRoute = '/';

skillRouter.route(skillRoute).get(getSkills).post(setSkills);
skillRouter.route(skillRoute+":id").put(updateSkill).delete(deleteSkill).get(getSkillById);

export default skillRouter;