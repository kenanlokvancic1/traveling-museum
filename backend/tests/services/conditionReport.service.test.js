import { describe, it, expect, vi, beforeEach } from "vitest";
import conditionReportService from "../../services/conditionReport.service.js";
import ConditionReport from "../../models/conditionReports.model.js";
import ConditionReportResponseDTO from "../../dto/conditionReport/responses/ConditionReportResponseDTO.js";
import { ConditionReportError } from "../../errors/ConditionReportError.js";

describe("ConditionReportService", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should create a new report", async () => {
    const dto = { painting_id: 1, status: "Good" };
    const fakeReport = {
      condition_report_id: 1,
      painting_id: 1,
      status: "Good",
    };
    vi.spyOn(ConditionReport, "create").mockResolvedValue(fakeReport);

    const result = await conditionReportService.createReport(dto);

    expect(result).toEqual(ConditionReportResponseDTO.fromEntity(fakeReport));
    expect(ConditionReport.create).toHaveBeenCalledWith(dto);
  });

  it("should get all reports", async () => {
    const fakeReports = [
      { condition_report_id: 1, painting_id: 1, status: "Good" },
      { condition_report_id: 2, painting_id: 2, status: "Bad" },
    ];
    vi.spyOn(ConditionReport, "findAll").mockResolvedValue(fakeReports);

    const result = await conditionReportService.getAllReports();

    expect(result).toEqual(
      fakeReports.map(ConditionReportResponseDTO.fromEntity)
    );
    expect(ConditionReport.findAll).toHaveBeenCalled();
  });

  it("should get report by id", async () => {
    const fakeReport = {
      condition_report_id: 1,
      painting_id: 1,
      status: "Good",
    };
    vi.spyOn(ConditionReport, "findByPk").mockResolvedValue(fakeReport);

    const result = await conditionReportService.getReportById(1);

    expect(result).toEqual(ConditionReportResponseDTO.fromEntity(fakeReport));
    expect(ConditionReport.findByPk).toHaveBeenCalledWith(1);
  });

  it("should throw if report by id not found", async () => {
    vi.spyOn(ConditionReport, "findByPk").mockResolvedValue(null);

    await expect(conditionReportService.getReportById(1)).rejects.toThrow(
      ConditionReportError.reportNotFound().message
    );
  });

  it("should update a report", async () => {
    const fakeReport = {
      update: vi.fn(),
      condition_report_id: 1,
      painting_id: 1,
      status: "Good",
    };
    vi.spyOn(ConditionReport, "findByPk").mockResolvedValue(fakeReport);

    const updateData = { status: "Restored" };
    fakeReport.update.mockResolvedValue();

    const result = await conditionReportService.updateReport(1, updateData);

    expect(fakeReport.update).toHaveBeenCalledWith(updateData);
    expect(result).toEqual(ConditionReportResponseDTO.fromEntity(fakeReport));
  });

  it("should throw if update report not found", async () => {
    vi.spyOn(ConditionReport, "findByPk").mockResolvedValue(null);

    await expect(conditionReportService.updateReport(1, {})).rejects.toThrow(
      ConditionReportError.reportNotFound().message
    );
  });

  it("should delete a report", async () => {
    const fakeReport = { destroy: vi.fn(), condition_report_id: 1 };
    vi.spyOn(ConditionReport, "findByPk").mockResolvedValue(fakeReport);
    fakeReport.destroy.mockResolvedValue();

    await conditionReportService.deleteReport(1);

    expect(fakeReport.destroy).toHaveBeenCalled();
  });

  it("should throw if delete report not found", async () => {
    vi.spyOn(ConditionReport, "findByPk").mockResolvedValue(null);

    await expect(conditionReportService.deleteReport(1)).rejects.toThrow(
      ConditionReportError.reportNotFound().message
    );
  });

  it("should get reports by painting id", async () => {
    const fakeReports = [
      { condition_report_id: 1, painting_id: 1, status: "Good" },
    ];
    vi.spyOn(ConditionReport, "findAll").mockResolvedValue(fakeReports);

    const result = await conditionReportService.getReportsByPaintingId(1);

    expect(result).toEqual(
      fakeReports.map(ConditionReportResponseDTO.fromEntity)
    );
    expect(ConditionReport.findAll).toHaveBeenCalledWith({
      where: { painting_id: 1 },
    });
  });
});
