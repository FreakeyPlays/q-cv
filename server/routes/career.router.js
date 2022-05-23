import express from "express";
import { deleteCareer, getCareers, getCareerById } from "../controllers/career.controller.js"

const careerRouter = express.Router();
const careerRoute = '/';

careerRouter.route(careerRoute).get(getCareers);
careerRouter.route(careerRoute+":id").delete(deleteCareer).get(getCareerById);

export default careerRouter;