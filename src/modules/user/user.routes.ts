import { Router } from "express";
import userController from "./user.controller";
import authMiddleware from "./../../middleware/authMiddleware";

const router = Router();

router.get("/check", userController.checkUser);

router.get("/profile", authMiddleware, userController.getProfile);

/**
 * @swagger
 * /platform/user/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Получение данных пользователя по ID
 *     description: Возвращает данные пользователя по ID, если он найден
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Идентификатор пользователя
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Данные пользователя
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bgImage:
 *                   type: string
 *                 photoURL:
 *                   type: string
 *                 name:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 profession:
 *                   type: string
 *                 descr:
 *                   type: string
 *                 university:
 *                   type: string
 *                 dateOfBirthDay:
 *                   type: string
 *                   format: date
 *                 email:
 *                   type: string
 *       404:
 *         description: Пользователь не найден
 *       500:
 *         description: Внутренняя ошибка сервера
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
router.get("/:id", authMiddleware, userController.getUserById);

export default router;
