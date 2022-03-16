import Categories from '../models/CategoryModel.js';
import Products from '../models/ProductModel.js';


class MenuService{
    async getAll() {
        const categories = await Categories.find();
        const products = await Products.find();
        
        const menu = {
            "categories": categories,
            "products": products
        }
        
        return menu;
    }
}

export default new MenuService();