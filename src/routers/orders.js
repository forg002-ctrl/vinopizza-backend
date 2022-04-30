import express from "express";
import OrderController from "../controllers/OrderController.js";
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
 *      Order:
 *        type: object
 *        required:
 *        - time
 *        - customerInfo
 *        - items
 *        - paymentMethod
 *        - total
 *        - status
 *        properties:
 *          time: 
 *            type: string
 *            example: March 17th 2022, 2:16:29 pm
 *          customerInfo:
 *            type: object
 *            required:
 *            - name
 *            - city
 *            - address
 *            - phone
 *            properties:
 *              name:
 *                type: string
 *                example: Gagauz Andrei
 *              city:
 *                type: string
 *                example: Chisinau
 *              address:
 *                type: object
 *                required:
 *                - street
 *                - houseNumber
 *                properties:
 *                  street: 
 *                    type: string
 *                    example: Studentilor 10/2
 *                  houseNumber:
 *                    type: number
 *                    example: 35
 *                  flat:
 *                    type: number
 *                    example: 12
 *                  enterance:
 *                    type: number
 *                    example: 4
 *                  floor:
 *                    type: number
 *                    example: 3
 *                  codeIntercom:
 *                    type: string
 *                    example: 12B
 *              phone:
 *                type: string
 *                example: +37360399865
 *          items:
 *            type: array
 *            items:
 *              type: object
 *              required:
 *              - name
 *              - price
 *              - amount
 *              properties:
 *                name: 
 *                  type: string
 *                  example: Маргарита
 *                price:
 *                  type: number
 *                  example: 80
 *                amount:
 *                  type: number
 *                  example: 2
 *          paymentMethod:
 *            type: string
 *            enum: ['Cash', 'Online', 'Card']
 *            default: 'Cash'
 *          total:
 *            type: number
 *            example: 160
 *          status:
 *            type: string
 *            enum: ['Pending', 'In Process', 'Done']
 *            default: 'Pending'
 * security:
 * - bearerAuth: []
 */

/**
 * @swagger
 * tags:
 *  - name: Order
 *    description: CRUD methods for Order Model(Schema)
 *  - name: OrderDEV
 *    description: CRUD methods for Order Model(Schema) DEV
 */

const router = express.Router();

/**
 * @swagger
 * /api/v1/orders:
 *  post:
 *      summary: Create a new order 
 *      tags:
 *      - Order
 *      - OrderDEV
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Order'     
 *      responses:
 *          200:
 *              description: Return the new created Category object
 *              content:
 *                  apllication/json:
 *                      schema:
 *                          allOf:
 *                          - $ref: '#/components/schemas/Order'
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
 *              description: Error - "You haven't sent all the necessary data"
 *          500:
 *              description: Server Error - "Something went wrong"          
 */

router.post('/', OrderController.create);

/**
 * @swagger
 * /api/v1/orders:
 *  get: 
 *      security:
 *      - bearerAuth: []
 *      summary: Return all the Order objects from DB - Only for authorized users (paste the accessToken to the lock) 
 *      tags:
 *      - Order 
 *      responses:
 *          200:
 *              description: Returns an array of Order objects
 *              content:
 *                  apllication/json:
 *                      schema:
 *                          allOf:
 *                          - $ref: '#/components/schemas/Order'
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
 *          401: 
 *              description: Error - "You don't have access to this page, because you're an unauthorized user"
 *          500:
 *              description: Something went wrong          
 */

router.get('/', authMiddleware, OrderController.getAll);

/**
 * @swagger
 * /api/v1/orders/dev:
 *  get: 
 *      summary: Return all the Order objects from DB DEV
 *      tags:
 *      - OrderDEV
 *      responses:
 *          200:
 *              description: Returns an array of Order objects
 *              content:
 *                  apllication/json:
 *                      schema:
 *                          allOf:
 *                          - $ref: '#/components/schemas/Order'
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
 *          401: 
 *              description: Error - "You don't have access to this page, because you're an unauthorized user"
 *          500:
 *              description: Something went wrong          
 */

router.get('/dev/', OrderController.getAll);

/**
 * @swagger
 * /api/v1/orders/{id}:
 *  get:
 *      summary: Return the Order object with the given id from DB
 *      tags:
 *      - Order   
 *      - OrderDEV
 *      parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: Numeric ID of the order to get    
 *      responses:
 *          200:
 *              description: Return the Order object with the given id
 *              content:
 *                  apllication/json:
 *                      schema:
 *                          allOf:
 *                          - $ref: '#/components/schemas/Order'
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

router.get('/:id', OrderController.getOne);

/**
 * @swagger
 * /api/v1/orders:
 *  put:
 *      security:
 *      - bearerAuth: []
 *      summary: Update the Order object - Only for authorized users (paste the accessToken to the lock)
 *      tags:
 *      - Order
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      allOf:
 *                      - $ref: '#/components/schemas/Order'
 *                      - type: object
 *                        required:
 *                        - _id
 *                        properties:
 *                            _id:
 *                                type: string
 *                                example: 626c04e650ac6880c9fabb2c
 *      responses:
 *          200:
 *              description: Return the updated Order object
 *              content:
 *                  apllication/json:
 *                      schema:
 *                          allOf:
 *                          - $ref: '#/components/schemas/Order'
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
 *          401:
 *              description: Error - "You don't have access to this page, because you're an unauthorized user"
 *          404:
 *              description: Error - "You haven't sent all the necessary data" or Error - "Wrong id"
 *          500:
 *              description: Server Error - "Something went wrong"          
 */

router.put('/', authMiddleware, OrderController.update);

/**
 * @swagger
 * /api/v1/orders/dev:
 *  put:
 *      summary: Update the Order object DEV
 *      tags:
 *      - OrderDEV
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      allOf:
 *                      - $ref: '#/components/schemas/Order'
 *                      - type: object
 *                        required:
 *                        - _id
 *                        properties:
 *                            _id:
 *                                type: string
 *                                example: 626c04e650ac6880c9fabb2c
 *      responses:
 *          200:
 *              description: Return the updated Order object
 *              content:
 *                  apllication/json:
 *                      schema:
 *                          allOf:
 *                          - $ref: '#/components/schemas/Order'
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
 *          401:
 *              description: Error - "You don't have access to this page, because you're an unauthorized user"
 *          404:
 *              description: Error - "You haven't sent all the necessary data" or Error - "Wrong id"
 *          500:
 *              description: Server Error - "Something went wrong"          
 */

router.put('/dev/', OrderController.update);

/**
 * @swagger
 * /api/v1/orders/{id}:
 *  delete:
 *      security:
 *      - bearerAuth: []
 *      summary: Delete the Order object with the given id from DB - Only for authorized users (paste the accessToken to the lock)
 *      tags:
 *      - Order   
 *      parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: Numeric ID of the order to get    
 *      responses:
 *          200:
 *              description: Return the deleted Order object
 *              content:
 *                  apllication/json:
 *                      schema:
 *                          allOf:
 *                          - $ref: '#/components/schemas/Order'
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
 *          401:
 *              description: Error - "You don't have access to this page, because you're an unauthorized user"
 *          404:
 *              description: Error - "Wrong id"
 *          500:
 *              description: Server Error - "Something went wrong"        
 */

router.delete('/:id', authMiddleware, OrderController.delete);

/**
 * @swagger
 * /api/v1/orders/dev/{id}:
 *  delete:
 *      summary: Delete the Order object with the given id from DB DEV
 *      tags:
 *      - OrderDEV
 *      parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: Numeric ID of the order to get    
 *      responses:
 *          200:
 *              description: Return the deleted Order object
 *              content:
 *                  apllication/json:
 *                      schema:
 *                          allOf:
 *                          - $ref: '#/components/schemas/Order'
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
 *          401:
 *              description: Error - "You don't have access to this page, because you're an unauthorized user"
 *          404:
 *              description: Error - "Wrong id"
 *          500:
 *              description: Server Error - "Something went wrong"        
 */

router.delete('/dev/:id', OrderController.delete);

export default router;  