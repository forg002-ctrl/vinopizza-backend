import express from "express";
import AuthorizationController from "../controllers/AuthorizationController.js";

const router = express.Router();

router.post('/registration', AuthorizationController.registration);
router.get('/login', AuthorizationController.login);
router.get('/logout', AuthorizationController.logout);
router.put('/refresh', AuthorizationController.refresh);
router.delete('/test', AuthorizationController.test);  //endpoint made for test(should work only for authorized users)

export default router;