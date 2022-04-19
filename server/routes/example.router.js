import express from "express";
const router = express.Router();

import { example } from "../controllers/example.controller.js";

router.post("/example", example);

export default router;