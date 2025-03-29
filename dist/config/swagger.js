"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = setupSwagger;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Documentation",
            version: "1.0.0",
            description: "Документация API для работы с продуктами",
        },
        servers: [
            {
                url: "http://localhost:5000",
            },
            {
                url: "https://platform-back-qgul.onrender.com/",
            },
        ],
        components: {
            securitySchemes: {
                cookieAuth: {
                    type: "apiKey",
                    in: "cookie",
                    name: "token",
                },
            },
        },
    },
    apis: [
        "./src/modules/auth/*.ts",
        "./src/modules/user/*.ts",
        "./src/modules/upload/*.ts",
    ],
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
function setupSwagger(app) {
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs, {
        swaggerOptions: {
            withCredentials: true,
        },
    }));
    console.log("Swagger UI доступен по адресу: http://localhost:5000/api-docs");
}
