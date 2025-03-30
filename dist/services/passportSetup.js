"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const prisma_1 = __importDefault(require("./../config/prisma"));
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL ||
        "http://localhost:5000/auth/google/callback",
    scope: ["profile", "email"],
}, async (accessToken, refreshToken, profile, done) => {
    let user = await prisma_1.default.user.findUnique({
        where: { email: profile.emails[0].value },
    });
    if (!user) {
        user = await prisma_1.default.user.create({
            data: {
                name: profile.name?.givenName || profile.displayName,
                lastName: profile.name?.familyName || "",
                email: profile.emails[0].value,
                photoURL: profile.photos?.[0]?.value || "",
                provider: "google",
                password: null,
            },
        });
    }
    return done(null, user);
}));
