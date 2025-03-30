"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("./user.controller"));
const authMiddleware_1 = __importDefault(require("./../../middleware/authMiddleware"));
const router = (0, express_1.Router)();
router.get("/check", user_controller_1.default.checkUser);
router.get("/profile", authMiddleware_1.default, user_controller_1.default.getProfile);
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
router.get("/:id", authMiddleware_1.default, user_controller_1.default.getUserById);
exports.default = router;
