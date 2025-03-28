import { Router } from "express";
import cors from "cors";
import authRoutes from "../modules/auth/auth.routes";
import userRoutes from "../modules/user/user.routes";
import uploadRoutes from "../modules/upload/upload.routes";

const router = Router();

const origins = [
  "http://localhost:3000",
  "http://localhost:5000",
  "https://platform-back-qgul.onrender.com",
];

const corsConfig = {
  origin: ["http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

router.use(cors(corsConfig));

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/file", uploadRoutes);

export default router;
