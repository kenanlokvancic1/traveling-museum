import express from 'express';
import notificationController from '../controllers/notification.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { authorizeRoles } from '../middleware/role.middleware.js';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: API for managing notifications
 */

/**
 * @swagger
 * /notifications:
 *   post:
 *     summary: Create a new notification
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - title
 *               - time
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 1
 *               title:
 *                 type: string
 *                 example: Curator Request
 *               details:
 *                 type: string
 *                 example: User X requested curator role
 *               time:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-05-13T12:00:00Z"
 *     responses:
 *       201:
 *         description: Notification created successfully
 *       500:
 *         description: Server error
 */
router.post('/', protect, authorizeRoles("admin", "curator"), notificationController.createNotification);

/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Get all notifications
 *     tags: [Notifications]
 *     responses:
 *       200:
 *         description: List of notifications
 *       500:
 *         description: Server error
 */
router.get('/', protect, authorizeRoles("admin", "curator"), notificationController.getAllNotifications);

/**
 * @swagger
 * /notifications/user/{userId}:
 *   get:
 *     summary: Get notifications by user ID
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: User notifications
 *       500:
 *         description: Server error
 */
router.get('/user/:userId', protect, authorizeRoles("admin", "curator"), notificationController.getNotificationsByUserId);

// /**
//  * @swagger
//  * /notifications/time:
//  *   get:
//  *     summary: Get notifications in a time range
//  *     tags: [Notifications]
//  *     parameters:
//  *       - in: query
//  *         name: from
//  *         schema:
//  *           type: string
//  *           format: date-time
//  *         required: true
//  *         example: "2025-05-01T00:00:00Z"
//  *       - in: query
//  *         name: to
//  *         schema:
//  *           type: string
//  *           format: date-time
//  *         required: true
//  *         example: "2025-05-15T00:00:00Z"
//  *     responses:
//  *       200:
//  *         description: Notifications in time range
//  *       400:
//  *         description: Missing query parameters
//  *       500:
//  *         description: Server error
//  */
// router.get('/time', notificationController.getNotificationsByTimeRange);

/**
 * @swagger
 * /notifications/{id}:
 *   delete:
 *     summary: Delete a notification by ID
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 3
 *     responses:
 *       200:
 *         description: Notification deleted successfully
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', protect, authorizeRoles("admin", "curator"), notificationController.deleteNotification);

/**
 * @swagger
 * /notifications/{id}:
 *   patch:
 *     summary: Update a notification's read status
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - read
 *             properties:
 *               read:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Notification updated successfully
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Server error
 */
router.patch('/:id', protect, notificationController.updateNotification);

export default router;
