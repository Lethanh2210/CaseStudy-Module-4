
import {Schema, model} from "mongoose";


const vacancySchema = new Schema({
    name: String
})

const VacancyModel = model('vacancy', vacancySchema);

export {VacancyModel}