import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import prisma from "./../config/prisma";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL ||
        "http://localhost:5000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await prisma.user.findUnique({
        where: { email: profile.emails![0].value },
      });
      if (!user) {
        user = await prisma.user.create({
          data: {
            name: profile.name?.givenName || profile.displayName,
            lastName: profile.name?.familyName || "",
            email: profile.emails![0].value,
            photoURL: profile.photos?.[0]?.value || "",
            provider: "google",
            password: null,
          },
        });
      }
      return done(null, user);
    }
  )
);
