import express from "express";
import DrinkController from "../controllers/DrinkController.js";
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
 *      Drink:
 *        type: object
 *        required:
 *          - discount
 *          - price
 *          - translation
 *        properties:
 *          discount: 
 *            type: number
 *            example: 0
 *            default: 0
 *          price:
 *            type: number
 *            example: 90
 *          translation:
 *            type: object
 *            required:
 *            - ru
 *            - ro
 *            properties:
 *              ru:
 *                type: object
 *                required:
 *                - name
 *                - description
 *                - category
 *                - metrics
 *                properties:
 *                  name: 
 *                    type: string
 *                    example: Пеперони
 *                  description:
 *                    type: string
 *                    example: Очень вкусная
 *                  category:
 *                    type: string
 *                    example: Пицца
 *                  metrics:
 *                    type: string 
 *                    example: 500 г
 *              ro:
 *                type: object
 *                required:
 *                - name
 *                - description
 *                - category
 *                - metrics
 *                properties:
 *                  name: 
 *                    type: string
 *                    example: Peperoni
 *                  description:
 *                    type: string
 *                    example: Foarte gustos
 *                  category:
 *                    type: string
 *                    example: Pizza
 *                  metrics:
 *                    type: string 
 *                    example: 500 gr
 * security:
 * - bearerAuth: []
 */

/**
 * @swagger
 * tags:
 *  - name: Drink
 *    description: CRUD methods for Drink Model(Schema)
 *  - name: DrinkDEV
 *    description: CRUD methods for Drink Model(Schema) DEV
 */

const router = express.Router();

/**
 * @swagger
 * /api/v1/drinks:
 *  post:
 *      security:
 *      - bearerAuth: []
 *      summary: Create a new Drink - Only for authorized users (paste the accessToken to the lock) 
 *      tags:
 *        - Drink
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      allOf:
 *                      - $ref: '#/components/schemas/Drink'
 *                      - type: object
 *                        required:
 *                        - image
 *                        properties:
 *                          image:
 *                              type: string
 *                              format: binary
 *      responses:
 *          200:
 *              description: Return the new created Drink object
 *              content:
 *                  apllication/json:
 *                      schema:
 *                          type: array
 *                          items: 
 *                              allOf:
 *                              - $ref: '#/components/schemas/Drink'
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

router.post('/', authMiddleware, DrinkController.create);

/**
 * @swagger
 * /api/v1/drinks/dev:
 *  post:
 *      summary: Create a new Drink - Only for authorized users (paste the accessToken to the lock) 
 *      tags:
 *        - DrinkDEV
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      allOf:
 *                      - $ref: '#/components/schemas/Drink'
 *                      - type: object
 *                        required:
 *                        - image
 *                        properties:
 *                          image:
 *                              type: string
 *                              format: binary
 *      responses:
 *          200:
 *              description: Return the new created Drink object
 *              content:
 *                  apllication/json:
 *                      schema:
 *                          type: array
 *                          items: 
 *                              allOf:
 *                              - $ref: '#/components/schemas/Drink'
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

router.post('/dev/', DrinkController.create);

/**
 * @swagger
 * /api/v1/drinks:
 *  get:
 *      summary: Return all the Drink objects from DB
 *      tags:
 *      - Drink 
 *      - DrinkDEV  
 *      responses:
 *          200:
 *              description: Returns an array of Drink objects
 *              content:
 *                  apllication/json:
 *                      schema:
 *                          allOf:
 *                          - $ref: '#/components/schemas/Drink'
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

router.get('/', DrinkController.getAll);

/**
 * @swagger
 * /api/v1/drinks/{id}:
 *  get:
 *      summary: Return the Drink object with the given id from DB
 *      tags:
 *      - Drink   
 *      - DrinkDEV
 *      parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: Numeric ID of the drink to get    
 *      responses:
 *          200:
 *              description: Return the Drink object with the given id
 *              content:
 *                  apllication/json:
 *                      schema:
 *                          allOf:
 *                          - $ref: '#/components/schemas/Drink'
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

router.get('/:id', DrinkController.getOne);

/**
 * @swagger
 * /api/v1/drinks:
 *  put:
 *      security:
 *      - bearerAuth: []
 *      summary: Update the Drink object - Only for authorized users (paste the accessToken to the lock)
 *      tags:
 *      - Drink
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      allOf:
 *                      - $ref: '#/components/schemas/Drink'
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
 *              description: Return the updated Drink object
 *              content:
 *                  apllication/json:
 *                      schema:
 *                          allOf:
 *                          - $ref: '#/components/schemas/Drink'
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

router.put('/', authMiddleware, DrinkController.update);

/**
 * @swagger
 * /api/v1/drinks/dev:
 *  put:
 *      summary: Update the Drink object - Only for authorized users (paste the accessToken to the lock)
 *      tags:
 *      - DrinkDEV
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      allOf:
 *                      - $ref: '#/components/schemas/Drink'
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
 *              description: Return the updated Drink object
 *              content:
 *                  apllication/json:
 *                      schema:
 *                          allOf:
 *                          - $ref: '#/components/schemas/Drink'
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

router.put('/dev/', DrinkController.update);

/**
 * @swagger
 * /api/v1/drinks/{id}:
 *  delete:
 *      security:
 *      - bearerAuth: []
 *      summary: Delete the Drink object with the given id from DB - Only for authorized users (paste the accessToken to the lock)
 *      tags:
 *      - Drink   
 *      parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: Numeric ID of the drink to get    
 *      responses:
 *          200:
 *              description: Return the deleted Drink object
 *              content:
 *                  apllication/json:
 *                      schema:
 *                          allOf:
 *                          - $ref: '#/components/schemas/Drink'
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

router.delete('/:id', authMiddleware, DrinkController.delete);

/**
 * @swagger
 * /api/v1/drinks/dev/{id}:
 *  delete:
 *      summary: Delete the Drink object with the given id from DB
 *      tags:
 *      - DrinkDEV  
 *      parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: Numeric ID of the drink to get    
 *      responses:
 *          200:
 *              description: Return the deleted Drink object
 *              content:
 *                  apllication/json:
 *                      schema:
 *                          allOf:
 *                          - $ref: '#/components/schemas/Drink'
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

router.delete('/dev/:id', DrinkController.delete);

export default router;  