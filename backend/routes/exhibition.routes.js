import express from "express";
import * as exhibitionController from "../controllers/exhibition.controller.js";
import * as exhibitionMiddleware from "../middleware/exhibition.middleware.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Exhibition:
 *       type: object
 *       required:
 *         - name
 *         - start_date
 *         - end_date
 *         - museum_id
 *         - status
 *       properties:
 *         exhibition_id:
 *           type: integer
 *           description: The auto-generated ID of the exhibition
 *         name:
 *           type: string
 *           description: The name of the exhibition
 *         start_date:
 *           type: string
 *           format: date
 *           description: The start date of the exhibition
 *         end_date:
 *           type: string
 *           format: date
 *           description: The end date of the exhibition
 *         museum_id:
 *           type: integer
 *           description: The museum ID the exhibition belongs to
 *         description:
 *           type: string
 *           description: A brief description of the exhibition
 *         status:
 *           type: string
 *           enum: [in warehouse, in transport, delivered]
 *           description: The current status of the exhibition
 *       example:
 *         exhibition_id: 1
 *         name: Modern Art Exhibition
 *         start_date: 2023-05-10
 *         end_date: 2023-07-15
 *         museum_id: 2
 *         description: A collection of modern artworks from the 21st century
 *         status: delivered
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   name: Exhibitions
 *   description: Exhibition management API
 */

/**
 * @swagger
 * /api/exhibitions:
 *   get:
 *     summary: Returns a list of all exhibitions
 *     tags: [Exhibitions]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for exhibition name
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [in warehouse, in transport, delivered]
 *         description: Filter by status
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by exhibitions starting after this date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by exhibitions ending before this date
 *       - in: query
 *         name: museumId
 *         schema:
 *           type: integer
 *         description: Filter by museum ID
 *     responses:
 *       200:
 *         description: List of exhibitions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Exhibition'
 */
router.get("/", exhibitionController.getAllExhibitions);

/**
 * @swagger
 * /api/exhibitions/timeframe:
 *   get:
 *     summary: Returns exhibitions grouped by timeframe (current, past, future)
 *     tags: [Exhibitions]
 *     responses:
 *       200:
 *         description: Exhibitions grouped by timeframe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 current:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Exhibition'
 *                 past:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Exhibition'
 *                 future:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Exhibition'
 */
router.get("/timeframe", exhibitionController.getExhibitionsByTimeframe);

/**
 * @swagger
 * /api/exhibitions/{id}:
 *   get:
 *     summary: Get an exhibition by ID
 *     tags: [Exhibitions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Exhibition ID
 *     responses:
 *       200:
 *         description: Exhibition details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exhibition'
 *       404:
 *         description: Exhibition not found
 */
router.get("/:id", exhibitionController.getExhibitionById);

/**
 * @swagger
 * /api/exhibitions:
 *   post:
 *     summary: Create a new exhibition
 *     tags: [Exhibitions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - start_date
 *               - end_date
 *               - museum_id
 *               - status
 *             properties:
 *               name:
 *                 type: string
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *               museum_id:
 *                 type: integer
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [in warehouse, in transport, delivered]
 *     responses:
 *       201:
 *         description: Exhibition created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exhibition'
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - requires admin or curator role
 */
router.post(
  "/",
  protect,
  authorizeRoles("admin", "curator"),
  exhibitionMiddleware.validateExhibitionData,
  exhibitionController.createExhibition
);

/**
 * @swagger
 * /api/exhibitions/{id}:
 *   put:
 *     summary: Update an exhibition
 *     tags: [Exhibitions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Exhibition ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *               museum_id:
 *                 type: integer
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [in warehouse, in transport, delivered]
 *     responses:
 *       200:
 *         description: Exhibition updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exhibition'
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - requires admin or curator role
 *       404:
 *         description: Exhibition not found
 */
router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "curator"),
  exhibitionMiddleware.validateExhibitionUpdate,
  exhibitionController.updateExhibition
);

/**
 * @swagger
 * /api/exhibitions/{id}:
 *   delete:
 *     summary: Delete an exhibition
 *     tags: [Exhibitions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Exhibition ID
 *     responses:
 *       204:
 *         description: Exhibition deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - requires admin or curator role
 *       404:
 *         description: Exhibition not found
 */
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin", "curator"),
  exhibitionController.deleteExhibition
);

export default router;
