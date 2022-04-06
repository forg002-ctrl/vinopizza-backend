import express from "express";
import MealController from "../controllers/MealController.js";
import authMiddleware from "../midllewares/auth-middleware.js";

const router = express.Router();

router.post('/', authMiddleware, MealController.create);
router.get('/', MealController.getAll);
router.get('/:id', MealController.getOne);
router.put('/', authMiddleware, MealController.update);
router.delete('/:id', authMiddleware, MealController.delete);

export default router;  