"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = require("../config/token");
const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.token;
        const decoded = (0, token_1.verifyToken)(token);
        req.userId = decoded.id;
        req.userEmail = decoded.email;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Недействительный токен" });
    }
};
exports.default = authMiddleware;
