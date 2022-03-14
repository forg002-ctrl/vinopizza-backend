import express from "express";
import CategoryController from "../controllers/CategoryController.js";

const router = express.Router();

router.post('/', CategoryController.create);
router.get('/', CategoryController.getAll);
router.get('/:id', CategoryController.getOne);
router.put('/', CategoryController.update);
router.delete('/:id', CategoryController.delete);

export default router;  