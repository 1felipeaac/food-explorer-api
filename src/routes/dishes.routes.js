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
  upload.fields(
    [
        {name: "image",maxCount: 1},
        {name: "text",maxCount: 1},
        {name: "text",maxCount: 1},
        {name: "number",maxCount: 1},
        {name: "text",maxCount: 1},
        {name: "text",maxCount: 10},
    ]
  ),
  dishesController.create
);

// dishRoutes.post(
//   "/",
//   verifyUserAuthorization("admin"),
//   upload.single("dishImage"),
//   (request, response) => {
//     console.log(request.file.filename);
//     response.json();
//   }
// );
dishRoutes.get("/:id", dishesController.show);
dishRoutes.delete(
  "/:id",
  verifyUserAuthorization("admin"),
  dishesController.delete
);
dishRoutes.put(
  "/:id",
  verifyUserAuthorization("admin"),
  dishesController.update
);
dishRoutes.get("/", dishesController.index);
dishRoutes.patch("/image", upload.single("image"), (request, response) => {
  console.log(request.file.filename);
  response.json();
});

module.exports = dishRoutes;
