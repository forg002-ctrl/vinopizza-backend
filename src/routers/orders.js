import express from "express";
import OrderController from "../controllers/OrderController.js";
import authMiddleware from "../midllewares/auth-middleware.js";

const router = express.Router();

router.post('/', authMiddleware, OrderController.create);
router.get('/', OrderController.getAll);
router.get('/:id', OrderController.getOne);
router.put('/', authMiddleware, OrderController.update);
router.delete('/:id', authMiddleware, OrderController.delete);

export default router;  