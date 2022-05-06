import express from "express";

const router = express.Router();
const skillRoute = '/';

router.route(skillRoute).get(getSkills);

module.exports = router;