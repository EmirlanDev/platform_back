import { Router } from "express";
import cors from "cors";
import authRoutes from "../modules/auth/auth.routes";
import userRoutes from "../modules/user/user.routes";
import uploadRoutes from "../modules/upload/upload.routes";

const router = Router();

const origins = [
  "http://localhost:3000",
  "https://platform-student-space.vercel.app",
];

const corsConfig = {
  origin: (origin, callback) => {
    if (!origin || origins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
    console.log(origin);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

router.use(cors(corsConfig));

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/file", uploadRoutes);

export default router;
