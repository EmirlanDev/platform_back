import { Router } from "express";
import cors from "cors";
import authRoutes from "../modules/auth/auth.routes";
import userRoutes from "../modules/user/user.routes";
import uploadRoutes from "../modules/upload/upload.routes";

const router = Router();

const corsConfig = {
  origin: [
    "http://localhost:3000",
    "http://localhost:5000",
    "https://student-space-x7ra.vercel.app/",
  ],
  credentials: true,
};

router.use("/auth", cors(corsConfig), authRoutes);
router.use("/user", cors(corsConfig), userRoutes);
router.use("/file", cors(corsConfig), uploadRoutes);

export default router;
