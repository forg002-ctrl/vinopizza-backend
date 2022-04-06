import express from "express";
import DrinkController from "../controllers/DrinkController.js";
import authMiddleware from "../midllewares/auth-middleware.js";

const router = express.Router();

router.post('/', authMiddleware, DrinkController.create);
router.get('/', DrinkController.getAll);
router.get('/:id', DrinkController.getOne);
router.put('/', authMiddleware, DrinkController.update);
router.delete('/:id', authMiddleware, DrinkController.delete);

export default router;  