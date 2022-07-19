
import {Schema, model} from "mongoose";

interface IJobType {
    name: string;
}

const jobTypeSchema = new Schema<IJobType>({
    name: String
})

const JobTypeModel = model<IJobType>('jobType', jobTypeSchema);

export {JobTypeModel}