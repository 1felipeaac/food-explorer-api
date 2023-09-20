const {Router} = require("express");

const usersRouter = require("./users.routes");
const sessionsRouter = require("./sessions.routes");
const dishesRouter = require("./dishes.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/dishes", dishesRouter);

module.exports = routes;