import OrderSerivce from '../services/OrderService.js';

class OrderController{
    async create(req, res, next) {
        try {
            const order = await OrderSerivce.create(req.body);
            
            return res.json(order);
        } catch(error) {
            res.status(500).json(error.message);
        }
    }

    async getAll(req, res, next) {
        try {
            const orders = await OrderSerivce.getAll();
            
            return res.json(orders);
        } catch(error) {
            res.status(500).json(error.message);
        }
    }

    async getOne(req, res, next) {
        try {
            const order = await OrderSerivce.getOne(req.params.id);
            
            return res.json(order);
        } catch(error) {
            res.status(500).json(error.message);
        }
    }

    async update(req, res, next) {
        try {
            const updatedOrder = await OrderSerivce.update(req.body);
            
            return res.json(updatedOrder);
        } catch(error) {
            res.status(500).json(error.message);
        }
    }

    async delete(req, res, next) {
        try {
            const order = await OrderSerivce.delete(req.params.id);
           
            return res.json(order);
        } catch(error) {
            res.status(500).json(error.message);
        }
    }
}

export default new OrderController();