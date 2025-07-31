import { ReviewsContainer, NoReviewsMessage } from "./ReviewsList.style";
import ReviewItem from "./ReviewItem/ReviewItem";
import { getUserReview, getOtherReviews } from "./reviewsListHelper";

function ReviewsList({
  reviews = [],
  userReviewId = null,
  isAdmin = false,
  onEditReview,
  onDeleteReview,
}) {
  const userReview = getUserReview(reviews, userReviewId);
  const otherReviews = getOtherReviews(reviews, userReviewId);

  return (
    <ReviewsContainer>
      {userReview && (
        <ReviewItem
          review={userReview}
          isUserReview={true}
          canEdit={!!onEditReview && userReview.review_id === userReviewId}
          isAdmin={isAdmin}
          onEdit={() => onEditReview && onEditReview(userReview)}
          onDelete={() =>
            onDeleteReview && onDeleteReview(userReview.review_id)
          }
        />
      )}

      {otherReviews.length > 0
        ? otherReviews.map((review) => (
            <ReviewItem
              key={review.review_id}
              review={review}
              isUserReview={review.review_id === userReviewId}
              canEdit={!!onEditReview && review.review_id === userReviewId}
              isAdmin={isAdmin}
              onEdit={() => onEditReview && onEditReview(review)}
              onDelete={() =>
                onDeleteReview && onDeleteReview(review.review_id)
              }
            />
          ))
        : !userReview && (
            <NoReviewsMessage variant="body2">
              No reviews yet. Be the first to review this exhibition!
            </NoReviewsMessage>
          )}
    </ReviewsContainer>
  );
}

export default ReviewsList;
