const knex = require("../database/knex");
const DishesRepository = require("../repositories/DishesRepository");
const DishesService = require("../services/DishesService");

class DishesController {
  async create(request, response) {
    const { name, category, description, ingredients } = request.body;
    const user_id = request.user.id;

    const dishesRepository = new DishesRepository();
    const dishesService = new DishesService(dishesRepository);

    await dishesService.insert({
      name: name,
      category: category,
      description: description,
      user_id: user_id,
      ingredients: ingredients,
    });

    return response.json();
  }

  async show(request, response) {
    const { id } = request.params;
    const dishesRepository = new DishesRepository();
    const dishesService = new DishesService(dishesRepository);

    const findDish = await dishesService.readDishById(id);

    return response.json({ findDish });
  }
  async index(request, response) {
    const dishesRepository = new DishesRepository();
    const dishesService = new DishesService(dishesRepository);

    const { name, ingredients } = request.query;

    const user_id = request.user.id;

    const dishWithIngredients = await dishesService.listDishByIngredients(
      ingredients,
      name,
      user_id
    );

    return response.json(dishWithIngredients);
  }
  async update() {}
  async delete(request, response) {
    const {id} = request.params;
    const dishesRepository = new DishesRepository();
    const dishesService = new DishesService(dishesRepository);

    dishesService.deleteDish(id)

    return response.json()
  }
}

module.exports = DishesController;
