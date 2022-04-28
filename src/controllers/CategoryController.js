import CategoryService from "../services/CategoryService.js";
import ApiError from "../exceptions/ApiError.js"

class CategoryController {
  async create(req, res, next) {
    const { translation } = req.body;

    if (!translation) {
      next(ApiError.badRequest('You have not send all the necessary data'));
      return;
    }

    const categories = await CategoryService.create(translation);

    res.status(200);
    return res.json(categories);
  }

  async getAll(req, res, next) {
    const categories = await CategoryService.getAll();

    res.status(200);
    return res.json(categories);
  }

  async getOne(req, res, next) {
    const { id } = req.params.id;

    if (!id) {
      next(ApiError.badRequest('You have not send all the necessary data'));
      return;
    }

    const category = await CategoryService.getOne(id);

    res.status(200);
    return res.json(category);
  }

  async update(req, res, next) {
    const { translation } = req.body;

    if (!translation) {
      next(ApiError.badRequest('You have not send all the necessary data'));
      return;
    }

    const updatedCategory = await CategoryService.update(translation);

    res.status(200);
    return res.json(updatedCategory);
  }

  async delete(req, res, next) {
    const { id } = req.params.id;

    if (!id) {
      next(ApiError.badRequest('You have not send all the necessary data'));
      return;
    }

    const category = await CategoryService.delete(id);

    res.status(200);
    return res.json(category);
  }
}

export default new CategoryController();