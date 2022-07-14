import {Schema, model} from "mongoose";


interface ICv {
    avatar: string,
    title: string;
    desc: string;
    duration: string;
}

const cvSchema = new Schema<ICv>({
    avatar: String,
    title: String,
    desc: String,
    duration: String
})

const CvModel = model<ICv>('CV', cvSchema);

export {cvSchema};