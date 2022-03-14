import Products from "../models/ProductModel.js";

class ProductService {
  async create(product, picture) {
    const createdProducts = await Products.create(product);
    return createdProducts;
  }

  async getAll() {
    const products = await Products.find();
    return products;
  }

  async getOne(id) {
    if (!id) {
      throw new Error("не указан ID");
    }
    const product = await Products.findById(id);
    return product;
  }

  async update(product) {
    if (!product._id) {
      throw new Error("не указан ID");
    }
    const updatedProduct = await Products.findByIdAndUpdate(
      product._id,
      product,
      { new: true }
    );
    return updatedProduct;
  }

  async delete(id) {
    if (!id) {
      throw new Error("не указан ID");
    }
    const product = await Products.findByIdAndDelete(id);
    return product;
  }
}

export default new ProductService();
