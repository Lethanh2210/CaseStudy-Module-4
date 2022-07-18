import {Schema, model} from "mongoose";


interface IJob {
    avatar: string,
    companyName: string;
    jobName: string;
    salary: number;
    location: object;
    desc: string;
    duration: string;
    category: object;
}

const jobSchema = new Schema<IJob>({
    avatar: String,
    companyName: String,
    jobName: String,
    salary: Number,
    location: {type: Schema.Types.ObjectId,ref: "location"},
    desc: String,
    duration: String,
    category: {type: Schema.Types.ObjectId,ref: "category"},}
)

export const JobModel = model<IJob>('job', jobSchema);

export {jobSchema};