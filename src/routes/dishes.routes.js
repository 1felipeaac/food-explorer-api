const { Router, request, response } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");
const DishesController = require("../controllers/DishesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const dishRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const dishesController = new DishesController();

dishRoutes.use(ensureAuthenticated);

dishRoutes.post(
  "/",
  verifyUserAuthorization("admin"),
  upload.single('image'),
  dishesController.create
);

dishRoutes.get("/:id", dishesController.show);
dishRoutes.delete(
  "/:id",
  verifyUserAuthorization("admin"),
  dishesController.delete
);
dishRoutes.patch(
  "/:id",
  verifyUserAuthorization("admin"),
  upload.single('image'),
  dishesController.update
);
dishRoutes.get("/", dishesController.index);

module.exports = dishRoutes;
