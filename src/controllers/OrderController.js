import OrderSerivce from '../services/OrderService.js';
import ApiError from "../exceptions/ApiError.js"

class OrderController {
    async create(req, res, next) {
        const { customer_info, items, total } = req.body;

        if (!customer_info || !items || !total) {
            next(ApiError.badRequest("You haven't sent all the necessary data"));
            return;
        }

        const order = await OrderSerivce.create(req.body);
        return res.json(order);
    }

    async getAll(req, res, next) {
        const orders = await OrderSerivce.getAll();

        return res.json(orders);
    }

    async getOne(req, res, next) {
        const order = await OrderSerivce.getOne(req.params.id);

        if (!order) {
            next(ApiError.badRequest("Wrong id"));
            return;
        }

        return res.json(order);
    }

    async update(req, res, next) {
        const orderToUpdate = req.body;

        if (!orderToUpdate.customer_info || !orderToUpdate.items || !orderToUpdate.total) {
            next(ApiError.badRequest("You haven't sent all the necessary data"));
            return;
        }

        const updatedOrder = await OrderSerivce.update(req.body);

        if (!updatedOrder) {
            next(ApiError.badRequest("Wrong id"));
            return;
        }

        return res.json(updatedOrder);
    }

    async delete(req, res, next) {
        const order = await OrderSerivce.delete(req.params.id);

        if (!order) {
            next(ApiError.badRequest("Wrong id"));
            return;
        }

        return res.json(order);
    }
}

export default new OrderController();