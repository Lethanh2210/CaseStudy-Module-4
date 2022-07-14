import express from "express";

const router = express.Router();

import passport from "passport";
import AuthCtrl from "../controllers/auth.controller"

import multer from 'multer';

const upload = multer();
const authCtrl =  new AuthCtrl();


router.get("/login", (req, res) => {

    res.render("login");

});

router.get('/login/google', passport.authenticate('google', {scope: ['profile', 'email']}));


router.get(

    "/google/callback",

    passport.authenticate('google'),

    (req, res) => {

        res.redirect('http://localhost:3000/cv')

    }

);

router.get('/register',(req,res) => {
    res.render("register");
})

router.get('/OTP', (req, res) => {
    res.render("OTP")
})



router.post('/login', upload.none(), (req, res, next) => {
    passport.authenticate("local", (err, user) => {
        if(err){
            return next(err)
        }
        if(!user){
            return res.send("Wrong email or password")
        }
        req.login(user, () => {
            res.redirect("http://localhost:3000/cv")
        })
    })(req, res, next)

})

router.get("/logout", (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/auth/login');
    });
});

router.get('/register', upload.none(), (req, res, next) => {
    authCtrl.showSignUp(req, res, next);
})

router.post('/register', upload.none(), async(req, res, next) =>{
    const user = {
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
        gmail: req.body.email
    }
    res.cookie("user", JSON.stringify(user));
    await authCtrl.sendOTP(req.body.email,req,res);
    res.cookie("email", String(req.body.email));
    res.render('OTP', {email: req.body.email, notice: ""});
})

router.post("/OTP", upload.none(), async(req, res, next) => {
    if(!req.body.one){
        const user = {
            username: req.body.username,
            password: req.body.password,
            role: req.body.role,
            gmail: req.body.email
        }
        res.cookie("user", JSON.stringify(user));
        await authCtrl.sendOTP(req.body.email,req,res);
        res.cookie("email", String(req.body.email));
        res.render('OTP', {email: req.body.email, notice: ""});
    }else{
        await authCtrl.checkOTP(req,res,next);
    }
})

router.get("/OTP/resend", async (req, res, next) => {
    let emailCurrent = req.cookies["email"];
    await authCtrl.sendOTP(emailCurrent,req,res);
    res.render('OTP', {email: emailCurrent, notice: ""});
})



export default router;