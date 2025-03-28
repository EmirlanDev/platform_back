"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("../modules/auth/auth.routes"));
const user_routes_1 = __importDefault(require("../modules/user/user.routes"));
const upload_routes_1 = __importDefault(require("../modules/upload/upload.routes"));
const router = (0, express_1.Router)();
const origins = [
    "http://localhost:3000",
    "http://localhost:5000",
    "https://platform-back-qgul.onrender.com",
];
const corsConfig = {
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};
router.use((0, cors_1.default)(corsConfig));
router.use("/auth", auth_routes_1.default);
router.use("/user", user_routes_1.default);
router.use("/file", upload_routes_1.default);
exports.default = router;
