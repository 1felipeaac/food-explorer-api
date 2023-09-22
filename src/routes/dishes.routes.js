const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload")
const DishesController = require("../controllers/DishesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const dishRoutes = Router();
const upload = multer(uploadConfig.MULTER)

const dishesController = new DishesController();

dishRoutes.use(ensureAuthenticated)
dishRoutes.use(verifyUserAuthorization('admin'))

dishRoutes.post("/", dishesController.create);
dishRoutes.get("/:id", dishesController.show);
dishRoutes.delete("/:id", dishesController.delete);
dishRoutes.put("/:id", dishesController.update);
dishRoutes.get("/", dishesController.index);
dishRoutes.patch("/image", upload.single("image"), (request, response) => {
    console.log(request.file.filename)
    response.json()
})

module.exports = dishRoutes;