import passport from "passport";
import {Auth, LoginCredentials} from "two-step-auth";
import nodemailer from 'nodemailer';
import {AccountModel} from "../models/account.model";
import { otpModel } from "../models/OTP";

export class AuthController {
    constructor(){

    }

    showSignUp(req, res, next){
        try{
            res.render('OTP');
        }catch(err){
            console.log(err);
        }
    }

    async loginWithOtp(email){
        try {
            const res = await Auth(email);
            console.log(res);
            console.log(res.mail);
            console.log(res.OTP);
            console.log(res.success);
        } catch (error) {
            console.log("lol");
        }
    }

    sendOTP(email,req,res){
        let OTP = Math.random();
        OTP = Math.round(OTP*1000000);

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            service : 'Gmail',

            auth: {
                user: "thanhldhe140192@fpt.edu.vn",
                pass: "Anhyeuem.123",
            }
        });
        let mailOptions = {
            to: email,
            subject: "Otp for registration is: ",
            html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + OTP + "</h1>" // html body
        };

        transporter.sendMail(mailOptions, async(error, info) => {
            if (error) {
                return console.log(error);
            }
            const newOTP = new otpModel({
                otp: OTP
            });
            await newOTP.save();

        });

    }

    checkLogin(req,res, next){
        passport.authenticate("local", (err, user) => {
            if(err){
                return next(err)
            }
            if(!user){
                return res.send("Wrong email or password")
            }
            req.login(user, () => {
                res.redirect("/cv")
            })
        })(req, res, next)
    }

    async checkOTP(req, res, next){
        let OTP = req.body.one + req.body.two + req.body.three + req.body.four + req.body.five + req.body.six;
        let otpDB = await otpModel.find().sort({time: -1});
        let emailCookie = req.cookies["email"]
        let userDB = JSON.parse(req.cookies["user"]);
        console.log(userDB);
        if(otpDB.length > 0){
            if(otpDB[0].otp === OTP){
                let user = new AccountModel(userDB);
                await user.save();
                res.cookie("user", '', {maxAge: 0})
                res.cookie('email','', {maxAge: 0});
                res.redirect("http://localhost:3000/auth/login");
            }else{
                res.render("OTP",{email: emailCookie, notice: "Please reEnter your OTP"})
            }
        }else{
            res.render("OTP",{email: emailCookie, notice: "OTP Expired"});
        }
    }
}

export default AuthController;