import {JobModel} from "../models/job.model";
import {CategoryModel} from "../models/category.model";
import {Schema} from "mongoose";
import multer from "multer";

const upload = require('../middlewares/upload.middleware')
import path from "path";
import * as fs from "fs";


const jobController = {
    render: async (req, res, next) => {
        const jobs = await JobModel.find();

        let user = req.session.passport.user;
        res.render('home', {jobs: jobs, user: user});
    },
    renderJobs: async (req, res, next) => {
        const jobs = await JobModel.find();
        let user = req.session.passport.user;
        res.render('jobs', {jobs: jobs, user:user})
    },
    renderUpdateJob: async (req, res, next) => {
        const updateData = await JobModel.findOne({_id: req.params.id}).lean();
        res.render('updateJob', {data: updateData});
    },
    renderJobDetails: async (req, res, next) => {

    },
    renderJobCreate: async (req, res, next) => {
        let user = req.session.passport.user;
        res.render('createJob',{user:user})
    },
    jobCreate: async (req, res, next) => {
        try {
            const category = new CategoryModel({
                category: req.body.category
            })
            const job = new JobModel({
                avatar: `/public/uploads/${req.file.filename}`,
                companyName: req.body.company,
                jobName: req.body.job,
                salary: req.body.salary,
                location: req.body.location,
                desc: req.body.desc,
                duration: req.body.duration,
                category: category._id,
            })
            await job.save();
            res.redirect('/cv')
        } catch (e) {
            console.log(e.message);
        }
    },
    updateJob: async (req, res, next) => {
        try {
            const {companyName,jobName,salary,location,desc,duration,category} = req.body;
            console.log(req.params.id)
            const data = await JobModel.findOneAndUpdate({_id: req.params.id},{companyName,jobName,salary,location,desc,duration,category});
            res.redirect('/cv/jobs')
        }catch (e) {
            console.log(e.message);
        }
    },
    deleteJob:async (req, res,next) => {
        await JobModel.findOneAndRemove({_id: req.params.id}).lean();
        res.redirect('/cv/jobs');
    }
}

export default jobController;