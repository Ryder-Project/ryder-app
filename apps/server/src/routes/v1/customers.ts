import { Router } from "express";
import { customerForgotPassword, loginCustomer, registerCustomer, customerResetPassword, verifyUser } from "../../controllers/customerControllers";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     CustomerResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             email:
 *               type: string
 * tags:
 *   name: Customers
 *   description: APIs related to customer operations
 * paths:
 *   api/v1/customers/register:
 *     post:
 *       summary: Register a new customer
 *       description: |
 *         This endpoint allows for the registration of a new customer. It validates the user input,
 *         checks if the user already exists, hashes the password, creates the user in the database,
 *         and sends a registration email.
 *       tags: [Customers]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 password:
 *                   type: string
 *               required:
 *                 - firstName
 *                 - lastName
 *                 - email
 *                 - phone
 *                 - password
 *       responses:
 *         '200':
 *           description: Registration successful
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   user:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       firstName:
 *                         type: string
 *                       lastName:
 *                         type: string
 *                       email:
 *                         type: string
 *         '400':
 *           description: Bad request, validation failed or password does not meet requirements
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         message:
 *                           type: string
 *         '409':
 *           description: Conflict, user already exists
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         message:
 *                           type: string
 */

router.post("/registerCustomer", registerCustomer);

/**
 * @swagger
 * paths:
 *   api/v1/customers/login:
 *     post:
 *       summary: Login a customer
 *       description: |
 *         This endpoint allows for the login of a customer. It validates the user input, checks if the user exists,
 *         compares the password, creates a token, and sends it to the user.
 *       tags: [Customers]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *               required:
 *                 - email
 *                 - password
 *       responses:
 *         '200':
 *           description: Login successful
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   email:
 *                     type: string
 *                   role:
 *                     type: string
 *                   token:
 *                     type: string
 *         '400':
 *           description: Bad request, validation failed or password does not meet requirements
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         message:
 *                           type: string
 *         '409':
 *           description: Conflict, wrong password
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         message:
 *                           type: string
 */
router.post("/login", loginCustomer);
router.post("/forgotPassword", customerForgotPassword);
router.post("/resetPassword", customerResetPassword);
router.post("/verifyEmail", verifyUser)

export default router;
