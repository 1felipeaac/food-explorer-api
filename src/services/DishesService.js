const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class DishesService {
  constructor(dishesService) {
    this.dishesService = dishesService;
  }

  async insert({
    name,
    category,
    description,
    user_id,
    ingredients,
    value,
    image,
  }) {
    try {
      let arrayIngredients = ingredients.split(",");

      const [dish] = await this.dishesService.createDish({
        image,
        name,
        category,
        description,
        user_id,
        value,
      });
      const ingredientsCreated = await this.dishesService.createIngredient(
        arrayIngredients,
        user_id,
        dish
      );

      return { dish, ingredientsCreated };
    } catch (error) {
      throw new AppError(error.message);
    }
  }

  async listDishById(id) {
    const dish = await this.dishesService.dishFoundById(id);

    try {
      if (dish === undefined) {
        throw new AppError(
          `Não existe prato com o id ${id}, ou o id está digitado de forma incorreta`,
          404
        );
      }

      return { dish };
    } catch (error) {
      throw new AppError(error.message);
    }
  }

  async listDishes(name) {
    let dishes;
    try {
      if (!name) {
        dishes = await this.dishesService.listById();

        return dishes;
      }

      const arrayDishes = await this.dishesService.selectDish(name);
      const arrayIngredients = await this.dishesService.listByIngredients(name);

      if (arrayDishes.length > 0) {
        dishes = arrayDishes;
        const ingredientsSelected = await this.dishesService.allIngredients();

        const dishWithIngredients = dishes.map((dish) => {
          const dishIngredients = ingredientsSelected.flatMap((ingredient) =>
            ingredient.dish_id === dish.id ? ingredient.ingredient : []
          );

          return {
            ...dish,
            ingredients: dishIngredients,
          };
        });

        return dishWithIngredients;
      } else {
        if (arrayIngredients.length > 0) {
          dishes = arrayIngredients;

          return dishes;
        } else {
          throw new AppError(
            `Não existe prato ou ingrediente com esse nome: ${name}`
          );
        }
      }
    } catch (error) {
      throw new AppError(error.message);
    }
  }

  async deleteDish(id) {
    const dish = await this.dishesService.findDishById(id);
    try {
      if (dish === undefined) {
        throw new AppError(`O prato ${id} não existe`, 404);
      }

      const removeDish = await this.dishesService.remove(id);
      return removeDish;
    } catch (error) {
      throw new AppError(error.message);
    }
  }

  async updateDish(
    id,
    { image, name, category, description, value, user_id, ingredients }
  ) {
    const dish = await this.dishesService.findDishById(id);
    const diskStorage = new DiskStorage();
    try {
      if (dish === undefined) {
        throw new AppError(`O prato ${id} não existe`, 404);
      }

      if (dish.image) {
        await diskStorage.deleteFile(dish.image);
      }

      let arrayIngredients = ingredients.split(",");

      const updateDish = await this.dishesService.renewDish(
        id,
        image,
        name,
        category,
        description,
        value,
        user_id
      );
      await this.dishesService.removeIngredients({
        id,
      });
      const updateIngredients = await this.dishesService.createIngredient(
        arrayIngredients,
        user_id,
        id
      );

      return { updateDish, updateIngredients };
    } catch (error) {
      throw new AppError(error.message);
    }
  }
}

module.exports = DishesService;
