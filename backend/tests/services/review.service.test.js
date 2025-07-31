import { describe, it, expect, vi, beforeEach } from "vitest";
import * as reviewService from "../../services/review.service.js";
import Review from "../../models/review.model.js";
import * as validation from "../../errors/ReviewValidationError.js";

describe("review.service (unit tests)", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should get reviews with filters", async () => {
    const fakeReviews = [{ review_id: 1, rating: 5 }];
    vi.spyOn(validation, "validateReviewFilters").mockReturnValue({});
    vi.spyOn(Review, "findAll").mockResolvedValue(fakeReviews);

    const result = await reviewService.getReviews({});

    expect(validation.validateReviewFilters).toHaveBeenCalled();
    expect(Review.findAll).toHaveBeenCalled();
    expect(result).toBe(fakeReviews);
  });

  it("should get review by id", async () => {
    const fakeReview = { review_id: 1, rating: 5 };
    vi.spyOn(Review, "findByPk").mockResolvedValue(fakeReview);
    vi.spyOn(validation, "validateReviewExists").mockReturnValue(fakeReview);

    const result = await reviewService.getReviewById(1);

    expect(Review.findByPk).toHaveBeenCalledWith(1, expect.any(Object));
    expect(validation.validateReviewExists).toHaveBeenCalledWith(fakeReview);
    expect(result).toBe(fakeReview);
  });

  it("should throw if review by id not found", async () => {
    vi.spyOn(Review, "findByPk").mockResolvedValue(null);
    vi.spyOn(validation, "validateReviewExists").mockImplementation(() => {
      throw new Error("Review not found");
    });

    await expect(reviewService.getReviewById(1)).rejects.toThrow(
      "Review not found"
    );
  });

  it("should create a review", async () => {
    const dto = { rating: 5, comment: "Great", user_id: 1, exhibition_id: 2 };
    const validated = { ...dto };
    const fakeReview = { review_id: 1, ...dto };
    const fakeCreated = { review_id: 1, ...dto };

    vi.spyOn(validation, "validateReviewData").mockReturnValue(validated);
    vi.spyOn(Review, "create").mockResolvedValue(fakeReview);
    vi.spyOn(Review, "findByPk").mockResolvedValue(fakeCreated);

    const result = await reviewService.createReview(dto);

    expect(validation.validateReviewData).toHaveBeenCalledWith(dto);
    expect(Review.create).toHaveBeenCalledWith(validated);
    expect(Review.findByPk).toHaveBeenCalledWith(1, expect.any(Object));
    expect(result).toBe(fakeCreated);
  });

  it("should update a review", async () => {
    const id = 1;
    const dto = { rating: 4, comment: "Updated" };
    const validated = { ...dto };
    const fakeReview = { review_id: id, update: vi.fn() };
    const fakeUpdated = { review_id: id, ...dto };

    vi.spyOn(Review, "findByPk")
      .mockResolvedValueOnce(fakeReview)
      .mockResolvedValueOnce(fakeUpdated);
    vi.spyOn(validation, "validateReviewExists").mockReturnValue(fakeReview);
    vi.spyOn(validation, "validateReviewData").mockReturnValue(validated);
    fakeReview.update.mockResolvedValue();

    const result = await reviewService.updateReview(id, dto);

    expect(Review.findByPk).toHaveBeenCalledWith(id);
    expect(validation.validateReviewExists).toHaveBeenCalledWith(fakeReview);
    expect(fakeReview.update).toHaveBeenCalledWith(validated);
    expect(result).toBe(fakeUpdated);
  });

  it("should throw if update review not found", async () => {
    vi.spyOn(Review, "findByPk").mockResolvedValue(null);
    vi.spyOn(validation, "validateReviewExists").mockImplementation(() => {
      throw new Error("Review not found");
    });

    await expect(reviewService.updateReview(1, {})).rejects.toThrow(
      "Review not found"
    );
  });

  it("should delete a review", async () => {
    const id = 1;
    const fakeReview = { review_id: id, destroy: vi.fn() };

    vi.spyOn(Review, "findByPk").mockResolvedValue(fakeReview);
    vi.spyOn(validation, "validateReviewExists").mockReturnValue(fakeReview);
    fakeReview.destroy.mockResolvedValue();

    const result = await reviewService.deleteReview(id);

    expect(Review.findByPk).toHaveBeenCalledWith(id);
    expect(validation.validateReviewExists).toHaveBeenCalledWith(fakeReview);
    expect(fakeReview.destroy).toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it("should throw if delete review not found", async () => {
    vi.spyOn(Review, "findByPk").mockResolvedValue(null);
    vi.spyOn(validation, "validateReviewExists").mockImplementation(() => {
      throw new Error("Review not found");
    });

    await expect(reviewService.deleteReview(1)).rejects.toThrow(
      "Review not found"
    );
  });

  it("should get average rating for exhibition", async () => {
    const fakeResult = [{ averageRating: "4.5", totalReviews: 10 }];
    vi.spyOn(Review, "findAll").mockResolvedValue(fakeResult);

    const result = await reviewService.getAverageRatingForExhibition(2);

    expect(Review.findAll).toHaveBeenCalledWith({
      where: { exhibition_id: 2 },
      attributes: [
        [
          Review.sequelize.fn("AVG", Review.sequelize.col("rating")),
          "averageRating",
        ],
        [
          Review.sequelize.fn("COUNT", Review.sequelize.col("review_id")),
          "totalReviews",
        ],
      ],
      raw: true,
    });
    expect(result).toEqual({
      averageRating: "4.5",
      totalReviews: 10,
    });
  });
});
