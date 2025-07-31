export function getUserReview(reviews, userReviewId) {
  return userReviewId
    ? reviews.find((review) => review.review_id === userReviewId)
    : null;
}

export function getOtherReviews(reviews, userReviewId) {
  return userReviewId
    ? reviews.filter((review) => review.review_id !== userReviewId)
    : reviews;
}
