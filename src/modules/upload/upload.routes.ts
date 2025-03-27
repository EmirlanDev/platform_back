import { Router } from "express";
import upload from "./../../config/multer";
import uploadController from "./upload.controller";
import authMiddleware from "./../../middleware/authMiddleware";

const router = Router();

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
router.post(
  "/upload",
  authMiddleware,
  upload.single("image"),
  uploadController.uploadImage
);

export default router;
