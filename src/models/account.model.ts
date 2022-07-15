import {Schema, model} from "mongoose";


interface IAccount {
    username: string;
    password: string;
    role: string;
    gmail: string;
    google: {

        id: {

            type: string,

        }
    }
}

const accountSchema = new Schema<IAccount>({
    username: {type: String, unique: true},
    password: String,
    role: String,
    gmail: {type: String, unique: true},
    google: {

        id: {

            type: String,
        }
    }
})

const AccountModel = model<IAccount>('account', accountSchema);

export {AccountModel};