import DrinkService from '../services/DrinkService.js';
import ApiError from "../exceptions/ApiError.js"

class DrinkController{
    async create(req, res, next) {
        const { price, translation } = req.body;
        
        if(!price || !translation){
            next(ApiError.badRequest('You have not send all the necessary data'));
            return;
        }

        req.body.translation = JSON.parse(req.body.translation);  //used to test form-data request from POSTMAN
        const drinks = await DrinkService.create(req.body, req.files.image);

        res.status(200);
        return res.json(drinks);
    }

    async getAll(req, res, next) {
        const drinks = await DrinkService.getAll();
        
        res.status(200);
        return res.json(drinks);
    }

    async getOne(req, res, next) {
        const { id } = req.params.id;

        if(!id){
            next(ApiError.badRequest('You have not send the id'));
            return; 
        }

        const drink = await DrinkService.getOne(req.params.id);
        
        res.status(200);
        return res.json(drink);
    }

    async update(req, res, next) {
        const { price, translation } = req.body;
        
        if(!price || !translation){
            next(ApiError.badRequest('You have not send all the necessary data'));
            return;
        }

        const updatedDrink = await DrinkService.update(req.body);
        
        res.status(200);
        return res.json(updatedDrink);
    }

    async delete(req, res, next) {
        const { id } = req.params.id;

        if(!id){
            next(ApiError.badRequest('You have not send the id'));
            return; 
        }
        
        const drink = await DrinkService.delete(req.params.id);
        
        res.status(200);
        return res.json(drink);
    }
}

export default new DrinkController();