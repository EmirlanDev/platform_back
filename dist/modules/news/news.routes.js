"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const news_controllers_1 = __importDefault(require("./news.controllers"));
const authMiddleware_1 = __importDefault(require("./../../middleware/authMiddleware"));
const router = (0, express_1.Router)();
router.post("/add", authMiddleware_1.default, news_controllers_1.default.addNews);
router.get("/get-all", authMiddleware_1.default, news_controllers_1.default.getAllNews);
router.get("/:id", authMiddleware_1.default, news_controllers_1.default.getNewsById);
router.patch("/edit/:id", news_controllers_1.default.updateNews);
router.delete("/delete", authMiddleware_1.default, news_controllers_1.default.deleteNews);
exports.default = router;
