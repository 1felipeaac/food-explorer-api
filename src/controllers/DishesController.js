const knex = require("../database/knex");
const DishesRepository = require("../repositories/DishesRepository");
const DishesService = require("../services/DishesService");

class DishesController {
  async create(request, response) {
    const { name, category, description, ingredients, value } = request.body;
    const user_id = request.user.id;

    const dishesRepository = new DishesRepository();
    const dishesService = new DishesService(dishesRepository);

    await dishesService.insert({
      name: name,
      category: category,
      description: description,
      user_id: user_id,
      ingredients: ingredients,
      value: value,
    });

    return response.json();
  }

  async show(request, response) {
    const { id } = request.params;
    const dishesRepository = new DishesRepository();
    const dishesService = new DishesService(dishesRepository);

    const presentation = await dishesService.listDishById(id);

    return response.json(presentation);
  }
  async index(request, response) {
    const dishesRepository = new DishesRepository();
    const dishesService = new DishesService(dishesRepository);

    const { name, ingredients } = request.query;

    const dishWithIngredients = await dishesService.listDishes(
      name,
      ingredients
    );

    return response.json(dishWithIngredients);
  }
  async delete(request, response) {
    const { id } = request.params;
    const dishesRepository = new DishesRepository();
    const dishesService = new DishesService(dishesRepository);

    await dishesService.deleteDish(id);

    return response.json();
  }
  async update(request, response) {
    const dishesRepository = new DishesRepository();
    const dishesService = new DishesService(dishesRepository);

    const { id } = request.params;
    const { name, category, description, ingredients, value } = request.body;
    const user_id = request.user.id;

    await dishesService.updateDish(id, {
      name,
      category,
      description,
      value,
      ingredients,
      user_id,
    });

    return response.json({
      id,
      name,
      category,
      description,
      value,
      ingredients,
    });
  }
}

module.exports = DishesController;
