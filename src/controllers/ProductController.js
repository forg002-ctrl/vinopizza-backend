import Products from "../models/ProductModel.js";
import ProductService from "../services/ProductService.js";

class ProductController {
  async create(req, res) {
    try {
      const products = await ProductService.create(req.body);
      res.json(products);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getAll(req, res) {
    try {
      const products = await ProductService.getAll();
      return res.json(products);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getOne(req, res) {
    try {
      const product = await ProductService.getOne(req.params.id);
      return res.json(product);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async update(req, res) {
    try {
      const updatedProduct = await ProductService.update(req.body);
      return res.json(updatedProduct);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async delete(req, res) {
    try {
      const product = await ProductService.delete(req.params.id);
      return res.json(product);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

export default new ProductController();
