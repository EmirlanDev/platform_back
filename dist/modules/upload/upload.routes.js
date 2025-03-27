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
/**
 * @swagger
 * /platform/file/upload:
 *   post:
 *     tags:
 *       - Upload
 *     summary: Загрузка и обработка изображения
 *     description: Загружает изображение, обрабатывает его (сжимаем и изменяем размер) и возвращает путь к обработанному изображению
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Изображение для загрузки и обработки
 *     responses:
 *       200:
 *         description: Изображение успешно обработано
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Файл успешно обработан!"
 *                 processedImagePath:
 *                   type: string
 *                   example: "uploads/processed_image.jpg"
 *       400:
 *         description: Файл не был загружен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Файл не был загружен"
 *       500:
 *         description: Ошибка при обработке файла
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Ошибка при обработке файла."
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
router.post("/upload", authMiddleware_1.default, multer_1.default.single("image"), upload_controller_1.default.uploadImage);
exports.default = router;
