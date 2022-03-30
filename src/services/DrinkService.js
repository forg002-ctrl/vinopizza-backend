import Drinks from '../models/DrinkModel.js';
import FileService from './FileService.js';

class MealService{
    async create(data, image) {
        const fileName = FileService.saveFile(image);
        const createdItem = await Drinks.create({...data, image:fileName});
        
        return createdItem;
    }
    
    async getAll() {
        const items = await Drinks.find();
        
        return items;
    }

    async getOne(id) {
        const item = await Drinks.findById(id);
        
        return item;
    }

    async update(item) {
        const updatedItem = await Drinks.findByIdAndUpdate(item._id, item, {new: true});
        
        return updatedItem;
    }
    

    async delete(id) {
        const deletedItem = await Drinks.findByIdAndDelete(id);
        FileService.deleteFile(deletedItem.image);
        
        return deletedItem;
    }
}

export default new MealService();