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
  async show(request, response) {}
  async index() {}
  async update() {}
  async delete() {}
}

module.exports = DishesController;
