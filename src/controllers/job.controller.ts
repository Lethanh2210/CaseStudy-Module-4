import {JobModel} from "../models/job.model";
import {CategoryModel} from "../models/category.model";
import {LocationModel} from "../models/location.model";
import {VacancyModel} from "../models/vacancy.model";
import AuthCtrl from "../controllers/auth.controller"

import {JobTypeModel} from "../models/jobType";


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
        res.render('home', {jobs: jobs, user: user, categories: categories, locations: locations});
    },
    renderJobs: async (req, res, next) => {
        let currentPage = 1
        let offset = 0;
        if (req.query.page){
            currentPage = req.query.page
            offset = (currentPage - 1) * 9
        }
        const jobs = await JobModel.find().populate({
            path: "category", select: "name"
        }).populate({path: "location", select: "name"})
            .populate({path: "jobType", select: "name"})
        const categories = await CategoryModel.find();
        const jobTypes = await JobTypeModel.find();
        const locations = await LocationModel.find();
        let user = req.session.passport.user;
        res.render('jobs', {jobs: jobs, user: user, categories: categories, jobTypes: jobTypes, locations: locations,currentPage: currentPage});
    },
    renderUpdateJob: async (req, res, next) => {
        const updateData = await JobModel.findOne({_id: req.params.id}).populate({path: "vacancy", select: "name"});
        let user = req.session.passport.user;
        let categories = await CategoryModel.find();
        let locations = await LocationModel.find();
        let type = await JobTypeModel.find();
        res.render('updateJob', {data: updateData, user: user, categories: categories, locations: locations,jobTypes:type});
    },
    renderJobDetails: async (req, res, next) => {

    },
    renderJobCreate: async (req, res, next) => {
        let user = req.session.passport.user;
        let categories = await CategoryModel.find();
        let locations = await LocationModel.find();
        let jobTypes = await JobTypeModel.find();
        res.render('createJob', {user: user, categories: categories, locations: locations, jobTypes: jobTypes})
    },
    jobCreate: async (req, res, next) => {
        try {
            const job = new JobModel({
                avatar: `/public/uploads/${req.file.filename}`,
                companyName: req.body.company,
                jobName: req.body.job,
                salary: req.body.salary,
                location: req.body ? req.body.location : "none",
                desc: req.body.desc,
                duration: req.body.duration,
                category: req.body ? req.body.category : "none",
                jobType: req.body ? req.body.type : "none",
                vacancy: req.body.vacancy,
            })
            await job.save();
            res.redirect('/cv')
        } catch (e) {
            console.log(e.message);
        }
    },
    updateJob: async (req, res, next) => {
        try {
            const job = await JobModel.findOne({_id: req.params.id})
                .populate({
                    path: "category", select: "name"
                }).populate({path: "location", select: "name"})
                .populate({path: "jobType", select: "name"}).populate({path: "vacancy", select: "name"});

            job.companyName = req.body.company;
            job.jobName = req.body.job;
            job.salary = req.body.salary;
            job.location = req.body.location;
            job.desc = req.body.desc;
            job.duration = req.body.duration;
            job.category = req.body.category;
            job.jobType = req.body.type;
            job.vacancy = req.body.vacancy;
            await job.save()
            res.redirect('/cv/jobs')
        } catch (e) {
            console.log(e.message);
        }
    },
    deleteJob: async (req, res, next) => {
        await JobModel.findOneAndRemove({_id: req.params.id}).lean();
        res.redirect('/cv/jobs');
    },

    applyJob: async (req, res, next) => {
        const job = await JobModel.findOne({_id: req.params.id})
            .populate({
                path: "category", select: "name"
            }).populate({path: "location", select: "name"})
            .populate({path: "jobType", select: "name"})
        let user = req.session.passport.user;
        res.render('jobDetails', {job: job, user: user})
    },
    searchJob: async (req, res, next) => {
        const searchInput = req.body;
        let jobByName = [];
        console.log(jobByName)
        let jobByCompany = [];
        const regex = new RegExp(escapeRegex(searchInput.searchJobs), 'gi');
        if (searchInput.searchJobs === '') {
            jobByName = await JobModel.find({location: searchInput.location}).populate({
                path: "category", select: "name"
            }).populate({path: "location", select: "name"});
            jobByCompany = await JobModel.find({
                companyName: regex,
                location: searchInput.location
            }).populate({
                path: "category", select: "name"
            }).populate({path: "location", select: "name"});
        } else {
            jobByName = await JobModel.find({
                jobName: regex,
                location: searchInput.location
            }).populate({
                path: "category", select: "name"
            }).populate({path: "location", select: "name"});
            jobByCompany = await JobModel.find({
                companyName: regex,
                location: searchInput.location
            }).populate({
                path: "category", select: "name"
            }).populate({path: "location", select: "name"});
        }
        jobByCompany.forEach(job => {
            jobByName.push(job);
        })
        let user = req.session.passport.user;
        let categories = await CategoryModel.find();
        let locations = await LocationModel.find();
        res.render('home', {jobs: jobByName, user: user, categories: categories, locations: locations})
    },

    writeCV: async (req, res, next) => {
        const job = await JobModel.findOne({_id: req.params.id})
        let user = req.session.passport.user;
        res.render('writeCV', {user: user, job: job})
    },
    searchCategory: async (req, res, next) => {
        const jobs = await JobModel.find({category: req.query.select}).populate({path:"location",select:"name"});
        const categories = await CategoryModel.find();
        const jobTypes = await JobTypeModel.find();
        const locations = await LocationModel.find();
        let user = req.session.passport.user;
        res.render('jobs', {jobs: jobs, user: user,locations:locations, categories: categories, jobTypes: jobTypes})
    },
    searchJobTypes: async (req, res, next) => {
        console.log(req.query)
        const jobs = await JobModel.find({jobType: req.query.select}).populate({path:"location",select:"name"});
        console.log(jobs)
        const categories = await CategoryModel.find();
        const jobTypes = await JobTypeModel.find();
        const locations = await LocationModel.find();
        let user = req.session.passport.user;
        res.render('jobs', {jobs: jobs, user: user,locations: locations, categories: categories, jobTypes: jobTypes})
    },
    searchJLocations: async (req, res, next) => {
        console.log(req.query)
        const jobs = await JobModel.find({location: req.query.select}).populate({path:"location",select:"name"});
        console.log(jobs)
        const categories = await CategoryModel.find();
        const jobTypes = await JobTypeModel.find();
        const locations = await LocationModel.find();
        let user = req.session.passport.user;
        res.render('jobs', {jobs: jobs, user: user, locations: locations,categories: categories, jobTypes: jobTypes})
    },

    sendCV: async (req, res, next) => {
        const jobs = await JobModel.find().populate({
            path: "category", select: "name"
        }).populate({path: "location", select: "name"});
        let user = req.session.passport.user;
        let categories = await CategoryModel.find();
        let locations = await LocationModel.find();
        res.render('jobs', {jobs: jobs, user: user, locations: locations, categories: categories})
    },

    acceptCV: async (req, res, next) => {
        const authCtrl = new AuthCtrl();
        await authCtrl.sendOTP(req.params.id, req, res);
        res.redirect('/cv/jobs');
    },
    pagination: async (req, res, next) => {
        let perPage = 1;
        let page = req.params.page || 1;
        const categories = await CategoryModel.find();
        const jobTypes = await JobTypeModel.find();
        const locations = await LocationModel.find();
        let user = req.session.passport.user;

        await JobModel
            .find()
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec(async (err, jobs) => {
                await JobModel.countDocuments((err, count) => {
                    if (err) return next(err);
                    res.render('jobs',{jobs,current: page, pages: Math.ceil(count / perPage),user: user, categories: categories, jobTypes: jobTypes, locations: locations})
                });
            });
    }
}
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

export default jobController;