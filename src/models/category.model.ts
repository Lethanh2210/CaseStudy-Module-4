
import {Schema, model} from "mongoose";

interface ICategory {
   name: string;
}

const categorySchema = new Schema<ICategory>({
    name: String
})

const CategoryModel = model<ICategory>('category', categorySchema);

export {CategoryModel}