import { describe, it, expect, vi, beforeEach } from "vitest";
import * as favoriteController from "../../controllers/favorite.controller.js";
import * as favoriteService from "../../services/favorite.service.js";
import logger from "../../utils/logger.js";

describe("favorite.controller (unit tests)", () => {
  let req, res, next;

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(logger, "info").mockImplementation(() => {});
    vi.spyOn(logger, "debug").mockImplementation(() => {});
    vi.spyOn(logger, "warn").mockImplementation(() => {});
    req = { body: {}, params: {}, query: {} };
    res = {
      json: vi.fn(),
      status: vi.fn(() => res),
      send: vi.fn(() => res),
    };
    next = vi.fn();
  });

  it("should create favorite and return 201", async () => {
    const fakeResult = { id: 1, painting_id: 1, user_id: 2 };
    vi.spyOn(favoriteService, "createFavorite").mockResolvedValue(fakeResult);
    req.body = { painting_id: 1, user_id: 2 };

    await favoriteController.createFavorite(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(fakeResult);
    expect(favoriteService.createFavorite).toHaveBeenCalledWith(req.body);
  });

  it("should get all favorites and return 200", async () => {
    const fakeResult = [{ id: 1, painting_id: 1, user_id: 2 }];
    vi.spyOn(favoriteService, "getAllFavorites").mockResolvedValue(fakeResult);

    await favoriteController.getAllFavorites(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeResult);
    expect(favoriteService.getAllFavorites).toHaveBeenCalled();
  });

  it("should get favorites by user id and return 200", async () => {
    const fakeResult = [{ id: 1, painting_id: 1, user_id: 2 }];
    vi.spyOn(favoriteService, "getFavoritesByUserId").mockResolvedValue(
      fakeResult
    );
    req.params.userId = 2;

    await favoriteController.getFavoritesByUserId(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeResult);
    expect(favoriteService.getFavoritesByUserId).toHaveBeenCalledWith(2);
  });

  it("should get favorite by id and return 200", async () => {
    const fakeResult = { id: 1, painting_id: 1, user_id: 2 };
    vi.spyOn(favoriteService, "getFavoriteById").mockResolvedValue(fakeResult);
    req.params.id = 1;

    await favoriteController.getFavoriteById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeResult);
    expect(favoriteService.getFavoriteById).toHaveBeenCalledWith(1);
  });

  it("should check favorite exists and return 200", async () => {
    vi.spyOn(favoriteService, "checkFavoriteExists").mockResolvedValue(true);
    req.params.paintingId = 1;
    req.params.userId = 2;

    await favoriteController.checkFavorite(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ exists: true });
    expect(favoriteService.checkFavoriteExists).toHaveBeenCalledWith(1, 2);
  });

  it("should delete favorite by id and return 204", async () => {
    vi.spyOn(favoriteService, "deleteFavorite").mockResolvedValue(1);
    req.params.id = 1;

    await favoriteController.deleteFavorite(req, res, next);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
    expect(favoriteService.deleteFavorite).toHaveBeenCalledWith(1);
  });

  it("should delete favorite by painting and user and return 204", async () => {
    vi.spyOn(
      favoriteService,
      "deleteFavoriteByPaintingAndUser"
    ).mockResolvedValue(1);
    req.params.paintingId = 1;
    req.params.userId = 2;

    await favoriteController.deleteFavoriteByPaintingAndUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
    expect(
      favoriteService.deleteFavoriteByPaintingAndUser
    ).toHaveBeenCalledWith(1, 2);
  });
});
