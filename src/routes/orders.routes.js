const { Router } = require("express");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const OrderControler = require("../controllers/OrdersController")

const ordresRoutes = Router()
const orderController = new OrderControler()

ordresRoutes.use(ensureAuthenticated)

ordresRoutes.post("/", orderController.create)
ordresRoutes.get("/:id", orderController.show)
ordresRoutes.get("/", orderController.index)
ordresRoutes.delete("/:id", orderController.delete)

module.exports = ordresRoutes