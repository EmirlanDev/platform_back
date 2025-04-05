"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("./../../config/multer"));
const upload_controller_1 = __importDefault(require("./upload.controller"));
const authMiddleware_1 = __importDefault(require("./../../middleware/authMiddleware"));
const router = (0, express_1.Router)();
router.post("/upload", authMiddleware_1.default, multer_1.default.single("image"), upload_controller_1.default.uploadImage);
router.post("/upload/background", authMiddleware_1.default, multer_1.default.single("image"), upload_controller_1.default.uploadBackgroundImage);
// router.delete("/delete", authMiddleware, uploadController.deleteImage);
exports.default = router;
