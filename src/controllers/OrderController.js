import OrderSerivce from '../services/OrderService.js';
import ApiError from "../exceptions/ApiError.js"

class OrderController{
    async create(req, res, next) {
        const { customer_info, items, total} = req.body;

        if(!customer_info){
            next(ApiError.badRequest("You haven't sent the field 'customer_info'"));
            return;
        }

        if(!items){
            next(ApiError.badRequest("You haven't sent the field 'items'"));
            return;
        }

        if(!total){
            next(ApiError.badRequest("You haven't sent the field 'total'"));
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
        const { id } = req.body;

        if(!id){
            next(ApiError.badRequest("You haven't sent the field 'id'"));
            return;
        }

        const order = await OrderSerivce.getOne(req.params.id);
        
        return res.json(order);
    }

    async update(req, res, next) {
        const { customer_info, items, total} = req.body;

        if(!customer_info){
            next(ApiError.badRequest("You haven't sent the field 'customer_info'"));
            return;
        }

        if(!items){
            next(ApiError.badRequest("You haven't sent the field 'items'"));
            return;
        }

        if(!total){
            next(ApiError.badRequest("You haven't sent the field 'total'"));
            return;
        }

        const updatedOrder = await OrderSerivce.update(req.body);
        
        return res.json(updatedOrder);
    }

    async delete(req, res, next) {
        const { id } = req.body;

        if(!id){
            next(ApiError.badRequest("You haven't sent the field 'id'"));
            return;
        }
        
        const order = await OrderSerivce.delete(req.params.id);
           
        return res.json(order);
    }
}

export default new OrderController();