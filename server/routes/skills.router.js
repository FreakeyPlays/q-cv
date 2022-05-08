import express from "express";

const skillRouter = express.Router();
const skillRoute = '/';

skillRouter.route(skillRoute).get(getSkills);

module.exports = skillRouter;