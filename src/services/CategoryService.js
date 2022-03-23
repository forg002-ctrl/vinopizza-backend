import Categories from "../models/CategoryModel.js";
import Product from "../models/ProductModel.js"
import ProductService from "../services/ProductService.js"

class CategoryService {
  async create(product) {
    const createdCategories = await Categories.create(product);
    
    return createdCategories;
  }

  async getAll() {
    const categories = await Categories.find();
    
    return categories;
  }

  async getOne(id) {
    if (!id) {
      throw new Error("не указан ID");
    }
    const category = await Categories.findById(id);
    
    return category;
  }

  async update(category) {
    if (!category._id) {
      throw new Error("не указан ID");
    }
    
    const oldCategory = await Categories.findById(category._id);    

    if(oldCategory.translation.ru.name != category.translation.ru.name){
        const productsToChange = await Product.find(oldCategory.translation.ru);
        productsToChange.forEach(product => {
            product.translation.ru.category = category.translation.ru.name;
            ProductService.update(product);
        }); 
    }

    if(oldCategory.translation.ro.name != category.translation.ro.name){
        const productsToChange = await Product.find(oldCategory.translation.ru);
        productsToChange.forEach(product => {
            product.translation.ro.category = category.translation.ro.name;
            ProductService.update(product);
        });
    }

    const updatedCategory = await Categories.findByIdAndUpdate(
        category._id,
        category,
        { new: true }
    );

    return updatedCategory;
  }

  async delete(id) {
    if (!id) {
      throw new Error("не указан ID");
    }

    const categoryToDelete = await Categories.findByIdAndDelete(id);  
    const productsToDelete = await Product.find(categoryToDelete.translation.ro);

    productsToDelete.forEach(product => {
          ProductService.delete(product._id);
    });

    // productsToDelete = await Product.find(categoryToDelete.translation.ru);

    // productsToDelete.forEach(product => {
    //   ProductService.delete(product._id);
    // });

    return categoryToDelete;
  }
}

export default new CategoryService();