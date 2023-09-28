const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class OrdersRepository {
  async listOrdersById(id) {
    const results = await knex("dishes").whereIn("id", [id]);

    return results;
  }

  async createOrder(detailing, userId, sum) {
    const order = await knex("orders").insert({
      detailing: detailing,
      user_id: userId,
      bill: sum,
    });
    return order;
  }

  async findOrderById(id) {
    const order = await knex("orders").where({ id }).first();
    return order;
  }

  async selectedOrder() {
    const order = await knex.select("*").from("orders");

    return order;
  }

  async selectedOrderByUserId(id) {
    const selectOrdersByUserId = await knex
      .select("*")
      .from("orders")
      .where({ user_id: id });
    return selectOrdersByUserId;
  }

  async deleteOrder(id) {
    const deleted = await knex("orders").where({ id }).del();
    return deleted;
  }

  async verifyStatus() {
    const enumStatus = await knex("orders").distinct("status");

    return enumStatus;
  }

  async updateStatusOrder(id, status) {
    const statusOrder = await knex("orders")
      .where({ id })
      .update({ status: status });
    return statusOrder;
  }
}

module.exports = OrdersRepository;
