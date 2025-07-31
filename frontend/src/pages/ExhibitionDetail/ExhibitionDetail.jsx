import React from "react";
import { useParams } from "react-router-dom";
import { Typography, CircularProgress, Alert, Snackbar } from "@mui/material";
import { useSelector } from "react-redux";
import ExhibitionCarousel from "../../components/ExhibitionCarousel/ExhibitionCarousel";
import ExhibitionDetails from "../../components/ExhibitionDetails/ExhibitionDetails";
import ExhibitionDescription from "../../components/ExhibitionDetails/ExhibitionDescription/ExhibitionDescription";
import ReviewsSection from "../../components/ReviewSection/ReviewsSection";
import Footer from "../../components/Footer/Footer";
import {
  PageWrapper,
  PageContainer,
  ContentSection,
} from "./ExhibitionDetail.style";
import { useExhibitionDetail } from "./exhibitionDetailHelper";

function ExhibitionDetail() {
  const { id } = useParams();
  const user = useSelector((state) => state.user.user);
  const isGuest = !user;
  const isUser = user?.role === "user";
  const isCurator = user?.role === "curator";
  const isAdmin = user?.role === "admin";
  const canReview = isUser;
  const canEdit = isCurator || isAdmin;
  const {
    exhibition,
    reviews,
    loading,
    error,
    showReviewForm,
    editingReview,
    userReviewId,
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
    handleCloseReviewSnackbar,
  } = useExhibitionDetail(id);

  if (loading) {
    return (
      <ContentSection
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <CircularProgress />
      </ContentSection>
    );
  }
  if (error) {
    return (
      <ContentSection>
        <Alert severity="error">{error}</Alert>
      </ContentSection>
    );
  }
  if (!exhibition) {
    return (
      <ContentSection>
        <Typography variant="body1">Exhibition not found</Typography>
      </ContentSection>
    );
  }
  return (
    <PageWrapper>
      <PageContainer>
        <ContentSection>
          <Typography
            variant="h3"
            sx={{
              mb: 3,
              fontWeight: 700,
            }}
          >
            {exhibition.title}
          </Typography>
          <ExhibitionCarousel
            images={exhibition.images}
            isAdmin={canEdit}
            exhibitionId={exhibition.id}
            onImageRemoved={handleRemoveImage}
            onImagesAdded={handleAddSelectedImages}
            actionMessage={actionMessage}
            actionMessageType={actionMessageType}
            clearMessage={() => setActionMessage("")}
          />

          <ExhibitionDetails
            location={exhibition.location}
            startDate={exhibition.startDate}
            endDate={exhibition.endDate}
            exhibitionId={exhibition.id}
            canEdit={canEdit}
            onUpdate={handleExhibitionUpdate}
          />

          <ExhibitionDescription
            description={exhibition.description}
            isAdmin={canEdit}
            onUpdate={handleExhibitionUpdate}
            exhibitionId={exhibition.id}
          />

          <ReviewsSection
            isGuestMode={isGuest}
            isAdmin={canEdit}
            reviews={reviews}
            userReviewId={userReviewId}
            showReviewForm={showReviewForm}
            editingReview={editingReview}
            onAddReviewClick={handleAddReviewClick}
            onReviewSubmit={handleReviewSubmit}
            onCancelReview={handleCancelReview}
            onEditReview={handleEditReview}
            onDeleteReview={handleDeleteReview}
          />
        </ContentSection>
      </PageContainer>
      <Footer />

      <Snackbar
        open={reviewSnackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseReviewSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseReviewSnackbar}
          severity={reviewSnackbar.severity}
          sx={{ width: "100%" }}
        >
          {reviewSnackbar.message}
        </Alert>
      </Snackbar>
    </PageWrapper>
  );
}

export default ExhibitionDetail;
