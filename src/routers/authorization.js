import express from "express";
import AuthorizationController from "../controllers/AuthorizationController.js";
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
 *       UserLoginData:
 *          type: object
 *          required: 
 *          - username
 *          - password
 *          properties:
 *              username:
 *                  type: string
 *              password:
 *                  type: string
 *          example:
 *              username: admin123
 *              password: admin123
 *       UserDto:
 *          type: object
 *          required:
 *          - username
 *          - id
 *          properties:
 *              username:
 *                  type: string
 *              id:
 *                  type: string
 *          example:
 *              username: admin123
 *              id: 626ab3346de0920c659f8c81
 * security:
 * - bearerAuth: []
 */

/**
 * @swagger
 * tags:
 *  name: Authorization
 *  description: Operations with accounts and JWT tokens
 */

 const router = express.Router();

/**
 * @swagger
 * /api/v1/authorization/registration:
 *  post:
 *      summary: Create a new user and sign in(create a pair of tokens)
 *      tags:
 *        - Authorization
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UserLoginData'     
 *      responses:
 *          200:
 *              description: Return refreshToken in res.cookie and the object
 *              content:
 *                  apllication/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                          - user
 *                          - accessToken
 *                          - refreshToken
 *                          properties:
 *                              user:
 *                                  $ref: '#components/schemas/UserDto'
 *                              accessToken:
 *                                  type: string
 *                                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTExNTk4NjAsImV4cCI6MTY1MTE2MTY2MH0.gKV9n9yOZn6aKYVu79u6Z_-Uqos7hJz-Kricpl3cyL0
 *                              refreshToken:
 *                                  type: string
 *                                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTExNTk4NjAsImV4cCI6MTY1MjAyMzg2MH0.ILj_-hkFCZ_S9P8JNaGSBwv4fazwhcF21jjiuVATTzQ
 *          401:
 *              description: Error - "You haven't sent all the necessary data"
 *          404:
 *              description: Error - "There is already a registred user with such 'username' - ${username}"
 *          500:
 *              description: Server Error - "Something went wrong"          
 */

router.post('/registration', AuthorizationController.registration);

/**
 * @swagger
 * /api/v1/authorization/login:
 *  post:
 *      summary: Sign in(create a pair of tokens)
 *      tags:
 *        - Authorization
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UserLoginData'     
 *      responses:
 *          200:
 *              description: Return refreshToken in res.cookie and object
 *              content:
 *                  apllication/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                          - user
 *                          - accessToken
 *                          - refreshToken
 *                          properties:
 *                              user:
 *                                  $ref: '#components/schemas/UserDto'
 *                              accessToken:
 *                                  type: string
 *                                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTExNTk4NjAsImV4cCI6MTY1MTE2MTY2MH0.gKV9n9yOZn6aKYVu79u6Z_-Uqos7hJz-Kricpl3cyL0
 *                              refreshToken:
 *                                  type: string
 *                                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTExNTk4NjAsImV4cCI6MTY1MjAyMzg2MH0.ILj_-hkFCZ_S9P8JNaGSBwv4fazwhcF21jjiuVATTzQ
 *          401:
 *              description: Error - "You haven't sent all the necessary data"
 *          404:
 *              description: Error - "There isn't a user with such 'username' - ${username}" or Error - "Uncorrect password"
 *          500:
 *              description: Server Error - "Something went wrong"          
 */

router.post('/login', AuthorizationController.login);

/**
 * @swagger
 * /api/v1/authorization/logout:
 *  post:
 *      security:
 *      - bearerAuth: []
 *      summary: End the session(delete the refreshToken from DB) - Only for authorized users (paste the accessToken to the lock) 
 *      tags:
 *        - Authorization
 *      requestCookies:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                  required:
 *                  - refreshToken
 *                  properties:
 *                      refreshToken:
 *                          type: string
 *      responses:
 *          200:
 *              description: Return the object with field - "deleteCount" equals to 1
 *              content:
 *                  apllication/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                          - acknowledged
 *                          - deletedCount
 *                          properties:
 *                              acknowledged:
 *                                  type: bool
 *                                  example: true
 *                              deletedCount:
 *                                  type: number
 *                                  example: 1
 *          401:
 *              description: Error - "You don't have access to this page, because you're an unauthorized user"
 *          500:
 *              description: Server Error - "Something went wrong"          
 */

router.post('/logout', authMiddleware, AuthorizationController.logout);

/**
 * @swagger
 * /api/v1/authorization/refresh:
 *  get:
 *      security:
 *      - bearerAuth: []
 *      summary: Refresh the pair of tokens(delete the refreshToken from DB and create the new pair of tokens) - Only for authorized users (paste the accessToken to the lock) 
 *      tags:
 *        - Authorization
 *      requestCookies:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                  required:
 *                  - refreshToken
 *                  properties:
 *                      refreshToken:
 *                          type: string
 *      responses:
 *          200:
 *              description: Return refreshToken in res.cookie and the object
 *              content:
 *                  apllication/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                          - user
 *                          - accessToken
 *                          - refreshToken
 *                          properties:
 *                              user:
 *                                  $ref: '#components/schemas/UserDto'
 *                              accessToken:
 *                                  type: string
 *                                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTExNTk4NjAsImV4cCI6MTY1MTE2MTY2MH0.gKV9n9yOZn6aKYVu79u6Z_-Uqos7hJz-Kricpl3cyL0
 *                              refreshToken:
 *                                  type: string
 *                                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTExNTk4NjAsImV4cCI6MTY1MjAyMzg2MH0.ILj_-hkFCZ_S9P8JNaGSBwv4fazwhcF21jjiuVATTzQ
 *          401:
 *              description: Error - "You don't have access to this page, because you're an unauthorized user"
 *          500:
 *              description: Server Error - "Something went wrong"             
 */

router.get('/refresh', authMiddleware, AuthorizationController.refresh);

export default router;