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
    username: String,
    password: String,
    role: String,
    gmail: String,
    google: {

        id: {

            type: String,

        }
    }
})

const AccountModel = model<IAccount>('account', accountSchema);

export {AccountModel};