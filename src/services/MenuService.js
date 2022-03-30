import Drinks from '../models/DrinkModel.js';
import Meals from '../models/MealModel.js';
import Categories from '../models/CategoryModel.js';


class MenuService{
    async getAll() {
        const categories = await Categories.find();
        const products = await Meals.find();
        const drinks = await Drinks.find();
        
        const menu = {
            "categories": categories,
            "products": products,
            "drinks": drinks
        }
        
        return menu;
    }
}

export default new MenuService();