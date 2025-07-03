
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const MicrosoftStrategy = require('passport-microsoft').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = function (passport) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: '/api/auth/google/callback',
            },
            async (accessToken, refreshToken, profile, done) => {
                const newUser = {
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                };

                try {
                    let user = await User.findOne({ googleId: profile.id });

                    if (user) {
                        done(null, user);
                    } else {
                        // Check if user exists with this email
                        user = await User.findOne({ email: profile.emails[0].value });
                        if (user) {
                            // User exists, link googleId
                            user.googleId = profile.id;
                            await user.save();
                            done(null, user);
                        } else {
                            // Create new user
                            user = await User.create(newUser);
                            done(null, user);
                        }
                    }
                } catch (err) {
                    console.error(err);
                    done(err, null);
                }
            }
        )
    );
    const MicrosoftStrategy = require('passport-microsoft').Strategy;
const User = require('../models/User');

module.exports = function(passport) {
    passport.use(new MicrosoftStrategy({
        clientID: process.env.MICROSOFT_CLIENT_ID,
        clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
        callbackURL: "/api/auth/microsoft/callback",
        scope: ['user.read'],
    },
    async (accessToken, refreshToken, profile, done) => {
        const newUser = {
            microsoftId: profile.id,
            name: profile.displayName || profile._json.name,
            email: profile.emails[0].value
        };

        try {
            let user = await User.findOne({ microsoftId: profile.id });
            if (!user) {
                user = await User.findOne({ email: newUser.email });
                if (user) {
                    user.microsoftId = profile.id;
                    await user.save();
                } else {
                    user = await User.create(newUser);
                }
            }
            done(null, user);
        } catch (err) {
            console.error(err);
            done(err, null);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
};


    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
};
