import express from "express";
const router = express.Router();
import * as favoriteController from "../controllers/favorite.controller.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     Favorite:
 *       type: object
 *       required:
 *         - user_id
 *         - painting_id
 *       properties:
 *         favorite_id:
 *           type: integer
 *           description: The auto-generated ID of the favorite
 *         user_id:
 *           type: integer
 *           description: The ID of the user who favorited the painting
 *         painting_id:
 *           type: integer
 *           description: The ID of the painting that was favorited
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date and time when the favorite was created
 *       example:
 *         favorite_id: 1
 *         user_id: 5
 *         painting_id: 12
 *         created_at: 2023-06-15T14:30:00Z
 */

/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: User favorites management API
 */

/**
 * @swagger
 * /api/favorites:
 *   post:
 *     summary: Create a new favorite
 *     tags: [Favorites]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - painting_id
 *             properties:
 *               user_id:
 *                 type: integer
 *               painting_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Favorite created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Favorite'
 *       400:
 *         description: Invalid input data or duplicate favorite
 */
router.post("/", favoriteController.createFavorite);

/**
 * @swagger
 * /api/favorites:
 *   get:
 *     summary: Returns a list of all favorites
 *     tags: [Favorites]
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: integer
 *         description: Filter favorites by user ID
 *       - in: query
 *         name: painting_id
 *         schema:
 *           type: integer
 *         description: Filter favorites by painting ID
 *     responses:
 *       200:
 *         description: List of favorites
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Favorite'
 */
router.get("/", favoriteController.getAllFavorites);

/**
 * @swagger
 * /api/favorites/{id}:
 *   get:
 *     summary: Get a favorite by ID
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Favorite ID
 *     responses:
 *       200:
 *         description: Favorite details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Favorite'
 *       404:
 *         description: Favorite not found
 */
router.get("/:id", favoriteController.getFavoriteById);

/**
 * @swagger
 * /api/favorites/user/{userId}:
 *   get:
 *     summary: Get all favorites by user ID
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of favorites for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Favorite'
 *       404:
 *         description: User not found
 */
router.get("/user/:userId", favoriteController.getFavoritesByUserId);

/**
 * @swagger
 * /api/favorites/check/{paintingId}/{userId}:
 *   get:
 *     summary: Check if a painting is favorited by a user
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: paintingId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Painting ID
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: Favorite status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isFavorite:
 *                   type: boolean
 */
router.get("/check/:paintingId/:userId", favoriteController.checkFavorite);

/**
 * @swagger
 * /api/favorites/{id}:
 *   delete:
 *     summary: Delete a favorite by ID
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Favorite ID
 *     responses:
 *       204:
 *         description: Favorite deleted successfully
 *       404:
 *         description: Favorite not found
 */
router.delete("/:id", favoriteController.deleteFavorite);

/**
 * @swagger
 * /api/favorites/{paintingId}/{userId}:
 *   delete:
 *     summary: Delete a favorite by painting ID and user ID
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: paintingId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Painting ID
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     responses:
 *       204:
 *         description: Favorite deleted successfully
 *       404:
 *         description: Favorite not found
 */
router.delete(
  "/:paintingId/:userId",
  favoriteController.deleteFavoriteByPaintingAndUser
);

export default router;
