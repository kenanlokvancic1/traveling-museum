import { describe, it, expect, vi, beforeEach } from "vitest";
import conditionReportController from "../../controllers/conditionReport.controller.js";
import conditionReportService from "../../services/conditionReport.service.js";
import ConditionReportRequestDTO from "../../dto/conditionReport/requests/ConditionReportRequestDTO.js";
import { ConditionReportError } from "../../errors/ConditionReportError.js";
import logger from "../../utils/logger.js";

describe("conditionReport.controller (unit tests)", () => {
  let req, res, next;

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(logger, "info").mockImplementation(() => {});
    vi.spyOn(logger, "debug").mockImplementation(() => {});
    vi.spyOn(logger, "warn").mockImplementation(() => {});
    req = { body: {}, params: {} };
    res = {
      json: vi.fn(),
      status: vi.fn(() => res),
      send: vi.fn(() => res),
    };
    next = vi.fn();
  });

  it("should create a report and return 201", async () => {
    const fakeResult = { id: 1, paintingId: 1, status: "Good" };
    vi.spyOn(ConditionReportRequestDTO, "fromRequest").mockReturnValue({
      painting_id: 1,
      status: "Good",
    });
    vi.spyOn(conditionReportService, "createReport").mockResolvedValue(
      fakeResult
    );
    req.body = { painting_id: 1, status: "Good" };

    await conditionReportController.createReport(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(fakeResult);
    expect(conditionReportService.createReport).toHaveBeenCalled();
  });

  it("should get all reports and return 200", async () => {
    const fakeResult = [{ id: 1, paintingId: 1, status: "Good" }];
    vi.spyOn(conditionReportService, "getAllReports").mockResolvedValue(
      fakeResult
    );

    await conditionReportController.getAllReports(req, res, next);

    expect(res.json).toHaveBeenCalledWith(fakeResult);
    expect(conditionReportService.getAllReports).toHaveBeenCalled();
  });

  it("should get report by id and return 200", async () => {
    const fakeResult = { id: 1, paintingId: 1, status: "Good" };
    vi.spyOn(conditionReportService, "getReportById").mockResolvedValue(
      fakeResult
    );
    req.params.id = 1;

    await conditionReportController.getReportById(req, res, next);

    expect(res.json).toHaveBeenCalledWith(fakeResult);
    expect(conditionReportService.getReportById).toHaveBeenCalledWith(1);
  });

  it("should return 404 if getReportById throws", async () => {
    vi.spyOn(conditionReportService, "getReportById").mockRejectedValue(
      ConditionReportError.reportNotFound()
    );
    req.params.id = 1;

    await conditionReportController.getReportById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Condition report not found",
      })
    );
  });

  it("should update report and return 200", async () => {
    const fakeResult = { id: 1, paintingId: 1, status: "Restored" };
    vi.spyOn(ConditionReportRequestDTO, "fromRequest").mockReturnValue({
      status: "Restored",
    });
    vi.spyOn(conditionReportService, "updateReport").mockResolvedValue(
      fakeResult
    );
    req.params.id = 1;
    req.body = { status: "Restored" };

    await conditionReportController.updateReport(req, res, next);

    expect(res.json).toHaveBeenCalledWith(fakeResult);
    expect(conditionReportService.updateReport).toHaveBeenCalledWith(1, {
      status: "Restored",
    });
  });

  it("should return 404 if updateReport throws", async () => {
    vi.spyOn(ConditionReportRequestDTO, "fromRequest").mockReturnValue({
      status: "Restored",
    });
    vi.spyOn(conditionReportService, "updateReport").mockRejectedValue(
      ConditionReportError.reportNotFound()
    );
    req.params.id = 1;
    req.body = { status: "Restored" };

    await conditionReportController.updateReport(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Condition report not found",
      })
    );
  });

  it("should delete report and return 204", async () => {
    vi.spyOn(conditionReportService, "deleteReport").mockResolvedValue();
    req.params.id = 1;

    await conditionReportController.deleteReport(req, res, next);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
    expect(conditionReportService.deleteReport).toHaveBeenCalledWith(1);
  });

  it("should return 404 if deleteReport throws", async () => {
    vi.spyOn(conditionReportService, "deleteReport").mockRejectedValue(
      ConditionReportError.reportNotFound()
    );
    req.params.id = 1;

    await conditionReportController.deleteReport(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Condition report not found",
      })
    );
  });

  it("should get reports by painting id and return 200", async () => {
    const fakeResult = [{ id: 1, paintingId: 1, status: "Good" }];
    vi.spyOn(
      conditionReportService,
      "getReportsByPaintingId"
    ).mockResolvedValue(fakeResult);
    req.params.paintingId = 1;

    await conditionReportController.getReportsByPaintingId(req, res, next);

    expect(res.json).toHaveBeenCalledWith(fakeResult);
    expect(conditionReportService.getReportsByPaintingId).toHaveBeenCalledWith(
      1
    );
  });
});
