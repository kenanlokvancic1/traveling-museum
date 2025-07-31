import { useState } from "react";

function useReviewForm({
  initialReview = { rating: 0, comment: "" },
  onSubmit,
  onCancel,
}) {
  const [review, setReview] = useState(initialReview);

  const handleRatingChange = (event, newValue) => {
    setReview({ ...review, rating: Math.round(newValue) });
  };

  const handleCommentChange = (event) => {
    setReview({ ...review, comment: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(review);
  };

  const handleCancel = (event) => {
    event.preventDefault();
    onCancel();
  };

  return {
    review,
    handleRatingChange,
    handleCommentChange,
    handleSubmit,
    handleCancel,
  };
}

export default useReviewForm;
