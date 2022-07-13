import {Schema, model} from "mongoose";


interface IAccount {
    username: string;
    password: string;
    role: string;
}

const accountSchema = new Schema<IAccount>({
    username: String,
    password: String,
    role: String
})

const AccountModel = model<IAccount>('account', accountSchema);

export {AccountModel};