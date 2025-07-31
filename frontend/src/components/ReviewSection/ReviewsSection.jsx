import { Box } from "@mui/material";
import ReviewsList from "./ReviewsList/ReviewsList";
import GuestReviewPrompt from "./GuestReviewPrompt/GuestReviewPrompt";
import UserReviewActions from "./UserReviewActions/UserReviewActions";
import { SectionTitle, StyledDivider } from "./ReviewsSection.style";

function ReviewsSection({
  isGuestMode,
  isAdmin,
  reviews,
  userReviewId,
  showReviewForm,
  editingReview,
  onAddReviewClick,
  onReviewSubmit,
  onCancelReview,
  onEditReview,
  onDeleteReview,
  title = "Reviews and Comments",
}) {
  return (
    <Box>
      <SectionTitle variant="h5">{title}</SectionTitle>

      <StyledDivider />

      {isGuestMode ? (
        <GuestReviewPrompt />
      ) : (
        <UserReviewActions
          userReviewId={userReviewId}
          showReviewForm={showReviewForm}
          editingReview={editingReview}
          onAddClick={onAddReviewClick}
          onSubmit={onReviewSubmit}
          onCancel={onCancelReview}
        />
      )}

      <ReviewsList
        reviews={reviews}
        userReviewId={isGuestMode ? null : userReviewId}
        isAdmin={isAdmin}
        onEditReview={isGuestMode ? null : onEditReview}
        onDeleteReview={isGuestMode ? null : onDeleteReview}
      />
    </Box>
  );
}

export default ReviewsSection;
