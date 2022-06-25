import express from "express";
import { setCv, deleteCV, getCVById, getCVs, updateCV } from "../controllers/cv.controller.js";

const cvRouter = express.Router();
const cvRoute = '/';

cvRouter.route(cvRoute).post(setCv).get(getCVs);
cvRouter.route(cvRoute+":id").put(updateCV).get(getCVById).delete(deleteCV);

export default cvRouter;