import express from "express";
import AuthorizationController from "../controllers/AuthorizationController.js";
import authMiddleware from "../midllewares/auth-middleware.js";

const router = express.Router();

router.post('/registration', AuthorizationController.registration);
router.post('/login', AuthorizationController.login);
router.post('/logout', AuthorizationController.logout);
router.get('/refresh', AuthorizationController.refresh);
router.get('/test', authMiddleware ,AuthorizationController.test);  //endpoint made for test(should work only for authorized users)

export default router;