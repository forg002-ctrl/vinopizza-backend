import express from "express";
import ProductController from "../controllers/ProductController.js";

const router = express.Router();

router.post('/', ProductController.create);
router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getOne);
router.put('/', ProductController.update);
router.delete('/:id', ProductController.delete);

export default router;  