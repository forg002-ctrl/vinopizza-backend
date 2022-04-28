import MenuService from '../services/MenuService.js';

class MenuController {
    async getAll(req, res, next) {
        const menu = await MenuService.getAll();

        res.status(200);
        return res.json(menu);
    }
}

export default new MenuController();