import {JobModel} from "../models/cv.model";


const cvController = {
    render: (req, res, next) => {
        res.render('home');
    },
    renderJobs: (req, res, next) => {
        res.render('jobs')
    }
}

export default cvController;