import Categories from "../models/CategoryModel.js";
import Products from "../models/ProductModel.js"
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
    //TODO - if category name was changed -> change the "сategory" in all the products with this "old category"
    if (!category._id) {
      throw new Error("не указан ID");
    }
    
    const oldCategory = await Categories.findById(category._id);    

    if(oldCategory.translation.ru.name != category.translation.ru.name){
        const productsToChange = await Products.find(oldCategory.translation.ru);
        productsToChange.forEach(product => {
            product.translation.ru.category = category.translation.ru.name;
            ProductService.update(product);
        }); 
    }

    if(oldCategory.translation.ro.name != category.translation.ro.name){
        const productsToChange = await Products.find(oldCategory.translation.ru);
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
    return updatedProduct;
  }

  async delete(id) {
    //TODO - if category name is deleted-> delete all the products with this "category"
    if (!id) {
      throw new Error("не указан ID");
    }

    const categoryToDelete = await Categories.findByIdAndDelete(id);  
    console.log(categoryToDelete);

      const productsToDelete = await Products.find(categoryToDelete.translation.ro);
      productsToDelete.forEach(product => {
          ProductService.delete(product._id);
      });

      console.log(productsToDelete);

    return categoryToDelete;
  }
}

export default new CategoryService();
