const AppError = require("../utils/AppError")
const knex = require("../database/knex");
const OrdersRepository = require("../repositories/OrdersRepository")
const OrdersService = require("../services/OrdersService")

class OrderController {
  async create(request, response) {
    const userId = request.user.id
    const orders = request.body

    const ordersRepository = new OrdersRepository()
    const ordersService = new OrdersService(ordersRepository)

    await ordersService.insert(userId, orders)

    return response.json()
  }
  async show(request, response) {
    const { id } = request.params;
    const {id: user_id, role} = request.user

    const ordersRepository = new OrdersRepository()
    const ordersService = new OrdersService(ordersRepository)

    const orders = await ordersService.listbyId(id, role, user_id)

    return response.json({orders})
   }
  async index(request, response) { 
    const {id: user_id, role} = request.user

    const ordersRepository = new OrdersRepository()
    const ordersService = new OrdersService(ordersRepository)

    const orders = await ordersService.listAllOrders(user_id, role)
    return response.json(orders)
  }
  async delete(request, response) {
    const { id } = request.params;

    const ordersRepository = new OrdersRepository()
    const ordersService = new OrdersService(ordersRepository)

    await ordersService.remove(id)
    
    return response.json()
   }
}

module.exports = OrderController;