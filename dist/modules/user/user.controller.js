"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = require("../../config/token");
const prisma_1 = __importDefault(require("./../../config/prisma"));
const getProfile = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ message: "Неавторизованный доступ" });
        }
        const user = await prisma_1.default.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }
        const remappedUser = {
            id: user.id,
            bgImage: user.bgImage,
            photoURL: user.photoURL,
            name: user.name,
            lastName: user.lastName,
            profession: user.profession,
            descr: user.descr,
            dateOfBirthDay: user.dateOfBirthDay,
            email: user.email,
            university: user.university,
        };
        res.json(remappedUser);
    }
    catch (error) {
        console.error("Ошибка в getProfile:", error);
        res.status(500).json({ message: "Ошибка на сервере" });
    }
};
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await prisma_1.default.user.findUnique({ where: { id } });
        if (!user) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }
        const newUser = {
            bgImage: user.bgImage,
            photoURL: user.photoURL,
            name: user.name,
            lastName: user.lastName,
            profession: user.profession,
            descr: user.descr,
            university: user.university,
            dateOfBirthDay: user.dateOfBirthDay,
            email: user.email,
        };
        return res.status(200).json(newUser);
    }
    catch (error) {
        return res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};
const checkUser = async (req, res) => {
    {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Пользователь не авторизован" });
        }
        try {
            (0, token_1.verifyToken)(token);
            return res.json({ authenticated: true });
        }
        catch (err) {
            return res.json({ authenticated: false });
        }
    }
};
exports.default = {
    getProfile,
    getUserById,
    checkUser,
};
