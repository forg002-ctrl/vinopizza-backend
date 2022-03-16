import OrderSerivce from '../services/OrderService.js';

class OrderController{
    async create(req, res) {
        try {
            // req.body.translation = JSON.parse(req.body.translation); //used to test form-data request from POSTMAN
            const order = await OrderSerivce.create(req.body);
            
            return res.json(order);
        } catch(error) {
            res.status(500).json(error.message);
        }
    }

    async getAll(req, res) {
        try {
            const orders = await OrderSerivce.getAll();
            
            return res.json(orders);
        } catch(error) {
            res.status(500).json(error.message);
        }
    }

    async getOne(req, res) {
        try {
            const order = await OrderSerivce.getOne(req.params.id);
            
            return res.json(order);
        } catch(error) {
            res.status(500).json(error.message);
        }
    }

    async update(req, res) {
        try {
            const updatedOrder = await OrderSerivce.update(req.body);
            
            return res.json(updatedOrder);
        } catch(error) {
            res.status(500).json(error.message);
        }
    }

    async delete(req, res) {
        try {
            const order = await OrderSerivce.delete(req.params.id);
           
            return res.json(order);
        } catch(error) {
            res.status(500).json(error.message);
        }
    }
}

export default new OrderController();