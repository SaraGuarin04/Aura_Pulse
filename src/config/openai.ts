import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

export const openApiSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Projects",
      version: "1.0.0",
      description: "Documentación de endpoints de la API",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v2",
        description: "Servidor local",
      },
      {
        url: "https://aura-pulse-dz27.onrender.com/api/v2",
        description: "Servidor Producción",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Ingresa el token JWT en formato Bearer",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/modules/**/*.ts", "./src/modules/**/*.js"],
});
