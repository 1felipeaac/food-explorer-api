const { Router } = require("express");
const UsersController = require("../controllers/UsersController");
const UsersValidatedController = require("../controllers/UsersValidatedController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const userRoutes = Router();

const usersController = new UsersController();
const usersValidatedController = new UsersValidatedController();

userRoutes.post("/", usersController.create);
userRoutes.get("/validated", ensureAuthenticated ,usersValidatedController.index);
    
userRoutes.put("/", ensureAuthenticated, usersController.update);

module.exports = userRoutes;
