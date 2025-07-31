import React from "react";
import { AddReviewButton } from "./UserReviewActions.style";
import ReviewForm from "../ReviewForm/ReviewForm";
import useUserReviewActions from "./userReviewActionsHelper";

function UserReviewActions({
  userReviewId,
  showReviewForm,
  editingReview,
  onAddClick,
  onSubmit,
  onCancel,
}) {
  const { isReviewVisible, reviewFormProps, handleAddClick } =
    useUserReviewActions({
      userReviewId,
      showReviewForm,
      onAddClick,
      onSubmit,
      onCancel,
      editingReview,
    });

  return (
    <>
      {isReviewVisible && (
        <AddReviewButton variant="outlined" onClick={handleAddClick}>
          Add Your Review
        </AddReviewButton>
      )}

      {showReviewForm && <ReviewForm {...reviewFormProps} />}
    </>
  );
}

export default UserReviewActions;
