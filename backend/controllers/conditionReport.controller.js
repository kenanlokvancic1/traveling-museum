import conditionReportService from '../services/conditionReport.service.js';
import ConditionReportRequestDTO from '../dto/conditionReport/requests/ConditionReportRequestDTO.js';
import errorHandler from '../middleware/errorHandler.js';
import { ConditionReportError } from '../errors/ConditionReportError.js';
import logger from '../utils/logger.js';

class ConditionReportController {
  createReport = errorHandler(async (req, res) => {
    logger.info("Create condition report request received", { body: req.body });
    
    const reportDTO = ConditionReportRequestDTO.fromRequest(req);
    const report = await conditionReportService.createReport(reportDTO);
    
    logger.info("Condition report created successfully", {
      reportId: report.id,
      paintingId: report.paintingId
    });
    
    res.status(201).json(report);
  });

  getAllReports = errorHandler(async (req, res) => {
    logger.info("Get all condition reports request received");
    
    const reports = await conditionReportService.getAllReports();
    
    logger.info("Retrieved all condition reports", { count: reports.length });
    res.json(reports);
  });

  getReportById = errorHandler(async (req, res) => {
    const { id } = req.params;
    logger.info("Get condition report by ID request received", { id });

    const report = await conditionReportService.getReportById(id);
    
    logger.info("Retrieved condition report", { id });
    res.json(report);
  });

  updateReport = errorHandler(async (req, res) => {
    const { id } = req.params;
    logger.info("Update condition report request received", { id, body: req.body });

    const reportDTO = ConditionReportRequestDTO.fromRequest(req);
    const report = await conditionReportService.updateReport(id, reportDTO);
    
    logger.info("Condition report updated successfully", { id });
    res.json(report);
  });

  deleteReport = errorHandler(async (req, res) => {
    const { id } = req.params;
    logger.info("Delete condition report request received", { id });

    await conditionReportService.deleteReport(id);
    
    logger.info("Condition report deleted successfully", { id });
    res.status(204).send();
  });

  getReportsByPaintingId = errorHandler(async (req, res) => {
    const { paintingId } = req.params;
    logger.info("Get reports by painting ID request received", { paintingId });

    const reports = await conditionReportService.getReportsByPaintingId(paintingId);
    
    logger.info("Retrieved condition reports for painting", {
      paintingId,
      count: reports.length
    });
    
    res.json(reports);
  });
}

export default new ConditionReportController();