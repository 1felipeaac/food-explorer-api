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
    const ingredientsInsert = ingredients.map((ingredient) => {
      return {
        dish_id,
        ingredient,
        user_id,
      };
    });

    const ingredientsCreated = await knex("ingredients").insert(
      ingredientsInsert
    );

    return ingredientsCreated;
  }

  async findById(user_id){
    const dishes = await knex("dishes").where({user_id})

    // console.log(dishes)

    return {dishes}
  }

  async findDishById(id) {
    const dish = await knex("dishes").where({ id }).first();
    const ingredients = await knex("ingredients")
      .where({ dish_id: id })
      .orderBy("ingredient");
    const result = {
      ...dish,
      ingredients,
    };

    return result;
  }

  async joinIngredientsWithDish(name, filterIngredients, user_id) {
    const join = await knex("ingredients")
      .select(["dishes.id", "dishes.name", "dishes.user_id"])
      .where("dishes.user_id", user_id)
      .whereLike("dishes.name", `%${name}`)
      .whereIn("ingredient", filterIngredients)
      .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
      .groupBy("dishes.id")
      .orderBy("dishes.name");

    return join;
  }

  async selectDish(name, user_id) {
    const dish = await knex("dishes")
      .select([
        "dishes.id",
        "dishes.name",
        "dishes.user_id",
        "dishes.description",
      ])
      .where({ user_id })
      .whereLike("name", `%${name}`)
      .orderBy("name");

    return dish;
  }

  async findIngredientsByUser(user_id){
    const ingredients = await knex("ingredients").where({user_id})

    return ingredients
  }

  async remove(id){
    const dish = await knex("dishes").where({id}).delete()

    return dish
  }
}

module.exports = DishesRepository;
