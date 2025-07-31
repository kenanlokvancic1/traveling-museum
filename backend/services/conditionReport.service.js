import ConditionReport from '../models/conditionReports.model.js';
import ConditionReportResponseDTO from '../dto/conditionReport/responses/ConditionReportResponseDTO.js';
import { ConditionReportError } from '../errors/ConditionReportError.js';
import logger from '../utils/logger.js';

class ConditionReportService {
  async createReport(reportData) {
    logger.debug("Creating new condition report", { data: reportData });

    const report = await ConditionReport.create(reportData);
    logger.info("Condition report created successfully", {
      reportId: report.condition_report_id,
      paintingId: report.painting_id
    });

    return ConditionReportResponseDTO.fromEntity(report);
  }

  async getAllReports() {
    logger.debug("Fetching all condition reports");
    const reports = await ConditionReport.findAll();
    logger.info("Retrieved all condition reports", { count: reports.length });
    
    return reports.map(report => ConditionReportResponseDTO.fromEntity(report));
  }

  async getReportById(id) {
    logger.debug("Fetching condition report by ID", { id });
    
    const report = await ConditionReport.findByPk(id);
    if (!report) {
      logger.warn("Condition report not found", { id });
      throw ConditionReportError.reportNotFound();
    }

    logger.info("Retrieved condition report", { id });
    return ConditionReportResponseDTO.fromEntity(report);
  }

  async updateReport(id, updateData) {
    logger.debug("Updating condition report", { id, updateData });

    const report = await ConditionReport.findByPk(id);
    if (!report) {
      logger.warn("Condition report not found for update", { id });
      throw ConditionReportError.reportNotFound();
    }

    await report.update(updateData);
    logger.info("Condition report updated successfully", { id });
    
    return ConditionReportResponseDTO.fromEntity(report);
  }

  async deleteReport(id) {
    logger.debug("Attempting to delete condition report", { id });

    const report = await ConditionReport.findByPk(id);
    if (!report) {
      logger.warn("Condition report not found for deletion", { id });
      throw ConditionReportError.reportNotFound();
    }

    await report.destroy();
    logger.info("Condition report deleted successfully", { id });
  }

  async getReportsByPaintingId(paintingId) {
    logger.debug("Fetching condition reports by painting ID", { paintingId });

    const reports = await ConditionReport.findAll({
      where: { painting_id: paintingId }
    });
    
    logger.info("Retrieved condition reports for painting", {
      paintingId,
      count: reports.length
    });

    return reports.map(report => ConditionReportResponseDTO.fromEntity(report));
  }
}

export default new ConditionReportService();