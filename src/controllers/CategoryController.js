import CategoryService from "../services/CategoryService.js";

class CategoryController {
  async create(req, res) {
    try {
      const categories = await CategoryService.create(req.body);
      
      return res.json(categories);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getAll(req, res) {
    try {
      const categories = await CategoryService.getAll();
      
      return res.json(categories);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getOne(req, res) {
    try {
      const category = await CategoryService.getOne(req.params.id);
      
      return res.json(category);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async update(req, res) {
    try {
      const updatedCategory = await CategoryService.update(req.body);
      
      return res.json(updatedCategory);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async delete(req, res) {
    try {
      const category = await CategoryService.delete(req.params.id);
      
      return res.json(category);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

export default new CategoryController();