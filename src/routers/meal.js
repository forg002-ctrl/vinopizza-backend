import express from "express";
import MealController from "../controllers/MealController.js";
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
 *      Meal:
 *          allOf:
 *          - $ref: '#/components/schemas/Drink'
 *          - type: object
 *            requiered:
 *            - recommendedVines
 *            properties:
 *              recommendedVines:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Drink'
 * security:
 * - bearerAuth: []
 */

/**
 * @swagger
 * tags:
 *  - name: Meal
 *    description: CRUD methods for Meal Model(Schema)
 *  - name: MealDEV
 *    description: CRUD methods for Meal Model(Schema) DEV
 */


const router = express.Router();

/**
 * @swagger
 * /api/v1/meals:
 *  post:
 *      security:
 *      - bearerAuth: []
 *      summary: Create a new Meal - Only for authorized users (paste the accessToken to the lock) 
 *      tags:
 *        - Meal
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      allOf:
 *                      - $ref: '#/components/schemas/Meal'
 *                      - type: object
 *                        required:
 *                        - image
 *                        properties:
 *                          image:
 *                              type: string
 *                              format: binary
 *      responses:
 *          200:
 *              description: Return the new created Meal object
 *              content:
 *                  apllication/json:
 *                      schema:
 *                          type: array
 *                          items: 
 *                              allOf:
 *                              - $ref: '#/components/schemas/Meal'
 *                              - type: object
 *                                requiered:
 *                                - image
 *                                - _id
 *                                - __v
 *                                properties:
 *                                    image:
 *                                        type: string
 *                                        example: dfb6f1d9-e656-4fb6-a07f-e03a333cba3f.jpg
 *                                    _id:
 *                                        type: string
 *                                        example: 626bdaac2ba177868d0fd79e
 *                                    __v:
 *                                        type: number
 *                                        example: 0
 *          404:
 *              description: You haven't sent all the necessary data
 *          500:
 *              description: Something went wrong          
 */

router.post('/', authMiddleware, MealController.create);

/**
 * @swagger
 * /api/v1/meals/dev:
 *  post:
 *      summary: Create a new Meal
 *      tags:
 *        - MealDEV
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      allOf:
 *                      - $ref: '#/components/schemas/Meal'
 *                      - type: object
 *                        required:
 *                        - image
 *                        properties:
 *                          image:
 *                              type: string
 *                              format: binary
 *      responses:
 *          200:
 *              description: Return the new created Meal object
 *              content:
 *                  apllication/json:
 *                      schema:
 *                          type: array
 *                          items: 
 *                              allOf:
 *                              - $ref: '#/components/schemas/Meal'
 *                              - type: object
 *                                requiered:
 *                                - image
 *                                - _id
 *                                - __v
 *                                properties:
 *                                    image:
 *                                        type: string
 *                                        example: dfb6f1d9-e656-4fb6-a07f-e03a333cba3f.jpg
 *                                    _id:
 *                                        type: string
 *                                        example: 626bdaac2ba177868d0fd79e
 *                                    __v:
 *                                        type: number
 *                                        example: 0
 *          404:
 *              description: You haven't sent all the necessary data
 *          500:
 *              description: Something went wrong          
 */

router.post('/dev/', MealController.create);

/**
 * @swagger
 * /api/v1/meals:
 *  get:
 *      summary: Return all the Meal objects from DB
 *      tags:
 *      - Meal  
 *      - MealDEV 
 *      responses:
 *          200:
 *              description: Returns an array of Meal objects
 *              content:
 *                  apllication/json:
 *                      schema:
 *                          allOf:
 *                          - $ref: '#/components/schemas/Meal'
 *                          - type: object
 *                            requiered:
 *                            - image
 *                            - _id
 *                            - __v
 *                            properties:
 *                                image:
 *                                    type: string
 *                                    example: dfb6f1d9-e656-4fb6-a07f-e03a333cba3f.jpg
 *                                _id:
 *                                    type: string
 *                                    example: 626c04e650ac6880c9fabb2c
 *                                __v:
 *                                    type: number
 *                                    example: 0
 *          500:
 *              description: Something went wrong          
 */

router.get('/', MealController.getAll);

/**
 * @swagger
 * /api/v1/meals/{id}:
 *  get:
 *      summary: Return the Meal object with the given id from DB
 *      tags:
 *      - Meal 
 *      - MealDEV  
 *      parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: Numeric ID of the meal to get    
 *      responses:
 *          200:
 *              description: Return the Meal object with the given id
 *              content:
 *                  apllication/json:
 *                      schema:
 *                          allOf:
 *                          - $ref: '#/components/schemas/Meal'
 *                          - type: object
 *                            requiered:
 *                            - image
 *                            - _id
 *                            - __v
 *                            properties:
 *                                image:
 *                                    type: string
 *                                    example: dfb6f1d9-e656-4fb6-a07f-e03a333cba3f.jpg
 *                                _id:
 *                                    type: string
 *                                    example: 626bdaac2ba177868d0fd79e
 *                                __v:
 *                                    type: number
 *                                    example: 0
 *          404:
 *              description: Error - "Wrong id"
 *          500:
 *              description: Server Error - "Something went wrong"        
 */

router.get('/:id', MealController.getOne);

/**
 * @swagger
 * /api/v1/meals:
 *  put:
 *      security:
 *      - bearerAuth: []
 *      summary: Update the Meal object - Only for authorized users (paste the accessToken to the lock)
 *      tags:
 *      - Meal
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      allOf:
 *                      - $ref: '#/components/schemas/Meal'
 *                      - type: object
 *                        required:
 *                        - image
 *                        - _id
 *                        properties:
 *                            image:
 *                                type: string
 *                                example: dfb6f1d9-e656-4fb6-a07f-e03a333cba3f.jpg
 *                            _id:
 *                                type: string
 *                                example: 626bdaac2ba177868d0fd79e
 *      responses:
 *          200:
 *              description: Return the updated Meal object
 *              content:
 *                  apllication/json:
 *                      schema:
 *                          allOf:
 *                          - $ref: '#/components/schemas/Meal'
 *                          - type: object
 *                            requiered:
 *                            - image
 *                            - _id
 *                            - __v
 *                            properties:
 *                                image:
 *                                    type: string
 *                                    example: dfb6f1d9-e656-4fb6-a07f-e03a333cba3f.jpg
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

router.put('/', authMiddleware, MealController.update);

/**
 * @swagger
 * /api/v1/meals/dev:
 *  put:
 *      summary: Update the Meal object
 *      tags:
 *      - MealDEV
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      allOf:
 *                      - $ref: '#/components/schemas/Meal'
 *                      - type: object
 *                        required:
 *                        - image
 *                        - _id
 *                        properties:
 *                            image:
 *                                type: string
 *                                example: dfb6f1d9-e656-4fb6-a07f-e03a333cba3f.jpg
 *                            _id:
 *                                type: string
 *                                example: 626bdaac2ba177868d0fd79e
 *      responses:
 *          200:
 *              description: Return the updated Meal object
 *              content:
 *                  apllication/json:
 *                      schema:
 *                          allOf:
 *                          - $ref: '#/components/schemas/Meal'
 *                          - type: object
 *                            requiered:
 *                            - image
 *                            - _id
 *                            - __v
 *                            properties:
 *                                image:
 *                                    type: string
 *                                    example: dfb6f1d9-e656-4fb6-a07f-e03a333cba3f.jpg
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

router.put('/dev/', MealController.update);

/**
 * @swagger
 * /api/v1/meals/{id}:
 *  delete:
 *      security:
 *      - bearerAuth: []
 *      summary: Delete the Meal object with the given id from DB - Only for authorized users (paste the accessToken to the lock)
 *      tags:
 *      - Meal   
 *      parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: Numeric ID of the meal to get    
 *      responses:
 *          200:
 *              description: Return the deleted Meal object
 *              content:
 *                  apllication/json:
 *                      schema:
 *                          allOf:
 *                          - $ref: '#/components/schemas/Meal'
 *                          - type: object
 *                            requiered:
 *                            - image
 *                            - _id
 *                            - __v
 *                            properties:
 *                                image:
 *                                    type: string
 *                                    example: dfb6f1d9-e656-4fb6-a07f-e03a333cba3f.jpg
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

router.delete('/:id', authMiddleware, MealController.delete);

/**
 * @swagger
 * /api/v1/meals/dev/{id}:
 *  delete:
 *      summary: Delete the Meal object with the given id from DB
 *      tags:
 *      - MealDEV  
 *      parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: Numeric ID of the meal to get    
 *      responses:
 *          200:
 *              description: Return the deleted Meal object
 *              content:
 *                  apllication/json:
 *                      schema:
 *                          allOf:
 *                          - $ref: '#/components/schemas/Meal'
 *                          - type: object
 *                            requiered:
 *                            - image
 *                            - _id
 *                            - __v
 *                            properties:
 *                                image:
 *                                    type: string
 *                                    example: dfb6f1d9-e656-4fb6-a07f-e03a333cba3f.jpg
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

router.delete('/dev/:id', MealController.delete);


export default router;  