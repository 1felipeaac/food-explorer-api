const AppError = require("../utils/AppError");

class DishesService {
  constructor(dishesService) {
    this.dishesService = dishesService;
  }

  async insert({ name, category, description, user_id, ingredients, value }) {
    const [dish] = await this.dishesService.createDish({
      name,
      category,
      description,
      user_id,
      value
    });
    const ingredientsCreated = await this.dishesService.createIngredient(
      ingredients,
      user_id,
      dish
    );

    return { dish, ingredientsCreated };
  }

  async listDishById(id) {
    const {dish, ingredients} = await this.dishesService.dishFoundById(id);

    const ingredientsMap = ingredients.map(ingredient => ingredient.ingredient)

    return {dish, ingredients: ingredientsMap};
  }

  async listDishes(name, ingredients) {
    let dishes;

    if(!name && !ingredients){
        dishes = await this.dishesService.listById()

      return dishes
    }

    if(!name){
      const filterIngredients = ingredients
      .split(",")
      .map((ingredient) => ingredient.trim());

        const dishesByIngredients = await this.dishesService.listByIngredients(filterIngredients)

        if(dishesByIngredients.length === 0){
          throw new AppError(`Não existe prato com ingrediente ${filterIngredients}, ou o ingrediente está digitado de forma incorreta`, 404)
        }

        const dishes = dishesByIngredients.map(dish =>{
          const dishFound = dish.dish
          const listIngredientsFound = dish.ingredients

          const ingredientsMap = listIngredientsFound.map(ingredient => ingredient.ingredient)

          return {
            dish: dishFound,
            ingredients: ingredientsMap
          }

        })

        return dishes
    }

    if (ingredients) {
      const filterIngredients = ingredients
        .split(",")
        .map((ingredient) => ingredient.trim());
        dishes = await this.dishesService.linkDishesIngredients(name, filterIngredients)

        const [dishId] = dishes.map(dish => dish.id)

        if (dishId === undefined){
          throw new AppError(`O prato ${name} não possui o ingrediente ${filterIngredients}, ou o ingrediente está digitado de forma incorreta`, 404)
        }

    }else{
        dishes = await this.dishesService.selectDish(name);
    }

    const ingredientsSelected = await this.dishesService.allIngredients()

    const dishWithIngredients = dishes.map(dish => {
        const dishIngredients = ingredientsSelected
          .flatMap(
            ingredient => (ingredient.dish_id === dish.id) ? 
            ingredient.ingredient : []
          );
        
          return {
            ...dish,
            ingredients: dishIngredients
          };
    });

    return dishWithIngredients;    
  }

  async deleteDish(id){

      const dish = await this.dishesService.findDishById(id)

      if(dish){
        await this.dishesService.remove(id)
      }else{
        return `O prato ${id} não existe`
      }
      
  }

  async updateDish(id, {name, category, description, user_id, ingredients}){
    const update = await this.dishesService.renewDish(id,name,description,category,user_id)
    const deleteIngredients = await this.dishesService.removeIngredients({id})
    const updateIngredients = await this.dishesService.createIngredient(ingredients,user_id, id)
  }

}

module.exports = DishesService;
