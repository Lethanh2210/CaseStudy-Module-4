import express from "express";
import jobController from "../controllers/job.controller"

const router = express.Router();

router.get('/',jobController.render);
router.get('/jobs',jobController.renderJobs);
router.get('/createJob',jobController.renderJobCreate);
router.post('/createJob',jobController.jobCreate);

export default router;