const knex = require("../database/knex");
const DishesRepository = require("../repositories/DishesRepository");
const DishesService = require("../services/DishesService");

class DishesController {
  async create(request, response) {
    const { name, category, description, ingredients } = request.body;
    const user_id = request.user.id;

    const dishesRepository = new DishesRepository();
    const dishesService = new DishesService(dishesRepository);

    dishesService.insert({
      name: name,
      category: category,
      description: description,
      user_id: user_id,
      ingredients: ingredients,
    });

    return response.json();
  }

  async show(request, response) {
    const {id} = request.params
    const dishesRepository = new DishesRepository();
    const dishesService = new DishesService(dishesRepository);

    
    
    const dish = await knex("dishes").where({id}).first();
    const ingredients = await knex("ingredients").where({dish_id: id}).orderBy("ingredient")

    // dishesService.readDishById(id)

    return response.json({
        ...dish,
        ingredients
    })
  }
  async index(request, response) {
    const dishesRepository = new DishesRepository();
    const dishesService = new DishesService(dishesRepository);

    const {name, ingredients} = request.query

    const user_id = request.user.id

    let dishes;

    if(ingredients){
        const filterIngredients = ingredients.split(',').map(ingredient => ingredient.trim())

        dishes = await knex("ingredients")
        .select([
            "dishes.id",
            "dishes.name",
            "dishes.user_id"
        ])
        .where("dishes.user_id", user_id)
        .whereLike("dishes.name",`%${name}`)
        .whereIn("ingredient", filterIngredients)
        .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
        .orderBy("dishes.name")



    }else{
        console.log("sem ingredients")
        dishes = await knex("dishes")
        .select([
            "dishes.id",
            "dishes.name",
            "dishes.user_id",
            "dishes.description"
        ])
            .where({user_id})
            .whereLike("name",`%${name}`)
            .orderBy("name")
    }

    const userIngredients = await knex("ingredients").where({user_id})
    const disheWithIngredients = dishes.map(dish =>{
        const dishIngredients = userIngredients
            .filter(
                
                ingredient => ingredient.dish_id === dish.id
                )

        return {
            ...dish,
            ingredients: dishIngredients
        }
    })


    return response.json(disheWithIngredients);
  }
  async update() {}
  async delete() {}
}

module.exports = DishesController;
