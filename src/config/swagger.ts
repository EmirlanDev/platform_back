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

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export function setupSwagger(app: Express) {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocs, {
      swaggerOptions: {
        withCredentials: true,
      },
    })
  );
  console.log("Swagger UI доступен по адресу: http://localhost:5000/api-docs");
}
