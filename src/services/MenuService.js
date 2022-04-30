import Drinks from '../models/DrinkModel.js';
import Meals from '../models/MealModel.js';
import Categories from '../models/CategoryModel.js';


class MenuService {
    async getAll() {
        const categories = await Categories.find();
        const meals = await Meals.find();
        const drinks = await Drinks.find();

        const menu = {
            "categories": categories,
            "meals": meals,
            "drinks": drinks
        }

        return menu;
    }
}

export default new MenuService();