import {JobModel} from "../models/job.model";
import {CategoryModel} from "../models/category.model";
import {LocationModel} from "../models/location.model";
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
        fuck({},req,res).catch(err => {
            console.log(err)})
    },
    renderUpdateJob: async (req, res, next) => {
        const updateData = await JobModel.findOne({_id: req.params.id}).populate({path: "vacancy", select: "name"});
        let user = req.session.passport.user;
        let categories = await CategoryModel.find();
        let locations = await LocationModel.find();
        let type = await JobTypeModel.find();
        res.render('updateJob', {
            data: updateData,
            user: user,
            categories: categories,
            locations: locations,
            jobTypes: type
        });
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
        fuck({category: req.query.select},req,res).catch(e=>{
            console.log(e)
        })
    },
    searchJobTypes: async (req, res, next) => {
        fuck({jobType: req.query.select},req,res).catch(e=>{
            console.log(e.message)
        })
    },
    searchJLocations: async (req, res, next) => {
        fuck({location: req.query.select},req,res).catch(err =>{
            console.log(err.message)});
    },
    sendCV: async (req, res, next) => {
        const jobs = await JobModel.find().populate({
            path: "category", select: "name"
        }).populate({path: "location", select: "name"}).populate({path: "jobType", select: "name"});
        res.redirect('/cv/jobs')
    },
    acceptCV: async (req, res, next) => {
        const authCtrl = new AuthCtrl();
        let mail = {
            email: req.query.email,
            company: req.query.companyName
        }
        await authCtrl.sendMail(mail, req, res);
        res.redirect('/cv');
    },
    renderHome: async (req, res, next) => {
        try{
            console.log('fuck')
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
            res.render('homePage', {jobs: jobs, categories: categories, locations: locations});
        }catch (err) {
            console.log(err);
        }

    }
}
async function fuck(condition:any , req, res) {
    let offset:number;
    const limit: number = 3;
    let currentPage = req.query.page
    offset = (currentPage - 1) * limit
    const count = await JobModel.count(condition);
    const jobs = await JobModel.find(condition).limit(limit).skip(offset).populate({
        path: "category", select: "name"
    }).populate({path: "location", select: "name"})
        .populate({path: "jobType", select: "name"})
    const categories = await CategoryModel.find();
    const pages = Math.ceil(count/limit)
    const jobTypes = await JobTypeModel.find();
    const locations = await LocationModel.find();
    let user = req.session.passport.user;
    res.render('jobs', {
        currentPage: currentPage,
        pages: pages,
        jobs: jobs,
        user: user,
        categories: categories,
        jobTypes: jobTypes,
        locations: locations
    });
}
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

export default jobController;