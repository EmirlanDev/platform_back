"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("./../config/prisma"));
const adminMiddleware = async (req, res, next) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res
                .status(401)
                .json({ message: "Не авторизованный пользователь" });
        }
        const user = await prisma_1.default.user.findUnique({
            where: { id: userId },
            select: { isAdmin: true },
        });
        if (!user || !user.isAdmin) {
            return res.status(403).json({ message: "Доступ запрещён: не админ" });
        }
        next();
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ message: "Ошибка при проверке прав администратора" });
    }
};
exports.default = adminMiddleware;
