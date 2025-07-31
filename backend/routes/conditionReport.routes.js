import express from 'express';
import conditionReportController from '../controllers/conditionReport.controller.js';
import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
const router = express.Router();

/**
 * @swagger
 * /api/condition-reports:
 *   post:
 *     summary: Create a new condition report
 *     tags: [Condition Reports]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - paintingId
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               paintingId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Condition report created successfully
 *       400:
 *         description: Invalid input data
 */
router.post('/',  protect, authorizeRoles("admin", "curator"), conditionReportController.createReport);

/**
 * @swagger
 * /api/condition-reports:
 *   get:
 *     summary: Get all condition reports
 *     tags: [Condition Reports]
 *     responses:
 *       200:
 *         description: List of condition reports
 *       500:
 *         description: Server error
 */
router.get('/', protect, authorizeRoles("admin", "curator"), conditionReportController.getAllReports);

/**
 * @swagger
 * /api/condition-reports/{id}:
 *   get:
 *     summary: Get a condition report by ID
 *     tags: [Condition Reports]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Condition report found
 *       404:
 *         description: Report not found
 */
router.get('/:id', protect, authorizeRoles("admin", "curator"), conditionReportController.getReportById);

/**
 * @swagger
 * /api/condition-reports/{id}:
 *   put:
 *     summary: Update a condition report
 *     tags: [Condition Reports]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               paintingId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Report updated successfully
 *       404:
 *         description: Report not found
 */
router.patch('/:id', protect, authorizeRoles("admin", "curator"), conditionReportController.updateReport);

/**
 * @swagger
 * /api/condition-reports/{id}:
 *   delete:
 *     summary: Delete a condition report
 *     tags: [Condition Reports]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Report deleted successfully
 *       404:
 *         description: Report not found
 */
router.delete('/:id', protect, authorizeRoles("admin", "curator"), conditionReportController.deleteReport);

/**
 * @swagger
 * /api/condition-reports/painting/{paintingId}:
 *   get:
 *     summary: Get all condition reports for a specific painting
 *     tags: [Condition Reports]
 *     parameters:
 *       - in: path
 *         name: paintingId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of condition reports for the painting
 *       500:
 *         description: Server error
 */
router.get('/painting/:paintingId', protect, authorizeRoles("admin", "curator"), conditionReportController.getReportsByPaintingId);

export default router;