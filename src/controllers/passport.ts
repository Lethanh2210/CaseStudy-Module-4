import passport from "passport"

import { AccountModel } from '../models/account.model'

// import LocalStrategy from 'passport-local';
import LocalStrategy from 'passport-local';

import GoogleStrategy from 'passport-google-oauth20';



passport.serializeUser((user, done) => {

    done(null, user)

})



passport.deserializeUser(function (user, done) {

    done(null, user);

});



// @ts-ignore
passport.use('local', new LocalStrategy(async (username, password, done) => {
    const user = await AccountModel.findOne({ username: username });
    if (!user) {

        return done(null, false);

    } else {

        if (user.password === password) {

            return done(null, user);

        } else {

            return done(null, false);

        }

    }

}));

// @ts-ignore
passport.use(new GoogleStrategy({

        clientID: "1039469355921-dmdkk12cekfue6tk1j3qdvc2o0oks8s6.apps.googleusercontent.com",

        clientSecret: "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",

        callbackURL: "http://localhost:3000/auth/google/callback",

        passReqToCallback: true

    },

    async (request, accessToken, refreshToken, profile, done) => {

        try {


            let existingUser = await AccountModel.findOne({ 'google.id': profile.id });

            // if user exists return the user

            if (existingUser) {

                return done(null, existingUser);

            }

            // if user does not exist create a new user


            const newUser = new AccountModel({

                google: {

                    id: profile.id,

                },

                username: profile.emails[0].value,

                password: null

            });

            await newUser.save();
            return done(null, newUser);

        } catch (error) {

            return done(null, false)

        }

    }

));



export default passport;