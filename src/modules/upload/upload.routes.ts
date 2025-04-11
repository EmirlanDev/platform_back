import { Router } from "express";
import upload from "./../../config/multer";
import uploadController from "./upload.controller";
import authMiddleware from "./../../middleware/authMiddleware";

const router = Router();

router.post(
  "/upload",
  authMiddleware,
  upload.single("image"),
  uploadController.uploadImage
);

router.post(
  "/upload/background",
  authMiddleware,
  upload.single("image"),
  uploadController.uploadBackgroundImage
);

router.post(
  "/upload/news",
  authMiddleware,
  upload.single("image"),
  uploadController.uploadNewsImage
);

export default router;
