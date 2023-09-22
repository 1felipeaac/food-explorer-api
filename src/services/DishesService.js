const AppError = require("../utils/AppError");

class DishesService {
  constructor(dishesService) {
    this.dishesService = dishesService;
  }

  async insert({ name, category, description, user_id, ingredients }) {
    const [dish] = await this.dishesService.create({
      name,
      category,
      description,
      user_id,
    });
    const ingredientsCreated = await this.dishesService.createIngredient(
      ingredients,
      user_id,
      dish
    );

    return { dish, ingredientsCreated };
  }

  async readDishById(id) {
    const dish = await this.dishesService.findDishById(id);

    return dish;
  }

  async listDishByIngredients(ingredients, name, user_id) {
    let dishes;

    if(!name){
        dishes = await this.dishesService.findById(user_id)

        return dishes
    }

    if (ingredients) {
      const filterIngredients = ingredients
        .split(",")
        .map((ingredient) => ingredient.trim());
        dishes = await this.dishesService.joinIngredientsWithDish(name, filterIngredients, user_id)
    }else{
        dishes = await this.dishesService.selectDish(name, user_id);
    }

    const userIngredients = await this.dishesService.findIngredientsByUser(user_id)
    const dishWithIngredients = dishes.map(dish =>{
        const dishIngredients = userIngredients
            .filter(
                ingredient => ingredient.dish_id === dish.id
                )

        return {
            ...dish,
            ingredients: dishIngredients
        }
    })

    return dishWithIngredients;    
  }

  async deleteDish(id){

    const remove = await this.dishesService.remove(id)

    return remove

  }
}

module.exports = DishesService;
