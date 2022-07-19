import {JobModel} from "../models/job.model";
import {CategoryModel} from "../models/category.model";
import {LocationModel} from "../models/location.model";
import AuthCtrl from "../controllers/auth.controller"



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
        let user = req.session.passport.user;
        let categories = await CategoryModel.find();
        let locations = await LocationModel.find();
        res.render('jobs', {jobs: jobs, user:user, categories:categories,locations:locations})
    },
    renderUpdateJob: async (req, res, next) => {
        const updateData = await JobModel.findOne({_id: req.params.id}).lean();
        let user = req.session.passport.user;
        let categories = await CategoryModel.find();
        let locations = await LocationModel.find();
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
        const job = await JobModel.findOne({_id: req.params.id}).populate({
            path: "category", select: "name"
        }).populate({path: "location", select: "name"});
        let user = req.session.passport.user;
        res.render('jobDetails',{job:job,user:user})
    },
    searchJob:async (req, res, next) => {
        const searchInput = req.body;
        let jobByName = [];
        let jobByCompany = [];
        if(searchInput.searchJobs === ''){
            jobByName = await JobModel.find({location: searchInput.location}).populate({
                path: "category", select: "name"
            }).populate({path: "location", select: "name"});
            jobByCompany = await JobModel.find({companyName: searchInput.searchJobs, location: searchInput.location}).populate({
                path: "category", select: "name"
            }).populate({path: "location", select: "name"});
        }else{
            jobByName = await JobModel.find({jobName: searchInput.searchJobs, location: searchInput.location}).populate({
                path: "category", select: "name"
            }).populate({path: "location", select: "name"});
            jobByCompany = await JobModel.find({companyName: searchInput.searchJobs, location: searchInput.location}).populate({
                path: "category", select: "name"
            }).populate({path: "location", select: "name"});
        }
        jobByCompany.forEach(job => {
            jobByName.push(job);
        })
        let user = req.session.passport.user;
        console.log(jobByName);
        let categories = await CategoryModel.find();
        let locations = await LocationModel.find();
        res.render('home', {jobs: jobByName, user: user,categories:categories,locations:locations })
    },

    writeCV:async (req, res, next) => {
        const job = await JobModel.findOne({_id: req.params.id})
        let user = req.session.passport.user;
        res.render('writeCV',{user:user, job: job})
    },

    sendCV:async (req, res, next) => {
        const jobs = await JobModel.find().populate({
            path: "category", select: "name"
        }).populate({path: "location", select: "name"});
        let user = req.session.passport.user;
        let categories = await CategoryModel.find();
        let locations = await LocationModel.find();
        res.render('jobs', {jobs: jobs, user:user,locations:locations,categories:categories})
    },

    acceptCV: async (req, res, next) =>{
        const authCtrl =  new AuthCtrl();
        await authCtrl.sendOTP(req.params.id,req,res);
        res.redirect('/cv/jobs');
    }

}

export default jobController;