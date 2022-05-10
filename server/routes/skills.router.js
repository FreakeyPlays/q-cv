import express from "express";
import {    getSkills,    setSkills} from "../controllers/skills.controller.js"

const skillRouter = express.Router();
const skillRoute = '/';

skillRouter.route(skillRoute).get(getSkills).post(setSkills);

export default skillRouter;

//module.exports = skillRouter;