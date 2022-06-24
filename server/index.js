import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from "cors";

import skillRouter from "./routes/skills.router.js";
import projectRouter from "./routes/project.router.js";
import userRouter from "./routes/user.router.js";
import cvRouter from "./routes/cv.router.js";
import educationRouter from "./routes/education.router.js";
import careerRouter from "./routes/career.router.js";

dotenv.config();

const app = express();

app.use(cors());

const CONNECTION_URL = process.env.MONGO_URI;
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/skills', skillRouter);
app.use('/api/projects', projectRouter);
app.use('/api/careers', careerRouter);
app.use('/api/education', educationRouter);
app.use('/api/user', userRouter);
app.use('/api/cv', cvRouter);

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((err) => console.log(err.message));
