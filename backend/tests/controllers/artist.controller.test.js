import { describe, it, expect, vi, beforeEach } from "vitest";
import * as artistController from "../../controllers/artist.controller.js";
import * as artistService from "../../services/artist.service.js";
import logger from "../../utils/logger.js";

describe("artist.controller (unit tests)", () => {
  let req, res, next;

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(logger, "info").mockImplementation(() => {});
    vi.spyOn(logger, "warn").mockImplementation(() => {});
    vi.spyOn(logger, "debug").mockImplementation(() => {});
    req = { body: {}, params: {} };
    res = {
      json: vi.fn(),
      status: vi.fn(() => res),
      send: vi.fn(() => res),
    };
    next = vi.fn();
  });

  it("should create artist and return 201", async () => {
    const fakeResult = { artist_id: 1, name: "A" };
    vi.spyOn(artistService, "createArtist").mockResolvedValue(fakeResult);
    req.body = { name: "A" };

    await artistController.createArtist(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(fakeResult);
    expect(artistService.createArtist).toHaveBeenCalled();
  });

  it("should get all artists and return 200", async () => {
    const fakeResult = [{ artist_id: 1, name: "A" }];
    vi.spyOn(artistService, "getAllArtists").mockResolvedValue(fakeResult);

    await artistController.getAllArtists(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeResult);
    expect(artistService.getAllArtists).toHaveBeenCalled();
  });

  it("should update artist and return 200", async () => {
    const fakeResult = { artist_id: 1, name: "Updated" };
    vi.spyOn(artistService, "updateArtist").mockResolvedValue(fakeResult);
    req.params.id = 1;
    req.body = { name: "Updated" };

    await artistController.updateArtist(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeResult);
    expect(artistService.updateArtist).toHaveBeenCalledWith(
      1,
      expect.any(Object)
    );
  });

  it("should return 404 if updateArtist returns null", async () => {
    vi.spyOn(artistService, "updateArtist").mockResolvedValue(null);
    req.params.id = 1;
    req.body = { name: "Updated" };

    await artistController.updateArtist(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: "fail",
      message: expect.any(String),
    });
  });

  it("should delete artist and return 204", async () => {
    vi.spyOn(artistService, "deleteArtist").mockResolvedValue(1);
    req.params.id = 1;

    await artistController.deleteArtist(req, res, next);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
    expect(artistService.deleteArtist).toHaveBeenCalledWith(1);
  });

  it("should return 404 if deleteArtist returns null", async () => {
    vi.spyOn(artistService, "deleteArtist").mockResolvedValue(null);
    req.params.id = 1;

    await artistController.deleteArtist(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: "fail",
      message: expect.any(String),
    });
  });

  it("should return 404 if getArtistById returns null", async () => {
    vi.spyOn(artistService, "getArtistById").mockResolvedValue(null);
    req.params.id = 1;

    await artistController.getArtistById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: "fail",
      message: expect.any(String),
    });
  });

  it("should get artist by id and return 200", async () => {
    const fakeResult = { artist_id: 1, name: "A" };
    vi.spyOn(artistService, "getArtistById").mockResolvedValue(fakeResult);
    req.params.id = 1;

    await artistController.getArtistById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeResult);
    expect(artistService.getArtistById).toHaveBeenCalledWith(1);
  });
});
