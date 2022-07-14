import {Schema, model} from "mongoose";


interface IJob {
    avatar: string,
    name: string;
    title: string;
    salary: number;
    location: string;
    desc: string;
    duration: string; //thoi han
}

const jobSchema = new Schema<IJob>({
    avatar: String,
    name: String,
    title: String,
    salary: Number,
    location: String,
    desc: String,
    duration: String
})

export const CvModel = model<IJob>('account', jobSchema);

export {jobSchema};