const knex = require('../database/knex');

class DishesController{

    async create(request, response){
        const {name, category, description, ingredients} = request.body;
        const user_id = request.user.id

        const [dish_id] = await knex("dishes").insert({
            name,
            category,
            description,
            user_id
        })

        const ingredientsInsert = ingredients.map(name => {
            return {
                dish_id,
                name,
                user_id
            }
        })
    
        await knex("ingredients").insert(ingredientsInsert)
        
        return response.json()
    }
    async show(){}
    async index(){}
    async update(){}
    async delete(){}

}

module.exports = DishesController