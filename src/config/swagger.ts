import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

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
    ],
  },
  // Важно: путь указывается относительно корня проекта,
  // либо укажи абсолютный путь
  apis: [
    "./src/modules/auth/*.ts",
    "./src/modules/user/*.ts",
    "./src/modules/upload/*.ts",
  ],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  console.log("Swagger UI доступен по адресу: http://localhost:5000/api-docs");
}
