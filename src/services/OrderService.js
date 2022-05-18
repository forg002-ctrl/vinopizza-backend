import Orders from '../models/OrderModel.js';

class OrderService {
    async create(order) {
        const createdOrder = await Orders.create(order);

        return createdOrder;
    }

    async getAll() {
        const orders = await Orders.find();

        return orders;
    }

    async getOne(id) {
        if (!id) {
            throw new Error('не указан ID');
        }
        const order = await Orders.findById(id);

        return order;
    }

    async update(order) {
        if (!order._id) {
            throw new Error('не указан ID');
        }
        const updatedOrder = await Orders.findByIdAndUpdate(order._id, order, { new: true });

        return updatedOrder;
    }


    async delete(id) {
        if (!id) {
            throw new Error('не указан ID');
        }
        const order = await Orders.findByIdAndDelete(id);

        return order;
    }
}

export default new OrderService();