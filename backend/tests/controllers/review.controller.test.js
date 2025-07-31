import { describe, it, expect, vi, beforeEach } from "vitest";
import * as reviewController from "../../controllers/review.controller.js";
import * as reviewService from "../../services/review.service.js";
import ReviewResponseDTO from "../../dto/review/responses/ReviewResponseDTO.js";
import logger from "../../utils/logger.js";

describe("review.controller (unit tests)", () => {
  let req, res, next;

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(logger, "info").mockImplementation(() => {});
    vi.spyOn(logger, "warn").mockImplementation(() => {});
    vi.spyOn(logger, "debug").mockImplementation(() => {});
    req = { body: {}, params: {}, query: {}, user: undefined };
    res = {
      json: vi.fn(),
      status: vi.fn(() => res),
      end: vi.fn(() => res),
    };
    next = vi.fn();
  });

  it("should get all reviews and return 200", async () => {
    const fakeReviews = [{ review_id: 1 }];
    vi.spyOn(reviewService, "getReviews").mockResolvedValue(fakeReviews);

    await reviewController.getAllReviews(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      fakeReviews.map((r) => new ReviewResponseDTO(r))
    );
    expect(reviewService.getReviews).toHaveBeenCalledWith(req.query);
  });

  it("should get review by id and return 200", async () => {
    const fakeReview = { review_id: 1 };
    vi.spyOn(reviewService, "getReviewById").mockResolvedValue(fakeReview);
    req.params.id = 1;

    await reviewController.getReviewById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(new ReviewResponseDTO(fakeReview));
    expect(reviewService.getReviewById).toHaveBeenCalledWith(1);
  });

  it("should return 404 if getReviewById returns null", async () => {
    vi.spyOn(reviewService, "getReviewById").mockResolvedValue(null);
    req.params.id = 1;

    await reviewController.getReviewById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Review not found" })
    );
  });

  it("should create review and return 201", async () => {
    const fakeReview = {
      review_id: 1,
      user_id: 2,
      exhibition_id: 3,
      rating: 5,
      comment: "Great",
    };
    vi.spyOn(reviewService, "createReview").mockResolvedValue(fakeReview);
    req.body = { user_id: 2, exhibition_id: 3, rating: 5, comment: "Great" };

    await reviewController.createReview(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(new ReviewResponseDTO(fakeReview));
    expect(reviewService.createReview).toHaveBeenCalled();
  });

  it("should update review and return 200", async () => {
    const fakeReview = { review_id: 1, rating: 4, comment: "Updated" };
    vi.spyOn(reviewService, "updateReview").mockResolvedValue(fakeReview);
    req.params.id = 1;
    req.body = { rating: 4, comment: "Updated" };

    await reviewController.updateReview(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(new ReviewResponseDTO(fakeReview));
    expect(reviewService.updateReview).toHaveBeenCalledWith(
      1,
      expect.any(Object)
    );
  });

  it("should return 404 if updateReview returns null", async () => {
    vi.spyOn(reviewService, "updateReview").mockResolvedValue(null);
    req.params.id = 1;
    req.body = { rating: 4, comment: "Updated" };

    await reviewController.updateReview(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Review not found" })
    );
  });

  it("should delete review and return 204", async () => {
    vi.spyOn(reviewService, "deleteReview").mockResolvedValue(true);
    req.params.id = 1;

    await reviewController.deleteReview(req, res, next);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.end).toHaveBeenCalled();
    expect(reviewService.deleteReview).toHaveBeenCalledWith(1);
  });

  it("should return 404 if deleteReview returns false", async () => {
    vi.spyOn(reviewService, "deleteReview").mockResolvedValue(false);
    req.params.id = 1;

    await reviewController.deleteReview(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Review not found" })
    );
  });

  it("should get exhibition average rating and return 200", async () => {
    const fakeRating = { averageRating: "4.5", totalReviews: 10 };
    vi.spyOn(reviewService, "getAverageRatingForExhibition").mockResolvedValue(
      fakeRating
    );
    req.params.exhibitionId = 2;

    await reviewController.getExhibitionAverageRating(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeRating);
    expect(reviewService.getAverageRatingForExhibition).toHaveBeenCalledWith(2);
  });

  it("should return 404 if exhibition average rating not found", async () => {
    vi.spyOn(reviewService, "getAverageRatingForExhibition").mockResolvedValue(
      null
    );
    req.params.exhibitionId = 2;

    await reviewController.getExhibitionAverageRating(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "No ratings found for this exhibition",
      })
    );
  });
});
