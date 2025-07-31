function useUserReviewActions({
  userReviewId,
  showReviewForm,
  onAddClick,
  onSubmit,
  onCancel,
  editingReview,
}) {
  const handleAddClick = (event) => {
    if (event) {
      event.preventDefault();
    }
    onAddClick();
  };

  return {
    isReviewVisible: !userReviewId && !showReviewForm,
    showReviewForm: showReviewForm,
    reviewFormProps: {
      initialReview: editingReview || { rating: 0, comment: "" },
      onSubmit: onSubmit,
      onCancel: onCancel,
      isEditing: !!editingReview,
    },
    handleAddClick: handleAddClick,
  };
}

export default useUserReviewActions;
