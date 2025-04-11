"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const news_controllers_1 = __importDefault(require("./news.controllers"));
const router = (0, express_1.Router)();
router.post("/add", news_controllers_1.default.addNews);
router.get("/get-all", news_controllers_1.default.getAllNews);
router.get("/:id", news_controllers_1.default.getNewsById);
router.delete("/delete", news_controllers_1.default.deleteNews);
exports.default = router;
