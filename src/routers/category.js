import express from "express";
import CategoryController from "../controllers/CategoryController.js";
import authMiddleware from "../midllewares/auth-middleware.js";

const router = express.Router();

router.post('/', authMiddleware, CategoryController.create);
router.get('/', CategoryController.getAll);
router.get('/:id', CategoryController.getOne);
router.put('/', authMiddleware, CategoryController.update);
router.delete('/:id', authMiddleware, CategoryController.delete);

export default router;  