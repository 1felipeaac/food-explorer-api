const AppError = require("../utils/AppError")

class DishesService{
    constructor(dishesService){
        this.dishesService = dishesService
    }

    async insert({name, category, description, user_id, ingredients}){
        const [dish] = await this.dishesService.create({name, category, description, user_id})
        const ingredientsCreated = await this.dishesService.createIngredient(ingredients, user_id, dish)

        return {dish, ingredientsCreated}
    }

    // async readDishById(id){
    //     const dish = await this.dishesService.readDishById(id)

    //     return dish
    // }
}

module.exports = DishesService