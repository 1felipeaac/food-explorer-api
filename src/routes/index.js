const {Router} = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const usersRouter = require("./users.routes");
const sessionsRouter = require("./sessions.routes");
const dishesRouter = require("./dishes.routes");
const ordersRouter = require("./orders.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/dishes", dishesRouter);
routes.use("/orders", ordersRouter);

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "API Documentation",
        description: "Documentation for all routes in the API",
        version: "1.0.0",
      },
      servers: [
        {
          url: "http://localhost:3333", // Substitua pelo URL correto da sua API
        },
      ],
    },
    apis: ["./src/routes/*.js"], // Caminho para os arquivos de rotas
  };
  
  const swaggerSpec = swaggerJsdoc(options);
  routes.use("/docs", swaggerUi.serve);
  routes.get("/docs", swaggerUi.setup(swaggerSpec));

module.exports = routes;