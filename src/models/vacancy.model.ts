
import {Schema, model} from "mongoose";


const vacancySchema = new Schema({
    name: String
})

const vacancyModel = model('vacancy', vacancySchema);

export {vacancyModel}