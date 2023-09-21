const sqliteConnection = require("../database/sqlite");
const knex = require("../database/knex");

class DishesRepository {
  async create({ name, category, description, user_id }) {
    const dish = await knex("dishes").insert({
      name,
      category,
      description,
      user_id,
    });

    return dish;
  }

  async createIngredient(ingredients, user_id, dish_id) {
    const ingredientsInsert = ingredients.map((name) => {
      return {
        dish_id,
        name,
        user_id,
      };
    });

    const ingredientsCreated = await knex("ingredients").insert(ingredientsInsert);

    return ingredientsCreated;
  }
}

module.exports = DishesRepository;
