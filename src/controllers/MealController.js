import MealService from '../services/MealService.js';
import ApiError from "../exceptions/ApiError.js"

class MealController{
    async create(req, res, next) {
        const { price, translation, recommendedVines } = req.body;
        const image = req.files; 

        if(!price){
            next(ApiError.badRequest("You haven't sent the field 'price'"));
            return;
        }

        if(!translation){
            next(ApiError.badRequest("You haven't sent the field 'translation'"));
            return;
        }

        if(!recommendedVines){
            next(ApiError.badRequest("You haven't sent the field 'recommendedVines'"));
            return;
        }

        if(!image){
            next(ApiError.badRequest('You have not send the image'));
            return;
        }   

        req.body.translation = JSON.parse(req.body.translation);  //used to test form-data request from POSTMAN
        const meals = await MealService.create(req.body, req.files.image);

        res.status(200);
        return res.json(meals);
    }

    async getAll(req, res, next) {
        const meals = await MealService.getAll();
        
        res.status(200);
        return res.json(meals);
    }

    async getOne(req, res, next) {
        const { id } = req.params.id;

        if(!id){
            next(ApiError.badRequest('You have not send the id'));
            return; 
        }

        const meal = await MealService.getOne(req.params.id);
        
        res.status(200);
        return res.json(meal);
    }

    async update(req, res, next) {
        const { price, translation } = req.body;
        
        if(!price){
            next(ApiError.badRequest("You haven't sent the field 'price'"));
            return;
        }

        if(!translation){
            next(ApiError.badRequest("You haven't sent the field 'translation'"));
            return;
        }

        const updatedMeal = await MealService.update(req.body);
        
        res.status(200);
        return res.json(updatedMeal);
    }

    async delete(req, res, next) {
        const { id } = req.params.id;

        if(!id){
            next(ApiError.badRequest('You have not send the id'));
            return; 
        }
        
        const meal = await MealService.delete(req.params.id);
        
        res.status(200);
        return res.json(meal);
    }
}

export default new MealController();