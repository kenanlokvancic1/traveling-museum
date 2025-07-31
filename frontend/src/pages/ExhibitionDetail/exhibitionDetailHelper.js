import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { getExhibitionById } from "../../api/ExhibitionApi";
import {
  getExhibitionReviews,
  createReview,
  updateReview,
  deleteReview,
} from "../../api/ReviewApi";
import {
  getPaintingsByExhibition,
  deleteExhibitionPainting,
  createExhibitionPainting,
} from "../../api/ExhibitionPainting";
import { getPaintingById } from "../../api/PaintingApi";

export function useExhibitionDetail(id) {
  const [exhibition, setExhibition] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const user = useSelector((state) => state.user.user);
  const currentUserId = user?.user_id;
  const userReviewId = reviews.find(
    (review) => review.user_id === currentUserId
  )?.review_id;
  const [actionMessage, setActionMessage] = useState("");
  const [actionMessageType, setActionMessageType] = useState("success");

  const [reviewSnackbar, setReviewSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showReviewSnackbar = (message, severity = "success") => {
    setReviewSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseReviewSnackbar = () => {
    setReviewSnackbar((prev) => ({ ...prev, open: false }));
  };

  const fetchExhibitionData = useCallback(async () => {
    try {
      setLoading(true);
      const exhibitionData = await getExhibitionById(id);
      let exhibitionPaintings = [];
      let imageUrls = [];

      try {
        exhibitionPaintings = await getPaintingsByExhibition(id);
        imageUrls = await Promise.all(
          exhibitionPaintings.map(async (painting) => {
            const paintingDetail = await getPaintingById(painting.painting_id);
            return paintingDetail?.image_url || null;
          })
        );
      } catch (error) {
        console.warn("No paintings found for exhibition:", error);
        imageUrls = [];
      }

      const filteredImages = imageUrls.filter(Boolean);

      const mappedExhibition = {
        id: exhibitionData.exhibition_id,
        title: exhibitionData.name,
        images: filteredImages,
        startDate: exhibitionData.start_date,
        endDate: exhibitionData.end_date,
        location: exhibitionData.Museum
          ? `${exhibitionData.Museum.name}, ${exhibitionData.Museum.location}`
          : "Unknown",
        status: determineStatus(
          exhibitionData.start_date,
          exhibitionData.end_date
        ),
        description: exhibitionData.description,
        rating: 0,
        reviewCount: 0,
      };

      setExhibition(mappedExhibition);

      try {
        const reviewsData = await getExhibitionReviews(id);
        const mappedReviews = reviewsData.map((review) => ({
          review_id: review.review_id,
          userAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
          rating: review.rating,
          comment: review.comment,
          user_id: review.user_id,
          username: review.user?.name || "Anonymous",
        }));
        setReviews(mappedReviews);

        if (mappedReviews.length > 0) {
          const totalRating = mappedReviews.reduce(
            (sum, review) => sum + review.rating,
            0
          );
          const avgRating = totalRating / mappedReviews.length;
          setExhibition((prev) => ({
            ...prev,
            rating: parseFloat(avgRating.toFixed(1)),
            reviewCount: mappedReviews.length,
          }));
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setReviews([]);
      }

      setLoading(false);
    } catch (err) {
      console.error("Error fetching exhibition details:", err);
      setError("Failed to load exhibition details");
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchExhibitionData();
    }
  }, [id, fetchExhibitionData]);

  const determineStatus = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (now < start) return "future";
    if (now > end) return "past";
    return "current";
  };

  const formatDateRange = (startDate, endDate) => {
    if (!startDate || !endDate) return "";
    const start = new Date(startDate).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    const end = new Date(endDate).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    return `${start} - ${end}`;
  };

  const handleAddReviewClick = () => {
    setEditingReview(null);
    setShowReviewForm(true);
  };

  const handleEditReview = (review) => {
    if (review.user_id !== currentUserId) {
      showReviewSnackbar("You can only edit your own reviews", "error");
      return;
    }
    setEditingReview(review);
    setShowReviewForm(true);
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId);
      const updatedReviews = reviews.filter(
        (review) => review.review_id !== reviewId
      );
      setReviews(updatedReviews);
      if (updatedReviews.length > 0) {
        const totalRating = updatedReviews.reduce(
          (sum, review) => sum + review.rating,
          0
        );
        const avgRating = totalRating / updatedReviews.length;
        setExhibition((prev) => ({
          ...prev,
          rating: parseFloat(avgRating.toFixed(1)),
          reviewCount: updatedReviews.length,
        }));
      } else {
        setExhibition((prev) => ({
          ...prev,
          rating: 0,
          reviewCount: 0,
        }));
      }
      showReviewSnackbar("Review deleted successfully!", "success");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Failed to delete review. Please try again.";
      showReviewSnackbar(errorMessage, "error");
      console.error("Error deleting review:", err);
    }
  };

  const handleReviewSubmit = async (reviewData) => {
    try {
      if (editingReview) {
        const reviewId = parseInt(editingReview.review_id || editingReview.id);
        const reviewToEdit = reviews.find((r) => r.review_id === reviewId);

        if (!reviewToEdit) {
          showReviewSnackbar("Review not found", "error");
          return;
        }

        if (parseInt(reviewToEdit.user_id) !== parseInt(currentUserId)) {
          showReviewSnackbar("You can only edit your own reviews", "error");
          return;
        }

        const updatedReview = await updateReview(reviewId, {
          rating: parseInt(reviewData.rating),
          comment: reviewData.comment,
          exhibition_id: parseInt(id),
          user_id: parseInt(currentUserId),
        });

        const updatedReviews = reviews.map((review) =>
          review.review_id === reviewId
            ? {
                ...review,
                rating: parseInt(updatedReview.rating),
                comment: reviewData.comment,
              }
            : review
        );

        setReviews(updatedReviews);

        if (updatedReviews.length > 0) {
          const totalRating = updatedReviews.reduce(
            (sum, review) => sum + review.rating,
            0
          );
          const avgRating = totalRating / updatedReviews.length;

          setExhibition((prev) => ({
            ...prev,
            rating: parseFloat(avgRating.toFixed(1)),
          }));
        }
        showReviewSnackbar("Review updated successfully!", "success");
      } else {
        if (!currentUserId) {
          showReviewSnackbar(
            "You must be logged in to create a review",
            "error"
          );
          return;
        }

        const newReviewData = await createReview({
          exhibition_id: parseInt(id),
          user_id: parseInt(currentUserId),
          rating: parseInt(reviewData.rating),
          comment: reviewData.comment,
        });

        const newReview = {
          review_id: newReviewData.review_id,
          userAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
          rating: parseInt(newReviewData.rating),
          comment: newReviewData.comment,
          user_id: parseInt(currentUserId),
          username: user?.name || "Anonymous",
        };

        const newReviews = [newReview, ...reviews];
        setReviews(newReviews);

        const totalRating = newReviews.reduce(
          (sum, review) => sum + review.rating,
          0
        );
        const avgRating = totalRating / newReviews.length;

        setExhibition((prev) => ({
          ...prev,
          rating: parseFloat(avgRating.toFixed(1)),
          reviewCount: newReviews.length,
        }));
        showReviewSnackbar("Review added successfully!", "success");
      }

      setShowReviewForm(false);
      setEditingReview(null);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Failed to submit review. Please try again.";
      showReviewSnackbar(errorMessage, "error");
      console.error("Error submitting review:", err);
    }
  };

  const handleCancelReview = () => {
    setShowReviewForm(false);
    setEditingReview(null);
  };

  const handleExhibitionUpdate = async (updates) => {
    setExhibition((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const handleRemoveImage = async (paintingId) => {
    try {
      await deleteExhibitionPainting(id, paintingId);

      const exhibitionPaintings = await getPaintingsByExhibition(id);
      const imageUrls = await Promise.all(
        exhibitionPaintings.map(async (painting) => {
          const paintingDetail = await getPaintingById(painting.painting_id);
          return paintingDetail?.image_url || null;
        })
      );
      const filteredImages = imageUrls.filter(Boolean);

      setExhibition((prev) => ({
        ...prev,
        images: filteredImages,
      }));

      setActionMessage("Painting successfully removed.");
      setActionMessageType("success");
    } catch (error) {
      setActionMessage("Failed to remove painting.");
      setActionMessageType("error");
      console.error(
        "Error removing painting:",
        error.response?.data || error.message
      );
    }
  };

  const handleAddSelectedImages = async (selectedIds) => {
    if (selectedIds.length === 0) return;
    try {
      for (const paintingId of selectedIds) {
        await createExhibitionPainting(id, paintingId);
      }

      const exhibitionPaintings = await getPaintingsByExhibition(id);
      const imageUrls = await Promise.all(
        exhibitionPaintings.map(async (painting) => {
          const paintingDetail = await getPaintingById(painting.painting_id);
          return paintingDetail?.image_url || null;
        })
      );
      const filteredImages = imageUrls.filter(Boolean);

      setExhibition((prev) => ({
        ...prev,
        images: filteredImages,
      }));

      setActionMessage("Paintings successfully added.");
      setActionMessageType("success");
    } catch (error) {
      setActionMessage(
        "Failed to add paintings: " + error.response?.data?.message ||
          error.message
      );
      setActionMessageType("error");
      console.error(
        "Error adding paintings:",
        error.response?.data || error.message
      );
    }
  };

  return {
    exhibition,
    reviews,
    loading,
    error,
    showReviewForm,
    editingReview,
    userReviewId,
    formatDateRange,
    handleAddReviewClick,
    handleEditReview,
    handleDeleteReview,
    handleReviewSubmit,
    handleCancelReview,
    handleExhibitionUpdate,
    handleRemoveImage,
    handleAddSelectedImages,
    actionMessage,
    actionMessageType,
    setActionMessage,
    reviewSnackbar,
    showReviewSnackbar,
    handleCloseReviewSnackbar,
  };
}
