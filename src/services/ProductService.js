import Product from '../models/ProductModel.js';
import FileService from './FileService.js';

class ProductService{
    async create(product, image) {
        const fileName = FileService.saveFile(image);
        const createdProducts = await Product.create({...product, image:fileName});
        
        return createdProducts;
    }
    
    async getAll() {
        const products = await Product.find();
        
        return products;
    }

    async getOne(id) {
        if(!id){
            throw new Error('не указан ID');
        }
        const product = await Product.findById(id);
        
        return product;
    }

    async update(product) {
        if(!product._id){
            throw new Error('не указан ID');
        }
        const updatedProduct = await Product.findByIdAndUpdate(product._id, product, {new: true});
        
        return updatedProduct;
    }
    

    async delete(id) {
        if(!id){
            throw new Error('не указан ID');
        }
        const product = await Product.findByIdAndDelete(id);
        FileService.deleteFile(product.image);
        
        return product;
    }
}

export default new ProductService();