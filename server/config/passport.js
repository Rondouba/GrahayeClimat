const GoogleStrategy = require('passport-google-oauth20').Strategy;
const MicrosoftStrategy = require('passport-microsoft').Strategy;
const AppleStrategy = require('passport-apple');
const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = function (passport) {
    // Google Strategy
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
                            user.googleId = profile.id;
                            await user.save();
                            done(null, user);
                        } else {
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

    // Microsoft Strategy
    passport.use(
        new MicrosoftStrategy(
            {
                clientID: process.env.MICROSOFT_CLIENT_ID,
                clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
                callbackURL: '/api/auth/microsoft/callback',
                scope: ['user.read'],
            },
            async (accessToken, refreshToken, profile, done) => {
                const newUser = {
                    microsoftId: profile.id,
                    name: profile.displayName || profile._json.name,
                    email: profile.emails[0].value,
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
            }
        )
    );

    // Apple Strategy
    passport.use(
        new AppleStrategy(
            {
                clientID: process.env.APPLE_CLIENT_ID,
                teamID: process.env.APPLE_TEAM_ID,
                keyID: process.env.APPLE_KEY_ID,
                privateKeyString: process.env.APPLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
                callbackURL: '/api/auth/apple/callback',
                passReqToCallback: false,
            },
            async (accessToken, refreshToken, idToken, profile, done) => {
                const newUser = {
                    appleId: idToken.sub,
                    name: profile?.name || 'Apple User',
                    email: idToken.email,
                };

                try {
                    let user = await User.findOne({ appleId: idToken.sub });

                    if (user) return done(null, user);

                    user = await User.findOne({ email: idToken.email });
                    if (user) {
                        user.appleId = idToken.sub;
                        await user.save();
                        return done(null, user);
                    }

                    const created = await User.create(newUser);
                    return done(null, created);
                } catch (err) {
                    return done(err, null);
                }
            }
        )
    );

    // Serialize & Deserialize user (only once)
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
