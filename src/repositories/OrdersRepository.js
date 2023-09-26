const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class OrdersRepository{
    async listOrdersById(id){
        try {
            const results = await knex("dishes").whereIn("id", [id])

            return results;
        } catch (error) {
            throw new AppError(error.message);
        }
    }

    async createOrder(detailing, userId, sum){

        try {
            const order = await knex("orders").insert({
                detailing: detailing,
                user_id: userId,
                bill: sum
              })
            return order;
            
        } catch (error) {
            throw new AppError(error.message);
        }
    }

    async findOrderById(id){
        try {
            const order = await knex("orders").where({ id }).first();
            return order;
            
        } catch (error) {
            throw new AppError(error.message);
        }
    }

    async selectedOrder(){
        try {
            const order = await knex.select("*").from("orders")

            return order;
            
        } catch (error) {
            throw new AppError(error.message);
        }
    }

    async selectedOrderByUserId(id){
        try {
            const selectOrdersByUserId = await knex.select("*").from("orders").where({user_id: id})
            return selectOrdersByUserId;
            
        } catch (error) {
            throw new AppError(error.message)
        }
    }

    async deleteOrder(id){
        try {
            const deleted = await knex("orders").where({ id }).del();
            return deleted;
            
        } catch (error) {
            throw new AppError(error.message);
        }
    }
}

module.exports = OrdersRepository;