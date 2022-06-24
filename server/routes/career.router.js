import express from "express";
import { setCareer, deleteCareer, getCareers, getAllCareers, getCareerById, updateCareer } from "../controllers/career.controller.js"

const careerRouter = express.Router();
const careerRoute = '/';

careerRouter.route(careerRoute).get(getCareers).post(setCareer).get(getAllCareers);
careerRouter.route(careerRoute+":id").delete(deleteCareer).get(getCareerById).put(updateCareer);

export default careerRouter;