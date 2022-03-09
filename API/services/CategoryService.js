import Categories from '../models/CategoryModel.js';

class ProductService{
    async create(category) {
        const createdCategories = await Categories.create(category);
        return createdCategories;
    }

    async getAll() {
        const categories = await Categories.find();
        return categories;
    }

    async getOne(id) {
        if(!id){
            throw new Error('не указан ID');
        }
        const category = await Categories.findById(id);
        return category;
    }

    async update(category) {
        if(!category._id){
            throw new Error('не указан ID');
        }
        const updatedProduct = await Categories.findByIdAndUpdate(category._id, category, {new: true});
        return updatedProduct;
    }
    

    async delete(id) {
        if(!id){
            throw new Error('не указан ID');
        }
        const category = await Categories.findByIdAndDelete(id);
        return category;
    }
}

export default new ProductService();