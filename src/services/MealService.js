import Meals from '../models/MealModel.js';
import FileService from './FileService.js';

class MealService{
    async create(data, image) {
        const fileName = FileService.saveFile(image);
        const createdItem = await Meals.create({...data, image:fileName});
        
        return createdItem;
    }
    
    async getAll() {
        const items = await Meals.find();
        
        return items;
    }

    async getOne(id) {
        const item = await Meals.findById(id);
        
        return item;
    }

    async update(data) {
        const updatedItem = await Meals.findByIdAndUpdate(data._id, data, {new: true});
        
        return updatedItem;
    }
    

    async delete(id) {
        const deletedItem = await Meals.findByIdAndDelete(id);
        FileService.deleteFile(deletedItem.image);
        
        return deletedItem;
    }
}

export default new MealService();