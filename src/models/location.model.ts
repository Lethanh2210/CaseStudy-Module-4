
import {Schema, model} from "mongoose";

interface ILocation {
    name: string;
}

const locationSchema = new Schema<ILocation>({
    name: String
})

const LocationModel = model<ILocation>('location', locationSchema);

export {LocationModel}