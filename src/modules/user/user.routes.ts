import { Router } from "express";
import userController from "./user.controller";
import authMiddleware from "./../../middleware/authMiddleware";

const router = Router();

/**
 * @swagger
 * /platform/user/profile:
 *   get:
 *     tags:
 *       - Users
 *     summary: Получение данных профиля пользователя
 *     description: Возвращает данные профиля авторизованного пользователя
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Данные профиля пользователя
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "b3abf1fe-37fb-4fbb-b31c-812f829183e9"
 *                 name:
 *                   type: string
 *                   example: "Эмирлан"
 *                 lastName:
 *                   type: string
 *                   example: "Амангелдиев"
 *                 email:
 *                   type: string
 *                   example: "frdevemirlan04@gmail.com"
 *                 photoURL:
 *                   type: string
 *                   example: "https://i0.wp.com/passivesills.com/wp-content/uploads/2020/06/User-Icon-Grey.png?fit=400%2C400&ssl=1&w=640"
 *                 provider:
 *                   type: string
 *                   example: "credentials"
 *                 profession:
 *                   type: string
 *                   example: "Пусто"
 *                 university:
 *                   type: string
 *                   example: "Пусто"
 *                 dateOfBirthDay:
 *                   type: string
 *                   example: "Пусто"
 *                 descr:
 *                   type: string
 *                   example: "Пусто"
 *                 bgImage:
 *                   type: string
 *                   example: "https://www.omfif.org/wp-content/uploads/2022/10/ocean-economy-newweb.png"
 *                 createAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-03-27T01:33:49.495Z"
 *                 updateAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-03-27T01:33:49.495Z"
 *       401:
 *         description: Не авторизован
 *       404:
 *         description: Пользователь не найден
 *       500:
 *         description: Ошибка на сервере
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
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
