const { Router } = require("express");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const OrderControler = require("../controllers/OrdersController")

const ordresRoutes = Router()
const orderController = new OrderControler()

ordresRoutes.use(ensureAuthenticated)

ordresRoutes.post("/", orderController.create)
ordresRoutes.get("/:id", orderController.show)
ordresRoutes.put("/:id", verifyUserAuthorization('admin') ,orderController.update)
ordresRoutes.get("/", orderController.index)
ordresRoutes.delete("/:id", orderController.delete)

module.exports = ordresRoutes