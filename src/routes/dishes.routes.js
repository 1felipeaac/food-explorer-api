const { Router } = require("express");
const DishesController = require("../controllers/DishesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const dishRoutes = Router();

const dishesController = new DishesController();

dishRoutes.use(ensureAuthenticated)
dishRoutes.use(verifyUserAuthorization('admin'))

dishRoutes.post("/", dishesController.create);

module.exports = dishRoutes;
