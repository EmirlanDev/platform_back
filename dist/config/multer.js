"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = __importDefault(require("./cloudinary"));
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.default,
    params: async (req, file) => ({
        folder: "student-platform",
        format: "png",
        public_id: `${Date.now()}-${file.originalname}`,
        transformation: [{ width: 800, crop: "limit" }],
    }),
});
const upload = (0, multer_1.default)({ storage });
exports.default = upload;
