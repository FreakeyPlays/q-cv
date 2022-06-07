import express from "express";
import { setCv, deleteCV } from "../controllers/cv.controller";

const cvRouter = express.Router();
const cvRoute = '/';

cvRouter.route(cvRoute).post(setCv);
cvRouter.route(cvRoute+":id").delete(deleteCV);

export default cvRouter;