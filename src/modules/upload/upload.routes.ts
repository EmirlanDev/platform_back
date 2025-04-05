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
// router.delete("/delete", authMiddleware, uploadController.deleteImage);

export default router;
