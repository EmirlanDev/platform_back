"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("./../../config/prisma"));
const addNews = async (req, res) => {
    try {
        const { image, title, descriptions } = req.body;
        await prisma_1.default.news.create({
            data: {
                image,
                title,
                descriptions,
                createdAt: new Date(),
            },
        });
        res.status(201).json({ message: "Новость успешно добавлен" });
    }
    catch (error) {
        res.status(500).json({ message: "Ошибка при добавлении новости" });
    }
};
const getAllNews = async (req, res) => {
    try {
        const allNews = await prisma_1.default.news.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.json(allNews);
    }
    catch (error) {
        res.status(500).json({ message: "Ошибка при получении новостей" });
    }
};
const getNewsById = async (req, res) => {
    try {
        const { id } = req.body;
        const oneNews = prisma_1.default.news.findUnique({
            where: { id },
        });
        if (!oneNews) {
            return res.status(404).json({ message: "Новость не найдена" });
        }
        res.json(oneNews);
    }
    catch (error) {
        res.status(500).json({ message: "Ошибка при получении новости" });
    }
};
const deleteNews = async (req, res) => {
    try {
        const { id } = req.body;
        await prisma_1.default.news.delete({
            where: { id },
        });
        res.json({ message: "Новость успешно удалена" });
    }
    catch (error) {
        res.status(500).json({ message: "Ошибка при удалении новости" });
    }
};
exports.default = {
    addNews,
    getAllNews,
    deleteNews,
    getNewsById,
};
