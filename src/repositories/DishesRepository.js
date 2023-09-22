const sqliteConnection = require("../database/sqlite");
const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class DishesRepository {
  async create({ name, category, description, user_id }) {
    try {
      const dish = await knex("dishes").insert({
        name,
        category,
        description,
        user_id,
      });
  
      return dish;
      
    } catch (error) {
      throw new AppError(error.message, 400)
    }
  }

  async createIngredient(ingredients, user_id, dish_id) {

    try {
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
      
    } catch (error) {
      throw new AppError(error.message, 400)
    }
  }

  async listById(user_id){

    try {
      const dishes = await knex("dishes").where({user_id})
  
      return {dishes}
      
    } catch (error) {
      throw new AppError(error.message, 404)
    }
  }

  async findDishById(id) {
    try {
      const dish = await knex("dishes").where({ id }).first();
      const ingredients = await knex("ingredients")
        .where({ dish_id: id })
        .orderBy("ingredient");
      const result = {
        ...dish,
        ingredients,
      };
  
      return result;

    }catch(error){
      throw new AppError(error.message, 404)
    }
  }

  async joinIngredientsWithDish(name, filterIngredients, user_id) {
    try {
      const caseInsensitive = filterIngredients.map(ingredient => ingredient.toLowerCase())
  
      const join = await knex("ingredients")
        .select([
          "dishes.id", 
          "dishes.name", 
          "dishes.user_id"
        ])
        .where("dishes.user_id", user_id)
        .whereLike("dishes.name", `%${name}`)
        .whereIn(knex.raw("LOWER(ingredient)"), caseInsensitive)
        .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
        .groupBy("dishes.id")
        .orderBy("dishes.name");
  
      return join;

    }catch(error){
      throw new AppError(error.message, 400)
    }
  }

  async listByIngredients(filterIngredients, user_id) {
    try {
      const caseInsensitive = filterIngredients.map(ingredient => ingredient.toLowerCase())
      const join = await knex("dishes")
        .select([
          "dishes.id", 
          "dishes.name",
          "dishes.description",
        ])
        .where("ingredients.user_id", user_id)
        .whereIn(knex.raw("LOWER(ingredient)"), caseInsensitive)
        .innerJoin("ingredients", "dishes.id", "ingredients.dish_id")
        .groupBy("dishes.id")
        .orderBy("dishes.name");
  
      return join;

    }catch(error){
      throw new AppError(error.message, 400)
    }
  }

  async selectDish(name, user_id) {
    try {
      const dish = await knex("dishes")
        .select([
          "dishes.id",
          "dishes.name",
          // "dishes.user_id",
          "dishes.description",
        ])
        .where({ user_id })
        .whereLike("name", `%${name}`)
        .orderBy("name");
  
      return dish;

    }catch(error){
      throw new AppError(error.message, 404)
    }
  }

  async findIngredientsByUser(user_id){
    try {
      const ingredients = await knex("ingredients").where({user_id})
  
      return ingredients
      
    } catch (error) {
      throw new AppError(error.message, 404)
      
    }
  }

  async remove(id){

    try {
      const dish = await knex("dishes").where({id}).delete()
  
      return dish
      
    } catch (error) {
      throw new AppError(error.message, 400)
      
    }
  }

  async renewDish(id, name,description, category, user_id){
    try {
       return await knex("dishes").where({id}).update({
        name: name,
        category: category,
        description: description,
        user_id: user_id
      })
      
    } catch (error) {
      throw new AppError(error.message, 400)
    }
  }

  async removeIngredients({id}){
    try {
      return await knex("ingredients").where({dish_id: id}).delete()
    } catch (error) {
      throw new AppError(error.message, 400)
    }
  }
}

module.exports = DishesRepository;
