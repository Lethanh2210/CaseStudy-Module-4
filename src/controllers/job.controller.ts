import {JobModel} from "../models/job.model";
import {CategoryModel} from "../models/category.model";
import {LocationModel} from "../models/location.model";


const jobController = {
    render: async (req, res, next) => {
        let query = {};
        if (req.query.jobName && req.query.jobName !== "") {
            let jobNameFind = req.query.jobName || "";
            query = {
                jobName: jobNameFind
            }
        }
        const jobs = await JobModel.find(query).populate({
            path: "category", select: "name"
        }).populate({path: "location", select: "name"});
        let categories = await CategoryModel.find();
        let locations = await LocationModel.find();
        let user = req.session.passport.user;
        // res.json(locations)
        res.render('home', {jobs: jobs, user: user,categories:categories,locations:locations});
    },
    renderJobs: async (req, res, next) => {
        const jobs = await JobModel.find().populate({
            path: "category", select: "name"
        }).populate({path: "location", select: "name"});
        console.log(jobs)
        let user = req.session.passport.user;
        res.render('jobs', {jobs: jobs, user:user})
    },
    renderUpdateJob: async (req, res, next) => {
        const updateData = await JobModel.findOne({_id: req.params.id}).lean();
        let user = req.session.passport.user;
        let categories = await CategoryModel.find();
        let locations = await LocationModel.find();
        console.log(locations);
        res.render('updateJob', {data: updateData, user: user,categories:categories,locations:locations});
    },
    renderJobDetails: async (req, res, next) => {

    },
    renderJobCreate: async (req, res, next) => {
        let user = req.session.passport.user;
        let categories = await CategoryModel.find();
        let locations = await LocationModel.find();
        res.render('createJob',{user:user,categories:categories,locations:locations})
    },
    jobCreate: async (req, res, next) => {
        try {
            const job = new JobModel({
                avatar: `/public/uploads/${req.file.filename}`,
                companyName: req.body.company,
                jobName: req.body.job,
                salary: req.body.salary,
                location: req.body ? req.body.location :"none",
                desc: req.body.desc,
                duration: req.body.duration,
                category: req.body ? req.body.category :"none"
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
    },

    applyJob:async (req, res, next) => {
        const job = await JobModel.findOne({_id: req.params.id})
        let user = req.session.passport.user;
        res.render('jobDetails',{user:user, job:job})
    },
    searchJob:async (req, res, next) => {
        const searchInput = req.body;
        console.log(searchInput)
        res.redirect('/cv/jobs')
        // res.render('jobDetails',{user:user, job: job})
    },

    writeCV:async (req, res, next) => {
        const job = await JobModel.findOne({_id: req.params.id})
        let user = req.session.passport.user;
        res.render('writeCV',{user:user, job: job})
    }
}

export default jobController;