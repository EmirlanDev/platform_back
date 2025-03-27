"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Файл не был загружен" });
        }
        const { filename, path: filePath } = req.file;
        const uploadDir = path_1.default.join(__dirname, "uploads");
        if (!fs_1.default.existsSync(uploadDir)) {
            fs_1.default.mkdirSync(uploadDir, { recursive: true });
        }
        const processedFilename = `processed_${filename}`;
        const outputPath = path_1.default.join(uploadDir, processedFilename);
        await (0, sharp_1.default)(filePath).resize(800).toFile(outputPath);
        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${processedFilename}`;
        res.json({
            message: "Файл успешно обработан!",
            processedImagePath: imageUrl,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Ошибка при обработке файла." });
    }
};
exports.default = {
    uploadImage,
};
