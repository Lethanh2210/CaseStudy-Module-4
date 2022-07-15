import {JobModel} from "../models/job.model";
import {CategoryModel} from "../models/category.model";
import {Schema} from "mongoose";


const jobController = {
    render: async (req, res, next) => {
        const jobs = await JobModel.find();
        let user = req.session.passport.user;
        res.render('home',{jobs:jobs, user:user});
    },
    renderJobs: async (req, res, next) => {
        const jobs = await JobModel.find();
        res.render('jobs',{jobs:jobs})
    },
    renderJobDetails: async (req, res, next) => {

    },
    renderJobCreate: async (req, res, next) => {
        res.render('createJob')
    },
    jobCreate: async (req, res, next) => {
        try {
            const category = new CategoryModel({
                category: req.body.category
            })
            const job = new JobModel({
                avatar: req.body.avatar,
                companyName: req.body.company,
                jobName: req.body.job,
                salary: req.body.salary,
                location: req.body.location,
                desc: req.body.desc,
                duration: req.body.duration,
                category: category._id,
            })
            await job.save();
            res.send('ok')
        }catch (e) {
            console.log(e.message);
        }
    }
}

export default jobController;