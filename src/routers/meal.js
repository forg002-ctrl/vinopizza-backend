import express from "express";
import MealController from "../controllers/MealController.js";

const router = express.Router();

router.post('/', MealController.create);
router.get('/', MealController.getAll);
router.get('/:id', MealController.getOne);
router.put('/', MealController.update);
router.delete('/:id', MealController.delete);

export default router;  