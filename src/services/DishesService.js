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
      // console.log(error.message)
      throw new AppError(error.message);
    }
  }

  async listDishById(id) {
    const { dish, ingredients } = await this.dishesService.dishFoundById(id);

    try {
      if (dish === undefined) {
        throw new AppError(
          `Não existe prato com o id ${id}, ou o id está digitado de forma incorreta`,
          404
        );
      }

      const ingredientsMap = ingredients.map(
        (ingredient) => ingredient.ingredient
      );

      return { id, dish, ingredients: ingredientsMap };
    } catch (error) {
      throw new AppError(error.message);
    }
  }

  async listDishes(name, ingredients) {
    let dishes;
    // console.log(name, ingredients);
    try {
      if (!name && !ingredients) {
        dishes = await this.dishesService.listById();

        return dishes;
        // throw new AppError("Sem parametros para busca")
      }

      if (!name) {
        const filterIngredients = ingredients
          .split(",")
          .map((ingredient) => ingredient.trim());

        const dishesByIngredients = await this.dishesService.listByIngredients(
          filterIngredients
        );

        if (dishesByIngredients.length === 0) {
          throw new AppError(
            `Não existe prato com ingrediente ${filterIngredients}, ou o ingrediente está digitado de forma incorreta`,
            404
          );
        }

        const dishes = dishesByIngredients.map((dish) => {
          const dishFound = dish.dish;
          const listIngredientsFound = dish.ingredients;

          const ingredientsMap = listIngredientsFound.map(
            (ingredient) => ingredient.ingredient
          );

          return {
            dish: dishFound,
            ingredients: ingredientsMap,
          };
        });

        return dishes;
      }

      if (ingredients) {
        const filterIngredients = ingredients
          .split(",")
          .map((ingredient) => ingredient.trim());
        dishes = await this.dishesService.linkDishesIngredients(
          name,
          filterIngredients
        );

        const [dishId] = dishes.map((dish) => dish.id);

        if (dishId === undefined) {
          throw new AppError(
            `O prato ${name} não possui o ingrediente ${filterIngredients}, ou o ingrediente está digitado de forma incorreta`,
            404
          );
        }
      } else {
        dishes = await this.dishesService.selectDish(name);
        // console.log("Objeto"+ Object.keys(dishes).length);

        if (Object.keys(dishes).length === 0) {
          throw new AppError(`Sem resultados para busca: ${name}`);
        }
      }

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

      if(dish.image){
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
