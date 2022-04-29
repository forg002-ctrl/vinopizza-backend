import express from "express";
import MenuController from "../controllers/MenuController.js";

/** 
 * @swagger
 * components:
 *   schemas:
 *      Menu:
 *          type: object
 *          required:
 *          - meals
 *          - drinks
 *          properties:
 *              meal:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Meal'
 *              drinks:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Drink'
 * security:
 * - bearerAuth: []
 */

/**
 * @swagger
 * tags:
 *  name: Meal
 *  description: CRUD methods for Meal Model(Schema)
 */

const router = express.Router();

router.get('/', MenuController.getAll);

export default router;