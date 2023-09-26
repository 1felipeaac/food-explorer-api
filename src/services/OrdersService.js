const AppError = require("../utils/AppError");

class OrdersService{
    constructor(ordersService) {
        this.ordersService = ordersService;
      }

    async insert(userId, orders){
    let total = [];
    let userOrder = [];
    
    for (let order of orders) {
      const results = await this.ordersService.listOrdersById([order.id])
      for (const result of results) {
        total.push(order.amount * result.value)
        userOrder.push(`${order.amount}x ${result.name} R$ ${result.value.toFixed(2)}`)
      }
    }
    const detailOrder = JSON.stringify(userOrder)
    const detailing = detailOrder.toString().slice(1, -1)

    const sum = total.reduce((total, current) => total + current, 0);

    const orderCreated = await this.ordersService.createOrder(detailing, userId, sum)

    return orderCreated
    }

    async listbyId(id, role, user_id){
        const findOrder = await this.ordersService.findOrderById(id);

        if(role === 'admin') {
            return findOrder
        }else{
            if(findOrder.user_id!== user_id) {
                throw new AppError("Você não tem permissão para acessar este pedido", 401)
            }else{
                return findOrder
            }
        }
    }

    async listAllOrders(id, role){
        const selectOrders = await this.ordersService.selectedOrder()
        const selectOrdersByUserId = await this.ordersService.selectedOrderByUserId(id)

        if(role === 'admin') {
            return selectOrders
        }else{
            return selectOrdersByUserId
        }
    }

    async remove(id, user_id){
        const findOrder = await this.ordersService.findOrderById(id)
        if(!findOrder || (findOrder.user_id !== user_id)) {
            throw new AppError("Pedido não encontrado", 404)
        }
        return await this.ordersService.deleteOrder(id)
    }

    async update(id, orderStatus){

        const enumStatus = await this.ordersService.verifyStatus()
        const verifyStatus = enumStatus.map(name => name.status)

        if (!verifyStatus.includes(orderStatus)) {
            throw new AppError("Status invalido", 400)
          }

        const updateStatus = await this.ordersService.updateStatusOrder(id, orderStatus)

        return updateStatus
            
    }
}

module.exports = OrdersService;