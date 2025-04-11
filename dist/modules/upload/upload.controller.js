"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("../../config/cloudinary"));
const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Файл не был загружен" });
        }
        const file = req.file;
        res.status(200).json({
            message: "Файл успешно загружен!",
            url: file.path,
            public_id: file.filename,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Ошибка при загрузке файла." });
    }
};
const uploadBackgroundImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Фон не был загружен" });
        }
        const file = req.file;
        const result = await cloudinary_1.default.uploader.upload(file.path, {
            folder: "backgrounds",
        });
        res.status(200).json({
            message: "Фоновое изображение успешно загружено!",
            url: result.secure_url,
            public_id: result.public_id,
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "Ошибка при загрузке фонового изображения." });
    }
};
const uploadNewsImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Файл не был загружен" });
        }
        const file = req.file;
        const result = await cloudinary_1.default.uploader.upload(file.path, {
            folder: "news",
        });
        res.status(200).json({
            message: "Файл изображение успешно загружено!",
            url: result.secure_url,
            public_id: result.public_id,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Ошибка при загрузке изображения новости." });
    }
};
exports.default = {
    uploadImage,
    uploadBackgroundImage,
    uploadNewsImage,
};
