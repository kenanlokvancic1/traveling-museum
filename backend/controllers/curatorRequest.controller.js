import curatorRequestService from "../services/curatorRequest.service.js";
import logger from "../utils/logger.js";

class CuratorRequestController {
  async create(req, res) {
    try {
      const { motivation, cv_url, user_id, additional_files } = req.body;

      if (!motivation || !cv_url || !user_id) {
        return res.status(400).json({
          message: 'Failed to create curator request.',
          details: 'Missing required fields: motivation, cv_url, user_id'
        });
      }

      const result = await curatorRequestService.create({
        motivation,
        cv_url,
        user_id,
        additional_files: additional_files || []
      });

      res.status(201).json(result);
    } catch (error) {
      console.error('Error creating curator request:', error);
      res.status(500).json({
        message: 'Failed to create curator request.',
        details: error.message
      });
    }
  }

  async getAll(req, res) {
    try {
      const result = await curatorRequestService.getAll();
      res.status(200).json(result);
    } catch (error) {
      logger.error("Error fetching curator requests", { error: error.message });
      res.status(500).json({ message: "Failed to fetch curator requests." });
    }
  }

  async getById(req, res) {
    try {
      const result = await curatorRequestService.getById(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      logger.error("Error fetching curator request", { error: error.message });
      res.status(404).json({ message: "Curator request not found." });
    }
  }

  async getByUserId(req, res) {
    try {
      const result = await curatorRequestService.getByUserId(req.params.userId);
      res.status(200).json(result);
    } catch (error) {
      logger.error("Error fetching user's curator requests", { error: error.message });
      res.status(500).json({ message: "Failed to fetch curator requests." });
    }
  }

  async updateStatus(req, res) {
    try {
      const result = await curatorRequestService.updateStatus(req.params.id, req.body);
      res.status(200).json(result);
    } catch (error) {
      logger.error("Error updating status", { error: error.message });
      res.status(500).json({ message: "Failed to update status." });
    }
  }

  async assignAdmin(req, res) {
    try {
      const result = await curatorRequestService.assignAdminToRequest(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      logger.error("Error assigning admin", { error: error.message });
      res.status(500).json({ message: "Failed to assign admin." });
    }
  }

  async delete(req, res) {
    try {
      const deleted = await curatorRequestService.delete(req.params.id);
      if (deleted) {
        res.status(200).json({ message: "Curator request deleted." });
      } else {
        res.status(404).json({ message: "Request not found." });
      }
    } catch (error) {
      logger.error("Error deleting request", { error: error.message });
      res.status(500).json({ message: "Failed to delete request." });
    }
  }
}

export default new CuratorRequestController();