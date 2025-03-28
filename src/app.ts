import { config } from "dotenv";
config();
import express from "express";
import router from "./routes";
import { setupSwagger } from "./config/swagger";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";
import path from "path";

const buildServer = () => {
  const server = express();
  server.use(express.json());
  server.use(cookieParser());
  setupSwagger(server);

  server.get("/", (req, res) => {
    res.status(200).json({
      message: "Platform main",
    });
  });

  // server.use(
  //   session({
  //     secret: process.env.JWT_SECRET!,
  //     resave: false,
  //     saveUninitialized: true,
  //     cookie: {
  //       httpOnly: true,
  //       secure: process.env.NODE_ENV === "production",
  //       sameSite: "none",
  //     },
  //   })
  // );

  // server.use(passport.initialize());
  // server.use(passport.session());

  server.use("/uploads", express.static(path.join(__dirname, "uploads")));

  server.use("/platform", router);
  return server;
};

export default buildServer;
