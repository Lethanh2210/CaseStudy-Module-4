import express from "express";
import cvController from "../controllers/cv.controller"

const router = express.Router();

router.get('/',cvController.render);
router.get('/jobs',cvController.renderJobs);


export default router;