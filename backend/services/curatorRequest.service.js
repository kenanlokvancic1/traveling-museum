import CuratorRequest from "../models/curator_request.model.js";
import User from "../models/user.model.js";
import { Op } from "sequelize";
import {
  sendCuratorRequestEmail,
  sendCuratorApprovalEmail,
  sendAdminNotificationEmail
} from "../services/mail.service.js";
import CuratorRequestResponseDTO from "../dto/curatorRequest/responses/CuratorRequestResponseDTO.js";
import CuratorRequestCreateResponseDTO from "../dto/curatorRequest/responses/CuratorRequestResponseDTO.js";
import logger from "../utils/logger.js";
import notificationService from "./notification.service.js";

class CuratorRequestService {
  async create(data) {
    try {
      const { motivation, cv_url, user_id, additional_files } = data;

      if (!motivation || !cv_url || !user_id) {
        throw new Error('Missing required fields: motivation, cv_url, user_id');
      }

      const curatorRequest = await CuratorRequest.create({
        motivation,
        cv_url,
        user_id,
        additional_files: additional_files || [],
        status: "pending"
      });

      const user = await User.findByPk(user_id);
      if (!user) {
        throw new Error("User not found");
      }

      try {
        await sendCuratorRequestEmail(user, {
          message: motivation,
          cv_url: cv_url,
          additional_files: additional_files || []
        });
      } catch (emailError) {
        logger.error("Failed to send confirmation email to applicant", {
          userId: user_id,
          error: emailError.message
        });
      }

      const admins = await User.findAll({ 
        where: { role: "admin" },
        attributes: ['user_id', 'email', 'name']
      });

      if (!admins.length) {
        throw new Error("No administrators available");
      }

      const adminCounts = await Promise.all(
        admins.map(async (admin) => {
          const count = await CuratorRequest.count({
            where: { 
              assigned_admin_id: admin.user_id,
              status: 'pending'
            }
          });
          return { admin, count };
        })
      );

      const { admin: selectedAdmin } = adminCounts.sort((a, b) => a.count - b.count)[0];

      curatorRequest.assigned_admin_id = selectedAdmin.user_id;
      await curatorRequest.save();

      await notificationService.createNotification({
        user_id: selectedAdmin.user_id,
        title: "New Curator Request",
        details: JSON.stringify({
          type: "CURATOR_REQUEST",
          requestId: curatorRequest.curator_request_id,
          applicantId: user_id,
          message: motivation,
          cv_url: cv_url
        }),
        time: new Date(),
        read: false
      });

      try {
        await sendAdminNotificationEmail(selectedAdmin.email, {
          requestId: curatorRequest.curator_request_id,
          applicantName: (await User.findByPk(user_id))?.name || 'Unknown'
        });
      } catch (emailError) {
        logger.error("Failed to send admin notification email", emailError);
      }

      return new CuratorRequestCreateResponseDTO(curatorRequest);
    } catch (error) {
      logger.error('Service error:', error);
      throw error;
    }
  }

  async getAll() {
    const requests = await CuratorRequest.findAll();
    return requests.map((r) => new CuratorRequestResponseDTO(r));
  }

  async getById(id) {
    const request = await CuratorRequest.findByPk(id);
    if (!request) throw new Error("Curator request not found");
    return new CuratorRequestResponseDTO(request);
  }

  async getByUserId(userId) {
    const requests = await CuratorRequest.findAll({ where: { user_id: userId } });
    return requests.map((r) => new CuratorRequestResponseDTO(r));
  }

  async updateStatus(id, { status, admin_id }) {
    const request = await CuratorRequest.findByPk(id);
    if (!request) {
      throw new Error("Curator request not found");
    }

    if (request.assigned_admin_id && request.assigned_admin_id !== admin_id) {
      throw new Error("Only the assigned admin can update this request");
    }

    request.status = status;
    await request.save();

    const user = await User.findByPk(request.user_id);
    if (!user) {
      throw new Error("User not found");
    }

    try {
      await sendCuratorApprovalEmail(user, status);
    } catch (emailError) {
      logger.error("Failed to send status update email", {
        userId: user.user_id,
        status,
        error: emailError.message
      });
    }

    await notificationService.createNotification({
      user_id: request.user_id,
      title: status === 'approved' ? "Curator Request Approved" : "Curator Request Rejected",
      details: status === 'approved' 
        ? "Your request to become a curator has been approved!"
        : "Your request to become a curator has been rejected.",
      time: new Date(),
      read: false
    });

    if (status === 'approved') {
      await User.update(
        { role: 'curator' },
        { where: { user_id: request.user_id } }
      );
    }

    await request.destroy();

    return { 
      message: `Curator request ${status} successfully`,
      status
    };
  }

  async assignAdminToRequest(id) {
    const admins = await User.findAll({ where: { role: "admin" } });
    if (!admins.length) throw new Error("No admins found");

    const requestCounts = await Promise.all(
      admins.map(async (admin) => {
        const count = await CuratorRequest.count({ where: { assigned_admin_id: admin.user_id } });
        return { admin, count };
      })
    );

    const selectedAdmin = requestCounts.sort((a, b) => a.count - b.count)[0].admin;

    const request = await CuratorRequest.findByPk(id);
    if (!request) throw new Error("Curator request not found");

    request.assigned_admin_id = selectedAdmin.user_id;
    await request.save();

    return new CuratorRequestResponseDTO(request);
  }

  async delete(id) {
    const request = await CuratorRequest.findByPk(id);
    if (!request) return false;
    await request.destroy();
    return true;
  }
}

export default new CuratorRequestService();
