import {Schema, model} from "mongoose";


const otpSchema = new Schema({
    email: String,
    otp: String,
    time: {
        type: Date,
        default: Date.now,
        index: {expires: 20}
    }
})

const otpModel = model('otp', otpSchema);

export {otpModel};