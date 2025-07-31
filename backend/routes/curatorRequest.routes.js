import express from "express";
import controller from "../controllers/curatorRequest.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/curator-requests:
 *   post:
 *     summary: Create a new curator request
 *     tags: [CuratorRequests]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCuratorRequestDTO'
 *     responses:
 *       201:
 *         description: Created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CuratorRequestResponseDTO'
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 */
router.post("/", protect, controller.create);

/**
 * @swagger
 * /api/curator-requests:
 *   get:
 *     summary: Get all curator requests
 *     tags: [CuratorRequests]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of curator requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CuratorRequestResponseDTO'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get("/", protect, authorizeRoles(["admin"]), controller.getAll);

/**
 * @swagger
 * /api/curator-requests/{id}:
 *   get:
 *     summary: Get curator request by ID
 *     tags: [CuratorRequests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Curator request found
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 */
router.get("/:id", protect, authorizeRoles("admin"), controller.getById);

/**
 * @swagger
 * /api/curator-requests/user/{userId}:
 *   get:
 *     summary: Get curator requests by user ID
 *     tags: [CuratorRequests]
 */
router.get("/user/:userId", protect, authorizeRoles("admin"), controller.getByUserId);

/**
 * @swagger
 * /api/curator-requests/{id}/status:
 *   put:
 *     summary: Update curator request status
 *     tags: [CuratorRequests]
 *     security:
 *       - bearerAuth: []
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
 *               status:
 *                 type: string
 *                 enum: [pending, approved, rejected]
 *     responses:
 *       200:
 *         description: Status updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 */
router.put("/:id/status", protect, authorizeRoles("admin"), controller.updateStatus
);

/**
 * @swagger
 * /api/curator-requests/{id}/assign:
 *   put:
 *     summary: Assign admin to curator request
 *     tags: [CuratorRequests]
 */
router.put("/:id/assign", protect, authorizeRoles("admin"),  controller.assignAdmin);

/**
 * @swagger
 * /api/curator-requests/{id}:
 *   delete:
 *     summary: Delete curator request
 *     tags: [CuratorRequests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Request deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 */
router.delete("/:id", protect, authorizeRoles("admin"), controller.delete);

export default router;
