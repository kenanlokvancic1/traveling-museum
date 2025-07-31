import express from "express";
import * as museumController from "../controllers/museum.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from '../middleware/role.middleware.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Museum:
 *       type: object
 *       required:
 *         - name
 *         - location
 *       properties:
 *         museum_id:
 *           type: integer
 *           description: The auto-generated ID of the museum
 *         name:
 *           type: string
 *           description: The name of the museum
 *         location:
 *           type: string
 *           description: The location/address of the museum
 *         description:
 *           type: string
 *           description: Description of the museum
 *         image_url:
 *           type: string
 *           description: URL to the museum image
 *         website:
 *           type: string
 *           description: The museum's website URL
 *       example:
 *         museum_id: 1
 *         name: Museum of Modern Art
 *         location: 11 West 53rd Street, New York, NY
 *         description: The Museum of Modern Art (MoMA) is an art museum located in New York City
 *         image_url: https://example.com/moma.jpg
 *         website: https://www.moma.org
 */

/**
 * @swagger
 * tags:
 *   name: Museums
 *   description: Museum management API
 */

/**
 * @swagger
 * /api/museums:
 *   post:
 *     summary: Create a new museum
 *     tags: [Museums]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - location
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               description:
 *                 type: string
 *               image_url:
 *                 type: string
 *               website:
 *                 type: string
 *     responses:
 *       201:
 *         description: Museum created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Museum'
 *       400:
 *         description: Invalid input data
 */
router.post("/", protect, authorizeRoles('admin'), museumController.createMuseum);

/**
 * @swagger
 * /api/museums:
 *   get:
 *     summary: Returns a list of all museums
 *     tags: [Museums]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Search museums by name
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Filter museums by location
 *     responses:
 *       200:
 *         description: List of museums
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Museum'
 */
router.get("/", museumController.getAllMuseums);

/**
 * @swagger
 * /api/museums/{id}:
 *   get:
 *     summary: Get a museum by ID
 *     tags: [Museums]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Museum ID
 *     responses:
 *       200:
 *         description: Museum details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Museum'
 *       404:
 *         description: Museum not found
 */
router.get("/:id", museumController.getMuseumById);

/**
 * @swagger
 * /api/museums/{id}:
 *   put:
 *     summary: Update a museum
 *     tags: [Museums]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Museum ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               description:
 *                 type: string
 *               image_url:
 *                 type: string
 *               website:
 *                 type: string
 *     responses:
 *       200:
 *         description: Museum updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Museum'
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Museum not found
 */
router.put("/:id", protect, authorizeRoles('admin'), museumController.updateMuseum);

/**
 * @swagger
 * /api/museums/{id}:
 *   delete:
 *     summary: Delete a museum
 *     tags: [Museums]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Museum ID
 *     responses:
 *       204:
 *         description: Museum deleted successfully
 *       404:
 *         description: Museum not found
 */
router.delete("/:id", protect, authorizeRoles('admin'), museumController.deleteMuseum);

export default router;
