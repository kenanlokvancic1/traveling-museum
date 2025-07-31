import express from "express";
import * as reviewController from "../controllers/review.controller.js";
import * as reviewMiddleware from "../middleware/review.middleware.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - user_id
 *         - exhibition_id
 *         - rating
 *       properties:
 *         review_id:
 *           type: integer
 *           description: The auto-generated ID of the review
 *         user_id:
 *           type: integer
 *           description: The user ID who created the review
 *         exhibition_id:
 *           type: integer
 *           description: The exhibition ID being reviewed
 *         rating:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *           description: Rating from 1-5
 *         comment:
 *           type: string
 *           maxLength: 100
 *           description: Optional comment about the exhibition
 *       example:
 *         review_id: 1
 *         user_id: 5
 *         exhibition_id: 3
 *         rating: 4
 *         comment: Great exhibition, really enjoyed the artwork!
 */

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Exhibition review management API
 */

/**
 * @swagger
 * /api/reviews:
 *   get:
 *     summary: Returns a list of all reviews
 *     tags: [Reviews]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         description: Filter reviews by user ID
 *       - in: query
 *         name: exhibitionId
 *         schema:
 *           type: integer
 *         description: Filter reviews by exhibition ID
 *       - in: query
 *         name: minRating
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *         description: Filter reviews by minimum rating
 *     responses:
 *       200:
 *         description: List of reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 */
router.get("/", reviewController.getAllReviews);

/**
 * @swagger
 * /api/reviews/{id}:
 *   get:
 *     summary: Get a review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Review ID
 *     responses:
 *       200:
 *         description: Review details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Review not found
 */
router.get("/:id", reviewController.getReviewById);

/**
 * @swagger
 * /api/reviews/exhibition/{exhibitionId}/rating:
 *   get:
 *     summary: Get average rating for an exhibition
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: exhibitionId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Exhibition ID
 *     responses:
 *       200:
 *         description: Average rating and total reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 averageRating:
 *                   type: string
 *                   description: Average rating with one decimal place
 *                 totalReviews:
 *                   type: integer
 *                   description: Total number of reviews
 */
router.get(
  "/exhibition/:exhibitionId/rating",
  reviewController.getExhibitionAverageRating
);

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - exhibition_id
 *               - rating
 *             properties:
 *               exhibition_id:
 *                 type: integer
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *                 maxLength: 100
 *     responses:
 *       201:
 *         description: Review created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: Invalid input data or duplicate review
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  protect,
  reviewMiddleware.validateReviewData,
  reviewMiddleware.checkDuplicateReview,
  reviewController.createReview
);

/**
 * @swagger
 * /api/reviews/{id}:
 *   put:
 *     summary: Update a review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Review ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *                 maxLength: 100
 *     responses:
 *       200:
 *         description: Review updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - not the review owner
 *       404:
 *         description: Review not found
 */
router.put(
  "/:id",
  protect,
  reviewMiddleware.validateReviewData,
  reviewMiddleware.checkReviewOwnership,
  reviewController.updateReview
);

/**
 * @swagger
 * /api/reviews/{id}:
 *   delete:
 *     summary: Delete a review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Review ID
 *     responses:
 *       204:
 *         description: Review deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - not the review owner or admin
 *       404:
 *         description: Review not found
 */
router.delete(
  "/:id",
  protect,
  reviewMiddleware.checkReviewOwnership,
  reviewController.deleteReview
);

export default router;
