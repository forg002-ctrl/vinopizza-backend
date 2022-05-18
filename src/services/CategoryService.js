import Categories from "../models/CategoryModel.js";
import Meal from "../models/MealModel.js";
import Drink from "../models/DrinkModel.js";
import MealService from "../services/MealService.js";
import DrinkService from "../services/DrinkService.js";

class CategoryService {
  async create(category) {
    const createdCategories = await Categories.create(category);

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

    if (oldCategory.translation.ru.name != category.translation.ru.name) {
      const mealsToChange = await Meal.find(oldCategory.translation.ru);
      const drinksToChange = await Drink.find(oldCategory.translation.ru)

      if (mealsToChange) {
        mealsToChange.forEach(meal => {
          meal.translation.ru.category = category.translation.ru.name;
          MealService.update(meal);
        });
      }

      if (drinksToChange) {
        drinksToChange.forEach(drink => {
          drink.translation.ru.category = category.translation.ru.name;
          DrinkService.update(drink);
        })
      }
    }

    if (oldCategory.translation.ro.name != category.translation.ro.name) {
      const mealsToChange = await Meal.find(oldCategory.translation.ro);
      const drinksToChange = await Drink.find(oldCategory.translation.ro)

      if (mealsToChange) {
        mealsToChange.forEach(meal => {
          meal.translation.ro.category = category.translation.ro.name;
          MealService.update(meal);
        });
      }

      if (drinksToChange) {
        drinksToChange.forEach(drink => {
          drink.translation.ro.category = category.translation.ro.name;
          DrinkService.update(drink);
        })
      }
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
    const mealsToDelete = await Meal.find(categoryToDelete.translation.ro);
    const drinksToDelete = await Drink.find(categoryToDelete.translation.ro);

    if (mealsToDelete) {
      mealsToDelete.forEach(meal => {
        MealService.delete(meal._id)
      })
    }

    if (drinksToDelete) {
      drinksToDelete.forEach(meal => {
        DrinkService.delete(meal._id)
      })
    }

    return categoryToDelete;
  }
}

export default new CategoryService();