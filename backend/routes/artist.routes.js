import express from "express";
import * as artistController from "../controllers/artist.controller.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Artist:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         artist_id:
 *           type: integer
 *           description: The auto-generated ID of the artist
 *         name:
 *           type: string
 *           description: The name of the artist
 *         bio:
 *           type: string
 *           description: Biography of the artist
 *         birth_date:
 *           type: string
 *           format: date
 *           description: Birth date of the artist
 *         death_date:
 *           type: string
 *           format: date
 *           description: Death date of the artist (if applicable)
 *         nationality:
 *           type: string
 *           description: Nationality of the artist
 *       example:
 *         artist_id: 1
 *         name: Vincent van Gogh
 *         bio: Dutch post-impressionist painter who posthumously became one of the most famous figures in Western art history
 *         birth_date: 1853-03-30
 *         death_date: 1890-07-29
 *         nationality: Dutch
 */

/**
 * @swagger
 * tags:
 *   name: Artists
 *   description: Artist management API
 */

/**
 * @swagger
 * /api/artists:
 *   post:
 *     summary: Create a new artist
 *     tags: [Artists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               bio:
 *                 type: string
 *               birth_date:
 *                 type: string
 *                 format: date
 *               death_date:
 *                 type: string
 *                 format: date
 *               nationality:
 *                 type: string
 *     responses:
 *       201:
 *         description: Artist created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artist'
 *       400:
 *         description: Invalid input data
 */
router.post(
  "/",
  authorizeRoles("admin", "curator"),
  artistController.createArtist
);

/**
 * @swagger
 * /api/artists:
 *   get:
 *     summary: Returns a list of all artists
 *     tags: [Artists]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter artists by name
 *       - in: query
 *         name: nationality
 *         schema:
 *           type: string
 *         description: Filter artists by nationality
 *     responses:
 *       200:
 *         description: List of artists
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Artist'
 */
router.get("/", artistController.getAllArtists);

/**
 * @swagger
 * /api/artists/{id}:
 *   get:
 *     summary: Get an artist by ID
 *     tags: [Artists]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Artist ID
 *     responses:
 *       200:
 *         description: Artist details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artist'
 *       404:
 *         description: Artist not found
 */
router.get("/:id", artistController.getArtistById);

/**
 * @swagger
 * /api/artists/{id}:
 *   put:
 *     summary: Update an artist
 *     tags: [Artists]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Artist ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               bio:
 *                 type: string
 *               birth_date:
 *                 type: string
 *                 format: date
 *               death_date:
 *                 type: string
 *                 format: date
 *               nationality:
 *                 type: string
 *     responses:
 *       200:
 *         description: Artist updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artist'
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Artist not found
 */
router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "curator"),
  artistController.updateArtist
);

/**
 * @swagger
 * /api/artists/{id}:
 *   delete:
 *     summary: Delete an artist
 *     tags: [Artists]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Artist ID
 *     responses:
 *       204:
 *         description: Artist deleted successfully
 *       404:
 *         description: Artist not found
 */
router.delete("/:id", authorizeRoles("admin"), artistController.deleteArtist);

export default router;
