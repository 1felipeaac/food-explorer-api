const AppError = require("../utils/AppError")
const knex = require("../database/knex");

class OrderControler{
    async create(request, response){
        const user_id = request.user.id
      //   const {dishes} = request.query
      //   const amount = request.body
        
      //   const filteredDishes = dishes.split(',').map(dish => Number(dish.trim()))
      //   const result = await knex("dishes").whereIn("id", filteredDishes)
        
      //  for(let index = 0; index < result.length; index++){
      //   const dish = result[index]
      //   console.log(dish.name)
      //  }

      //   return response.json(({user_id, result}))
      const orders = request.body

      const description = orders.map(order => [order.amount, order.name, (order.amount * order.value)])

      const order = await knex("orders").insert({
        description,
        user_id
      })

      console.log(description)
      return response.json(orders)
    }
    show(request, response){}
    index(request, response){}
    delete(request, response){}
}

module.exports = OrderControler;