import React from "react";
import { Rating } from "@mui/material";
import {
  FormContainer,
  FormTitle,
  RatingContainer,
  StyledTextField,
  ButtonsContainer,
  CancelButton,
  SubmitButton,
} from "./ReviewForm.style";
import useReviewForm from "./reviewFormHelper";

function ReviewForm({
  initialReview = { rating: 0, comment: "" },
  onSubmit,
  onCancel,
  isEditing = false,
}) {
  const {
    review,
    handleRatingChange,
    handleCommentChange,
    handleSubmit,
    handleCancel,
  } = useReviewForm({
    initialReview,
    onSubmit,
    onCancel,
  });

  return (
    <FormContainer component="form" onSubmit={handleSubmit} noValidate>
      <FormTitle variant="h6">
        {isEditing ? "Edit Your Review" : "Add Your Review"}
      </FormTitle>

      <RatingContainer>
        <Rating
          name="review-rating"
          value={review.rating}
          precision={1}
          onChange={handleRatingChange}
          size="large"
        />
      </RatingContainer>

      <StyledTextField
        fullWidth
        multiline
        rows={4}
        placeholder="Write your review here..."
        value={review.comment}
        onChange={handleCommentChange}
        variant="outlined"
      />

      <ButtonsContainer>
        <CancelButton variant="outlined" onClick={handleCancel}>
          Cancel
        </CancelButton>
        <SubmitButton
          type="submit"
          variant="contained"
          disabled={review.rating === 0 || !review.comment.trim()}
          onClick={handleSubmit}
        >
          {isEditing ? "Save" : "Submit"}
        </SubmitButton>
      </ButtonsContainer>
    </FormContainer>
  );
}

export default ReviewForm;
