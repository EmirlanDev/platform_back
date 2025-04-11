import { Router } from "express";
import authController from "./auth.controller";
import authMiddleware from "./../../middleware/authMiddleware";
import passport from "passport";
import "../../services/passportSetup";

const router = Router();

router.post("/register", authController.register);

router.post("/login", authController.login);

router.post("/logout", authController.logout);

router.put("/edit/:id", authMiddleware, authController.editUser);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  authController.signWithGoogle
);

export default router;
