import MenuService from '../services/MenuService.js';

class MenuController{
    async getAll(req, res) {
        try {
            const categories = await MenuService.getAll();
            return res.json(categories);
        } catch(error) {
            res.status(500).json(error.message);
        }
    }
}

export default new MenuController();