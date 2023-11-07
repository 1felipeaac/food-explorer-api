const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class DishesRepository {
  async createDish({ name, category, description, user_id, value, image }) {
    const dish = await knex("dishes").insert({
      image,
      name,
      category,
      description,
      user_id,
      value,
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

  async listById() {
    const dishes = await knex("dishes").select([
      "dishes.image",
      "dishes.id",
      "dishes.name",
      "dishes.category",
      "dishes.description",
      "dishes.value",
    ]);

    return { dishes };
  }

  async dishFoundById(id) {
    const dish = await knex("dishes")
      .select([
        "dishes.image",
        "dishes.name",
        "dishes.category",
        "dishes.description",
        "dishes.value",
      ])
      .where({ id })
      .first();

    const ingredients = await knex("ingredients")
      .select(["ingredient"])
      .where({ dish_id: id })
      .orderBy("ingredient");

    const result = {
      ...{ dish },
      ingredients,
    };

    return result;
  }

  async linkDishesIngredients(name, filterIngredients) {
    const caseInsensitive = filterIngredients.map((ingredient) =>
      ingredient.toLowerCase()
    );

    const join = await knex("ingredients")
      .select(["dishes.id", "dishes.name", "dishes.user_id"])
      .whereLike("dishes.name", `%${name}%`)
      .whereIn(knex.raw("LOWER(ingredient)"), caseInsensitive)
      .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
      .groupBy("dishes.id")
      .orderBy("dishes.name");

    return join;
  }

  async listByIngredients(filterIngredients) {
    const caseInsensitive = filterIngredients.map((ingredient) =>
      ingredient.toLowerCase()
    );

    const dishes = await knex("ingredients")
      .select(["ingredients.dish_id"])
      .whereLike("ingredient", `%${caseInsensitive}%`);
    const dishesFound = dishes.map((dish) => this.dishFoundById(dish.dish_id));

    const dishSelected = await Promise.all(dishesFound);
    console.log(dishSelected);

    return dishSelected;
  }

  async selectDish(name) {
    const dish = await knex("dishes")
      .select(["dishes.id", "dishes.name", "dishes.description", "dishes.value"])
      .whereLike("name", `%${name}%`)
      .orderBy("name");

    return dish;
  }

  async allIngredients() {
    const ingredients = await knex("ingredients").select("*");
    return ingredients;
  }

  async findDishById(id) {
    const dish = await knex("dishes").select("*").where({ id }).first();

    return dish;
  }

  async remove(id) {
    const del = await knex("dishes").where({ id }).delete();

    return del;
  }

  async renewDish(id, image, name, category, description, value, user_id) {
    return await knex("dishes").where({ id }).update({
      image: image,
      name: name,
      category: category,
      description: description,
      value: value,
      user_id: user_id,
    });
  }

  async removeIngredients({ id }) {
    return await knex("ingredients").where({ dish_id: id }).delete();
  }
}

module.exports = DishesRepository;
