import express from "express";
import jobController from "../controllers/job.controller"
import multer from 'multer';
import path from "path";

const storage = multer.diskStorage({
    //destination for files
    destination: function (request, file, callback) {
        callback(null, path.join(__dirname,'../../../src/public', '/uploads'));
    },
    //add back the extension
    filename: function (request, file, callback) {
        callback(null, Date.now() + file.originalname);
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 3,
    },
});


const router = express.Router();

router.get('/',jobController.render);
router.get('/jobs',jobController.renderJobs);
router.get('/createJob',jobController.renderJobCreate);
router.post('/createJob',upload.single('image'),jobController.jobCreate);
router.get('/updateJob/:id',jobController.renderUpdateJob);
router.post('/updateJob/:id',jobController.updateJob);
router.get('/deleteJob/:id',jobController.deleteJob);
router.get('/apply/:id',jobController.applyJob);
router.get('/writeCV/:id',jobController.writeCV);

export default router;