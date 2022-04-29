import CategoryService from "../services/CategoryService.js";
import ApiError from "../exceptions/ApiError.js"

class CategoryController {
  async create(req, res, next) {
    const translation  = req.body;

    if (!translation) {
      next(ApiError.badRequest('You have not send all the necessary data'));
      return;
    }

    const category = await CategoryService.create(translation);

    res.status(200);
    return res.json(category);
  }

  async getAll(req, res, next) {
    const categories = await CategoryService.getAll();

    res.status(200);
    return res.json(categories);
  }

  async getOne(req, res, next) {
    const category = await CategoryService.getOne(req.params.id);

    if (!category) {
      next(ApiError.badRequest("Wrong id"));
      return;
    }

    res.status(200);
    return res.json(category);
  }

  async update(req, res, next) {
    const categoryToUdpate = req.body;

    if (!categoryToUdpate.translation || !categoryToUdpate._id) {
      next(ApiError.badRequest('You have not send all the necessary data'));
      return;
    }

    const updatedCategory = await CategoryService.update(categoryToUdpate);

    if (!updatedCategory) {
      next(ApiError.badRequest("Wrong id"));
      return;
    }

    res.status(200);
    return res.json(updatedCategory);
  }

  async delete(req, res, next) {
    const category = await CategoryService.delete(req.params.id);

    if (!category) {
      next(ApiError.badRequest("Wrong id"));
      return;
    }

    res.status(200);
    return res.json(category);
  }
}

export default new CategoryController();