"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("./../../config/prisma"));
const token_1 = __importDefault(require("./../../config/token"));
const register = async (req, res) => {
    try {
        const { name, lastName, email, password, photoURL } = req.body;
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = await prisma_1.default.user.create({
            data: {
                name,
                lastName,
                password: hashedPassword,
                email,
            },
        });
        const token = (0, token_1.default)(user.id, user.email);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.json({
            message: "Успешный вход",
            token,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Ошибка при регистрации!" });
    }
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma_1.default.user.findUnique({ where: { email } });
        if (!user || !(await bcrypt_1.default.compare(password, user.password))) {
            return res.status(401).json({ error: "Неверные учетные данные!" });
        }
        const token = (0, token_1.default)(user.id, user.email);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.json({
            message: "Успешный вход",
            token,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Ошибка входа в систему" });
    }
};
const logout = (req, res) => {
    req.logOut((err) => {
        if (err) {
            res.status(500).json({ error: "Logut не удался" });
        }
        res.json({ message: "Выход из системы" });
    });
};
const editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { bgImage, photoURL, name, lastName, profession, descr, university, dateOfBirthDay, email, } = req.body;
        const user = await prisma_1.default.user.findUnique({ where: { id } });
        if (!user) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }
        // Обновляем поля пользователя, если они переданы
        if (bgImage)
            user.bgImage = bgImage;
        if (photoURL)
            user.photoURL = photoURL;
        if (name)
            user.name = name;
        if (lastName)
            user.lastName = lastName;
        if (profession)
            user.profession = profession;
        if (descr)
            user.descr = descr;
        if (university)
            user.university = university;
        if (dateOfBirthDay)
            user.dateOfBirthDay = dateOfBirthDay;
        if (email) {
            const existingUser = await prisma_1.default.user.findUnique({ where: { email } });
            if (existingUser && existingUser.id !== id) {
                return res.status(400).json({ message: "Email уже используется" });
            }
            user.email = email;
        }
        // Сохраняем обновлённого пользователя
        const updatedUser = await prisma_1.default.user.update({
            where: { id },
            data: {
                bgImage,
                photoURL,
                name,
                lastName,
                profession,
                descr,
                university,
                dateOfBirthDay,
                email,
            },
        });
        // Отправляем успешный ответ с обновлёнными данными
        res.status(200).json({
            message: "Профиль успешно обновлён",
            user: updatedUser,
        });
    }
    catch (error) {
        console.error("Ошибка при обновлении пользователя:", error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};
exports.default = {
    register,
    login,
    logout,
    editUser,
};
