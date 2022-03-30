import express from "express";
import DrinkController from "../controllers/DrinkController.js";

const router = express.Router();

router.post('/', DrinkController.create);
router.get('/', DrinkController.getAll);
router.get('/:id', DrinkController.getOne);
router.put('/', DrinkController.update);
router.delete('/:id', DrinkController.delete);

export default router;  