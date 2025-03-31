"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const swagger_1 = require("./config/swagger");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const passport_1 = __importDefault(require("passport"));
const buildServer = () => {
    const server = (0, express_1.default)();
    server.use(express_1.default.json());
    server.use((0, cookie_parser_1.default)());
    server.use(passport_1.default.initialize());
    (0, swagger_1.setupSwagger)(server);
    server.get("/", (req, res) => {
        res.status(200).json({
            message: "Platform main",
        });
    });
    server.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "uploads")));
    server.use("/api", routes_1.default);
    return server;
};
exports.default = buildServer;
