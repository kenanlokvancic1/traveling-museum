import { describe, it, expect, vi, beforeEach } from "vitest";
import * as museumController from "../../controllers/museum.controller.js";
import MuseumService from "../../services/museum.service.js";
import logger from "../../utils/logger.js";

describe("museum.controller (unit tests)", () => {
  let req, res, next;

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(logger, "info").mockImplementation(() => {});
    vi.spyOn(logger, "warn").mockImplementation(() => {});
    req = { body: {}, params: {} };
    res = {
      json: vi.fn(),
      status: vi.fn(() => res),
      send: vi.fn(() => res),
    };
    next = vi.fn();
  });

  it("should create museum and return 201", async () => {
    const fakeResult = { museum_id: 1, name: "MoMA", location: "NYC" };
    vi.spyOn(MuseumService, "createMuseum").mockResolvedValue(fakeResult);
    req.body = { name: "MoMA", location: "NYC" };

    await museumController.createMuseum(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1, name: "MoMA", location: "NYC" })
    );
    expect(MuseumService.createMuseum).toHaveBeenCalled();
  });

  it("should get all museums and return 200", async () => {
    const fakeMuseums = [
      { id: 1, name: "MoMA", location: "NYC" },
      { id: 2, name: "Louvre", location: "Paris" },
    ];
    vi.spyOn(MuseumService, "getAllMuseums").mockResolvedValue(fakeMuseums);

    await museumController.getAllMuseums(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeMuseums);
    expect(MuseumService.getAllMuseums).toHaveBeenCalled();
  });

  it("should get museum by id and return 200", async () => {
    const fakeMuseum = { id: 1, name: "MoMA", location: "NYC" };
    vi.spyOn(MuseumService, "getMuseumById").mockResolvedValue(fakeMuseum);
    req.params.id = 1;

    await museumController.getMuseumById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeMuseum);
    expect(MuseumService.getMuseumById).toHaveBeenCalledWith(1);
  });

  it("should return 404 if getMuseumById returns null", async () => {
    vi.spyOn(MuseumService, "getMuseumById").mockResolvedValue(null);
    req.params.id = 1;

    await museumController.getMuseumById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Museum not found" })
    );
  });

  it("should update museum and return 200", async () => {
    const fakeMuseum = { id: 1, name: "MoMA Updated", location: "NYC" };
    vi.spyOn(MuseumService, "updateMuseum").mockResolvedValue(fakeMuseum);
    req.params.id = 1;
    req.body = { name: "MoMA Updated", location: "NYC" };

    await museumController.updateMuseum(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeMuseum);
    expect(MuseumService.updateMuseum).toHaveBeenCalledWith(1, req.body);
  });

  it("should return 404 if updateMuseum returns null", async () => {
    vi.spyOn(MuseumService, "updateMuseum").mockResolvedValue(null);
    req.params.id = 1;
    req.body = { name: "MoMA Updated", location: "NYC" };

    await museumController.updateMuseum(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Museum not found" })
    );
  });

  it("should delete museum and return 204", async () => {
    vi.spyOn(MuseumService, "deleteMuseum").mockResolvedValue(true);
    req.params.id = 1;

    await museumController.deleteMuseum(req, res, next);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
    expect(MuseumService.deleteMuseum).toHaveBeenCalledWith(1);
  });

  it("should return 404 if deleteMuseum returns false", async () => {
    vi.spyOn(MuseumService, "deleteMuseum").mockResolvedValue(false);
    req.params.id = 1;

    await museumController.deleteMuseum(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Museum not found" })
    );
  });
});
