import express from "express";
import {
  create,
  remove,
  listByExhibition,
  firstPaintingByExhibition,
  listByPainting
} from "../controllers/exhibitionPainting.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ExhibitionPainting:
 *       type: object
 *       required:
 *         - exhibition_id
 *         - painting_id
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the exhibition-painting relationship
 *         exhibition_id:
 *           type: integer
 *           description: The ID of the exhibition
 *         painting_id:
 *           type: integer
 *           description: The ID of the painting
 *       example:
 *         id: 1
 *         exhibition_id: 5
 *         painting_id: 12
 */

/**
 * @swagger
 * tags:
 *   name: Exhibition Paintings
 *   description: Exhibition-painting relationship management API
 */

/**
 * @swagger
 * /api/exhibition-paintings:
 *   post:
 *     summary: Add a painting to an exhibition
 *     tags: [Exhibition Paintings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - exhibition_id
 *               - painting_id
 *             properties:
 *               exhibition_id:
 *                 type: integer
 *               painting_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Painting added to exhibition successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExhibitionPainting'
 *       400:
 *         description: Invalid input data or duplicate entry
 *       404:
 *         description: Exhibition or painting not found
 */
router.post("/", protect, authorizeRoles("admin", "curator"), create);

/**
 * @swagger
 * /api/exhibition-paintings:
 *   delete:
 *     summary: Remove a painting from an exhibition
 *     tags: [Exhibition Paintings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - exhibition_id
 *               - painting_id
 *             properties:
 *               exhibition_id:
 *                 type: integer
 *               painting_id:
 *                 type: integer
 *     responses:
 *       204:
 *         description: Painting removed from exhibition successfully
 *       404:
 *         description: Relationship not found
 */
router.delete("/",  protect, authorizeRoles("admin", "curator"), remove);

/**
 * @swagger
 * /api/exhibition-paintings/{exhibitionId}/first-painting:
 *   get:
 *     summary: Get the first painting for a specific exhibition
 *     tags: [Exhibition Paintings]
 *     parameters:
 *       - in: path
 *         name: exhibitionId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Exhibition ID
 *     responses:
 *       200:
 *         description: The first painting in the exhibition
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Painting'
 *       404:
 *         description: No painting found or exhibition not found
 */
router.get("/:exhibitionId/first-painting", firstPaintingByExhibition);

/**
 * @swagger
 * /api/exhibition-paintings/{exhibitionId}/paintings:
 *   get:
 *     summary: Get all paintings for a specific exhibition
 *     tags: [Exhibition Paintings]
 *     parameters:
 *       - in: path
 *         name: exhibitionId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Exhibition ID
 *     responses:
 *       200:
 *         description: List of paintings in the exhibition
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Painting'
 *       404:
 *         description: Exhibition not found
 */
router.get("/:exhibitionId/paintings", listByExhibition);

/**
 * @swagger
 * /api/exhibition-paintings/{paintingId}/exhibitions:
 *   get:
 *     summary: Get all exhibitions for a specific painting
 *     tags: [Exhibition Paintings]
 *     parameters:
 *       - in: path
 *         name: paintingId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Painting ID
 *     responses:
 *       200:
 *         description: List of exhibitions containing the painting
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Exhibition'
 *       404:
 *         description: Painting not found
 *       500:
 *         description: Server error
 */
router.get("/:paintingId/exhibitions", listByPainting);

export default router;
