const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class DishesRepository {
  async createDish({ name, category, description, user_id, value }) {
    try {
      const dish = await knex("dishes").insert({
        name,
        category,
        description,
        user_id,
        value
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

  async listById(){

    try {
      const dishes = await knex("dishes")
      .select(["dishes.image",
      "dishes.id",
      "dishes.name", 
      "dishes.category", 
      "dishes.description", 
      "dishes.value",
    ])
  
      return {dishes}
      
    } catch (error) {
      throw new AppError(error.message, 404)
    }
  }

  async dishFoundById(id) {
    try {
      const dish = await knex("dishes")
      .select([
        "dishes.image",
        "dishes.name", 
        "dishes.category", 
        "dishes.description", 
        "dishes.value"
      ])
      .where({ id }).first();
      
      const ingredients = await knex("ingredients")
      .select(["ingredient"])
        .where({ dish_id: id })
        .orderBy("ingredient");

      const result = {
        ...{dish},
        ingredients,
      };
  
      return result;

    }catch(error){
      throw new AppError(error.message, 404)
    }
  }

  async linkDishesIngredients(name, filterIngredients) {
    try {
      const caseInsensitive = filterIngredients.map(ingredient => ingredient.toLowerCase())
  
      const join = await knex("ingredients")
        .select([
          "dishes.id", 
          "dishes.name", 
          "dishes.user_id"
        ])
        .whereLike("dishes.name", `%${name}%`)
        .whereIn(knex.raw("LOWER(ingredient)"), caseInsensitive)
        .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
        .groupBy("dishes.id")
        .orderBy("dishes.name");
  
      return join;

    }catch(error){
      throw new AppError(error.message, 400)
    }
  }

  async listByIngredients(filterIngredients) {
    try {
      const caseInsensitive = filterIngredients.map(ingredient => ingredient.toLowerCase())

      const dishes = await knex("ingredients")
      .select(["ingredients.dish_id"])
      .whereLike("ingredient", `%${caseInsensitive}%`)
      const dishesFound = dishes.map( dish => this.findDishById(dish.dish_id))
      
      const dishSelected = await Promise.all(dishesFound)
  
      return dishSelected;

    }catch(error){
      throw new AppError(error.message, 400)
    }
  }

  async selectDish(name) {
    try {
      const dish = await knex("dishes")
        .select([
          "dishes.id",
          "dishes.name",
          "dishes.description",
        ])
        .whereLike("name", `%${name}%`)
        .orderBy("name");
  
      return dish;

    }catch(error){
      throw new AppError(error.message, 400)
    }
  }

  async allIngredients(){
    try {
      const ingredients = await knex("ingredients")
      .select("*")
      return ingredients
      
    } catch (error) {
      throw new AppError(error.message, 404)
      
    }
  }

  async findDishById(id) {
    const dish = await knex("dishes")
     .select("*")
     .where({ id }).first();
      
    return dish;
   
  }

  async remove(id){
    return await knex("dishes").where({id}).delete()

    
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
