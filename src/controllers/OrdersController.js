const AppError = require("../utils/AppError")
const knex = require("../database/knex");

class OrderController {
  async create(request, response) {
    const userId = request.user.id

    const orders = request.body

    let total = [];
    let userOrder = [];
    
    for (let order of orders) {
      const results = await knex("dishes").whereIn("id", [order.id])
      for (const result of results) {
        total.push(order.amount * result.value)
        userOrder.push(`${order.amount}x ${result.name} R$ ${result.value.toFixed(2)}`)
      
      }
      
    }
    const detailOrder = JSON.stringify(userOrder)
    const detailing = detailOrder.toString().slice(1, -1)
    const order = await knex("orders").insert({
      detailing: detailing,
      user_id: userId
    })
    const sum = total.reduce((total, current) => total + current, 0);
    console.log(order)

    return response.json()
  }
  show(request, response) { }
  index(request, response) { }
  delete(request, response) { }
}

module.exports = OrderController;