"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("./auth.controller"));
const authMiddleware_1 = __importDefault(require("./../../middleware/authMiddleware"));
const passport_1 = __importDefault(require("passport"));
require("../../services/passportSetup");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /platform/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Регистрация нового пользователя
 *     description: Создает нового пользователя и возвращает JWT токен в cookie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Успешная регистрация
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Успешная регистрация"
 *       400:
 *         description: Email уже используется
 *       500:
 *         description: Ошибка при регистрации
 */
router.post("/register", auth_controller_1.default.register);
/**
 * @swagger
 * /platform/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Авторизация пользователя
 *     description: Авторизует пользователя и возвращает JWT токен в cookie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Успешная авторизация
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Успешный вход"
 *       401:
 *         description: Неверные учетные данные
 *       500:
 *         description: Ошибка при авторизации
 */
router.post("/login", auth_controller_1.default.login);
/**
 * @swagger
 * /platform/auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Выход из системы
 *     description: Завершается сессия пользователя и удаляется токен аутентификации.
 *     responses:
 *       200:
 *         description: Успешный выход
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Вы успешно вышли из системы"
 *       500:
 *         description: Ошибка при выходе
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Ошибка при выходе из системы"
 */
router.post("/logout", auth_controller_1.default.logout);
/**
 * @swagger
 * /platform/auth/edit/{id}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Редактирование профиля пользователя
 *     description: Обновляет информацию о пользователе по его ID. Требуется авторизация.
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Уникальный идентификатор пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bgImage:
 *                 type: string
 *               photoURL:
 *                 type: string
 *               name:
 *                 type: string
 *               lastName:
 *                 type: string
 *               profession:
 *                 type: string
 *               descr:
 *                 type: string
 *               university:
 *                 type: string
 *               dateOfBirthDay:
 *                 type: string
 *                 format: date
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Профиль успешно обновлён
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Профиль успешно обновлён"
 *       400:
 *         description: Ошибка валидации
 *       404:
 *         description: Пользователь не найден
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.put("/edit/:id", authMiddleware_1.default, auth_controller_1.default.editUser);
router.get("/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport_1.default.authenticate("google", {
    session: false,
}), auth_controller_1.default.signWithGoogle);
exports.default = router;
