class ReviewResponseDTO {
  constructor(review) {
    this.review_id = review.review_id;
    this.user_id = review.user_id;
    this.exhibition_id = review.exhibition_id;
    this.rating = review.rating;
    this.comment = review.comment;

    if (review.User) {
      this.user = {
        user_id: review.User.user_id,
        name: review.User.name,
      };
    }

    if (review.Exhibition) {
      this.exhibition = {
        exhibition_id: review.Exhibition.exhibition_id,
        name: review.Exhibition.name,
      };
    }
  }
}

export default ReviewResponseDTO;
