import express from "express";
import MenuController from "../controllers/MenuController.js";

/** 
 * @swagger
 * components:
 *   schemas:
 *      Menu:
 *          type: object
 *          required:
 *          - categories
 *          - meals
 *          - drinks
 *          properties:
 *              categories:
 *                  type: array
 *                  items:
 *                      allOf:
 *                      - $ref: '#/components/schemas/Category'
 *                      - type: object
 *                        required:
 *                        - _id
 *                        - __v
 *                        properties:
 *                          _id:
 *                              type: string
 *                              example: 626bdaac2ba177868d0fd79e
 *                          __v:
 *                              type: number
 *                              example: 0
 *              meals:
 *                  type: array
 *                  items:
 *                      allOf:
 *                      - $ref: '#/components/schemas/Meal'
 *                      - type: object
 *                        required:
 *                        - _id
 *                        - __v
 *                        properties:
 *                          _id:
 *                              type: string
 *                              example: 6233269d9312ce51fb014dc5
 *                          __v:
 *                              type: number
 *                              example: 0
 *              drinks:
 *                  type: array 
 *                  items:
 *                      allOf:
 *                      - $ref: '#/components/schemas/Drink'
 *                      - type: object
 *                        required:
 *                        - _id
 *                        - __v
 *                        properties:
 *                           _id:
 *                               type: string
 *                               example: 626bdaac2ba177868d0fd79e
 *                           __v:
 *                               type: number
 *                               example: 0
 */

/**
 * @swagger
 * tags:
 *  name: Menu
 *  description: GET method for Menu
 */

const router = express.Router();

/**
 * @swagger
 * /api/v1/menu:
 *  get:
 *      summary: Return all the Meal objects and Drink object from DB
 *      tags:
 *      - Menu
 *      responses:
 *          200:
 *              description: Returns an object of arrays
 *              content:
 *                  apllication/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Menu'
 *          500:
 *              description: Something went wrong          
 */

router.get('/', MenuController.getAll);

export default router;