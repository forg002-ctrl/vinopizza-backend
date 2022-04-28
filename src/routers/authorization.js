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
 *  name: authorization
 *  description: Operations with accounts and sessions
 */

 const router = express.Router();

/**
 * @swagger
 * /api/v1/authorization/registration:
 *  post:
 *      summary: Creates a new user
 *      tags:
 *        - authorization
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UserLoginData'     
 *      responses:
 *          200:
 *              description: Returns refreshToken in res.cookie and object
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
 *       
 *          404:
 *              description: There is already a registred user with such 'username' - ${username}
 *          500:
 *              desription: Something went wrong          
 */

router.post('/registration', AuthorizationController.registration);

/**
 * @swagger
 * /api/v1/authorization/login:
 *  post:
 *      summary: Check if the user exists in db and sign in
 *      tags:
 *        - authorization
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UserLoginData'     
 *      responses:
 *          200:
 *              description: Returns refreshToken in res.cookie and object
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
 *       
 *          404:
 *              description: There isn't a user with such 'username' - ${username}/Uncorrect password
 *          500:
 *              description: Something went wrong          
 */

router.post('/login', AuthorizationController.login);

/**
 * @swagger
 * /api/v1/authorization/logout:
 *  post:
 *      security:
 *      - bearerAuth: []
 *      summary: Only authorized users have access to this method(paste the accessToken to the lock) - end the session(delete the refreshToken from db)
 *      tags:
 *        - authorization
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
 *              description: Returns object with "deleteCount":1
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
 *              description: You don't have access to this page, because you're an unauthorized user
 *          404:
 *              description: You haven't sent the refreshToken
 *          500:
 *              description: Something went wrong          
 */

router.post('/logout', authMiddleware, AuthorizationController.logout);

/**
 * @swagger
 * /api/v1/authorization/refresh:
 *  post:
 *      security:
 *      - bearerAuth: []
 *      summary: Only authorized users have access to this method(paste the accessToken to the lock) - refresh the pair of tokens(delete the tokens from db and create the new ones)
 *      tags:
 *        - authorization
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
 *              description: Returns refreshToken in res.cookie and object
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
 *              description: You don't have access to this page, because you're an unauthorized user
 *          404:
 *              description: You haven't sent the refreshToken
 *          500:
 *              description: Something went wrong             
 */

router.get('/refresh', authMiddleware, AuthorizationController.refresh);

export default router;