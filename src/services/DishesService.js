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

    if(!name && !ingredients){
        dishes = await this.dishesService.listById(user_id)

        return dishes
    }

    if(!name){
      const filterIngredients = ingredients
      .split(",")
      .map((ingredient) => ingredient.trim());
      try {
        dishes = await this.dishesService.listByIngredients(filterIngredients, user_id)
        
      } catch (error) {
        console.log(error.message)
      }

      return dishes
    }


    if (ingredients) {
      const filterIngredients = ingredients
        .split(",")
        .map((ingredient) => ingredient.trim());
        dishes = await this.dishesService.joinIngredientsWithDish(name, filterIngredients, user_id)

        const [dishId] = dishes.map(dish => dish.id)

        if (dishId === undefined){
          throw new AppError(`O prato ${name} não possui o ingrediente ${filterIngredients}, ou o ingrediente está digitado de forma incorreta`, 404)
        }

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

  async updateDish(id, {name, category, description, user_id, ingredients}){
    const update = await this.dishesService.renewDish(id,name,description,category,user_id)
    const deleteIngredients = await this.dishesService.removeIngredients({id})
    const updateIngredients = await this.dishesService.createIngredient(ingredients,user_id, id)
  }

}

module.exports = DishesService;
