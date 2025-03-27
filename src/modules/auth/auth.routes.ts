import { Router } from "express";
import authController from "./auth.controller";
import authMiddleware from "./../../middleware/authMiddleware";

const router = Router();

/**
 * @swagger
 * /platform/auth/register:
 *   post:
 *     tags:
 *      - Auth
 *     summary: Регистрация нового пользователя
 *     description: Создает нового пользователя и возвращает JWT токен
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
 *       200:
 *         description: Успешная регистрация
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     email:
 *                       type: string
 *                     photoURL:
 *                       type: string
 *                 token:
 *                   type: string
 *       500:
 *         description: Ошибка при регистрации
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /platform/auth/login:
 *   post:
 *     tags:
 *      - Auth
 *     summary: Авторизация пользователя
 *     description: Авторизует пользователя и возвращает JWT токен
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
 *                 user:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     email:
 *                       type: string
 *                     photoURL:
 *                       type: string
 *                 token:
 *                   type: string
 *       401:
 *         description: Неверные учетные данные
 *       500:
 *         description: Ошибка при авторизации
 */
router.post("/login", authController.login);

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
router.post("/logout", authController.logout);

/**
 * @swagger
 * /platform/auth/edit/{id}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Редактирование профиля пользователя
 *     description: Обновляет информацию о пользователе по его ID. Требуется авторизация.
 *     security:
 *       - bearerAuth: []
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
 *                 description: URL фонового изображения профиля
 *               photoURL:
 *                 type: string
 *                 description: URL фото профиля
 *               name:
 *                 type: string
 *                 description: Имя пользователя
 *               lastName:
 *                 type: string
 *                 description: Фамилия пользователя
 *               profession:
 *                 type: string
 *                 description: Профессия пользователя
 *               descr:
 *                 type: string
 *                 description: Краткое описание или биография
 *               university:
 *                 type: string
 *                 description: Название университета
 *               dateOfBirthDay:
 *                 type: string
 *                 format: date
 *                 description: Дата рождения (в формате YYYY-MM-DD)
 *               email:
 *                 type: string
 *                 description: Адрес электронной почты
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
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     email:
 *                       type: string
 *                     photoURL:
 *                       type: string
 *                     bgImage:
 *                       type: string
 *                     profession:
 *                       type: string
 *                     descr:
 *                       type: string
 *                     university:
 *                       type: string
 *                     dateOfBirthDay:
 *                       type: string
 *                       format: date
 *       400:
 *         description: Ошибка валидации (например, email уже используется)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email уже используется"
 *       404:
 *         description: Пользователь не найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Пользователь не найден"
 *       500:
 *         description: Внутренняя ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Внутренняя ошибка сервера"
 */
router.put("/edit/:id", authMiddleware, authController.editUser);

export default router;
