import express from "express";
import CategoryController from "../controllers/CategoryController.js";
import authMiddleware from "../midllewares/auth-middleware.js";

/** 
 * @swagger
 * components:
 *   securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *   schemas:
 *      Category:
 *          type: object
 *          required:
 *          - translation
 *          properties:
 *              translation:
 *                  type: object
 *                  required:
 *                  - ru
 *                  - ro
 *                  properties:
 *                      ru:
 *                          type: object
 *                          required:
 *                          - name
 *                          properties:
 *                              name: 
 *                                  type: string
 *                                  example: Пицца
 *                      ro:
 *                          type: object
 *                          required:
 *                          - name
 *                          properties:
 *                              name: 
 *                                  type: string
 *                                  example: Pizza
 * security:
 * - bearerAuth: []
 */

/**
 * @swagger
 * tags:
 *  - name: Category
 *    description: CRUD methods for Category Model(Schema)
 */

const router = express.Router();

/**
 * @swagger
 * /api/v1/categories:
 *  post:
 *      security:
 *      - bearerAuth: []
 *      summary: Create a new category - Only for authorized users (paste the accessToken to the lock) 
 *      tags:
 *      - Category
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Category'     
 *      responses:
 *          200:
 *              description: Return the new created Category object
 *              content:
 *                  apllication/json:
 *                      schema:
 *                          allOf:
 *                          - $ref: '#/components/schemas/Category'
 *                          - type: object
 *                            requiered:
 *                            - _id
 *                            - __v
 *                            properties:
 *                                _id:
 *                                    type: string
 *                                    example: 626bdaac2ba177868d0fd79e
 *                                __v:
 *                                    type: number
 *                                    example: 0
 *          401:
 *              description: Error - "You don't have access to this page, because you're an unauthorized user"
 *          404:
 *              description: Error - "You haven't sent all the necessary data"
 *          500:
 *              description: Server Error - "Something went wrong"          
 */

router.post('/', authMiddleware, CategoryController.create);

/**
 * @swagger
 * /api/v1/categories:
 *  get:
 *      summary: Return all the Category objects from DB
 *      tags:
 *      - Category 
 *      responses:
 *          200:
 *              description: Return an array of Category objects from DB
 *              content:
 *                  apllication/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              allOf:
 *                              - $ref: '#/components/schemas/Category'
 *                              - type: object
 *                                requiered:
 *                                - _id
 *                                - __v
 *                                properties:   
 *                                    _id:
 *                                        type: string
 *                                        example: 626bdaac2ba177868d0fd79e
 *                                    __v:
 *                                        type: number
 *                                        example: 0
 *          500:
 *              description: Server Error - "Something went wrong"          
 */

router.get('/', CategoryController.getAll);

/**
 * @swagger
 * /api/v1/categories/{id}:
 *  get:
 *      summary: Return the Cetegory object with the given id from DB
 *      tags:
 *      - Category 
 *      parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: Numeric ID of the category to get    
 *      responses:
 *          200:
 *              description: Return the Category object with the given id
 *              content:
 *                  apllication/json:
 *                      schema:
 *                          allOf:
 *                          - $ref: '#/components/schemas/Category'
 *                          - type: object
 *                            requiered:
 *                            - _id
 *                            - __v
 *                            properties:
 *                                _id:
 *                                    type: string
 *                                    example: 626c04e650ac6880c9fabb2c
 *                                __v:
 *                                    type: number
 *                                    example: 0
 *          404:
 *              description: Error - "Wrong id"
 *          500:
 *              description: Server Error - "Something went wrong"        
 */

router.get('/:id', CategoryController.getOne);

/**
 * @swagger
 * /api/v1/categories:
 *  put:
 *      security:
 *      - bearerAuth: []
 *      summary: Update the Category object - Only for authorized users (paste the accessToken to the lock)
 *      tags:
 *      - Category
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      allOf:
 *                      - $ref: '#/components/schemas/Category'
 *                      - type: object
 *                        required:
 *                        - _id
 *                        properties:
 *                            _id:
 *                                type: string
 *                                example: 626bdaac2ba177868d0fd79e
 *      responses:
 *          200:
 *              description: Return the updated Category object
 *              content:
 *                  apllication/json:
 *                      schema:
 *                          allOf:
 *                          - $ref: '#/components/schemas/Category'
 *                          - type: object
 *                            requiered:
 *                            - _id
 *                            - __v
 *                            properties:
 *                                _id:
 *                                    type: string
 *                                    example: 626bdaac2ba177868d0fd79e
 *                                __v:
 *                                    type: number
 *                                    example: 0
 *          401:
 *              description: Error - "You don't have access to this page, because you're an unauthorized user"
 *          404:
 *              description: Error - "You haven't sent all the necessary data" or Error - "Wrong id"
 *          500:
 *              description: Server Error - "Something went wrong"          
 */

router.put('/', authMiddleware, CategoryController.update);

/**
 * @swagger
 * /api/v1/categories/{id}:
 *  delete:
 *      security:
 *      - bearerAuth: []
 *      summary: Delete the Category object with the given id from DB - Only for authorized users (paste the accessToken to the lock)
 *      tags:
 *      - Category   
 *      parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: Numeric ID of the category to get    
 *      responses:
 *          200:
 *              description: Return the deleted Category object
 *              content:
 *                  apllication/json:
 *                      schema:
 *                          allOf:
 *                          - $ref: '#/components/schemas/Category'
 *                          - type: object
 *                            requiered:
 *                            - _id
 *                            - __v
 *                            properties:
 *                                _id:
 *                                    type: string
 *                                    example: 626bdaac2ba177868d0fd79e
 *                                __v:
 *                                    type: number
 *                                    example: 0
 *          401:
 *              description: Error - "You don't have access to this page, because you're an unauthorized user"
 *          404:
 *              description: Error - "Wrong id"
 *          500:
 *              description: Server Error - "Something went wrong"        
 */

router.delete('/:id', authMiddleware, CategoryController.delete);

export default router;  