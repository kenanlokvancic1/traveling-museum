import express from "express";
const router = express.Router();
import * as paintingController from "../controllers/painting.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     Painting:
 *       type: object
 *       required:
 *         - title
 *         - artist_id
 *       properties:
 *         painting_id:
 *           type: integer
 *           description: The auto-generated ID of the painting
 *         title:
 *           type: string
 *           description: The title of the painting
 *         artist_id:
 *           type: integer
 *           description: The ID of the artist who created the painting
 *         year:
 *           type: integer
 *           description: The year the painting was created
 *         description:
 *           type: string
 *           description: Description of the painting
 *         image_url:
 *           type: string
 *           description: URL to the painting image
 *         medium:
 *           type: string
 *           description: The medium used for the painting (e.g., oil on canvas)
 *         dimensions:
 *           type: string
 *           description: The dimensions of the painting
 *       example:
 *         painting_id: 1
 *         title: The Starry Night
 *         artist_id: 1
 *         year: 1889
 *         description: One of Vincent van Gogh's best known works
 *         image_url: https://example.com/starry-night.jpg
 *         medium: Oil on canvas
 *         dimensions: 73.7 × 92.1 cm
 */

/**
 * @swagger
 * tags:
 *   name: Paintings
 *   description: Painting management API
 */

/**
 * @swagger
 * /api/paintings:
 *   post:
 *     summary: Create a new painting
 *     tags: [Paintings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - artist_id
 *             properties:
 *               title:
 *                 type: string
 *               artist_id:
 *                 type: integer
 *               year:
 *                 type: integer
 *               description:
 *                 type: string
 *               image_url:
 *                 type: string
 *               medium:
 *                 type: string
 *               dimensions:
 *                 type: string
 *     responses:
 *       201:
 *         description: Painting created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Painting'
 *       400:
 *         description: Invalid input data
 */
router.post("/", protect, authorizeRoles("admin", "curator"), paintingController.createPainting);

/**
 * @swagger
 * /api/paintings:
 *   get:
 *     summary: Returns a list of all paintings
 *     tags: [Paintings]
 *     parameters:
 *       - in: query
 *         name: artist_id
 *         schema:
 *           type: integer
 *         description: Filter paintings by artist ID
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Search paintings by title
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         description: Filter paintings by year
 *     responses:
 *       200:
 *         description: List of paintings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Painting'
 */
router.get("/", paintingController.getAllPaintings);

/**
 * @swagger
 * /api/paintings/{id}:
 *   get:
 *     summary: Get a painting by ID
 *     tags: [Paintings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Painting ID
 *     responses:
 *       200:
 *         description: Painting details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Painting'
 *       404:
 *         description: Painting not found
 */
router.get("/:id", paintingController.getPaintingById);

/**
 * @swagger
 * /api/paintings/{id}:
 *   put:
 *     summary: Update a painting
 *     tags: [Paintings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Painting ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               artist_id:
 *                 type: integer
 *               year:
 *                 type: integer
 *               description:
 *                 type: string
 *               image_url:
 *                 type: string
 *               medium:
 *                 type: string
 *               dimensions:
 *                 type: string
 *     responses:
 *       200:
 *         description: Painting updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Painting'
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Painting not found
 */
router.put("/:id", protect, authorizeRoles("admin", "curator"), paintingController.updatePainting);

/**
 * @swagger
 * /api/paintings/{id}:
 *   delete:
 *     summary: Delete a painting
 *     tags: [Paintings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Painting ID
 *     responses:
 *       204:
 *         description: Painting deleted successfully
 *       404:
 *         description: Painting not found
 */
router.delete("/:id", protect, authorizeRoles("admin", "curator"), paintingController.deletePainting);

export default router;